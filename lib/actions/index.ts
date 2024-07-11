"use server"
import { scrapeAmazonProduct } from "../scraper";

 // all the code written here will run only on server

export async function scrapeAndStoreProduct(productUrl:string) {
    if(!productUrl) return;


    try{
        const scrapedProduct = await scrapeAmazonProduct(productUrl);
        if(!scrapedProduct) return;
    }catch(error:any){
        throw new Error(`Failed to create/update product : ${error.message}`)
    }
    
}