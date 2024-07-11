"use server"
import { scrapeAmazonProduct } from "../scraper";
import {connectToDB} from "../mongoose"
import Product from '../models/Product.models'
import { getAveragePrice, getHighestPrice, getLowestPrice } from "../utils";
import { revalidatePath } from "next/cache";
 // all the code written here will run only on server

export async function scrapeAndStoreProduct(productUrl:string) {
    if(!productUrl) return;


    try{
        connectToDB();

        const scrapedProduct = await scrapeAmazonProduct(productUrl);

        if(!scrapedProduct) return;

        let product = scrapedProduct;

        const existingProduct  = await Product.findOne({ url: scrapedProduct.url})

        if(existingProduct){
            const updatedPriceHistory : any = [...existingProduct.priceHistory , { price: scrapedProduct.currentPrice}]

            product = {
                ...scrapedProduct,
                priceHistory: updatedPriceHistory,
                lowestPrice: getLowestPrice(updatedPriceHistory),
                highestPrice: getHighestPrice(updatedPriceHistory),
                averagePrice: getAveragePrice(updatedPriceHistory),
            }
        }
        const newProduct = await Product.findOneAndUpdate(
            {url : scrapedProduct.url},
            product,
            { upsert: true, new: true}
        )
// what the fuck is this??
        revalidatePath(`/products/${newProduct._id}`);

    }catch(error:any){
        throw new Error(`Failed to create/update product : ${error.message}`)
    }
    
}