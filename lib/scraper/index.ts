import axios from "axios";
import * as cheerio from "cheerio";
import { extractCurrency, extractPrice } from "../utils";
export async function scrapeAmazonProduct(url: string) {
  if (!url) return;

  // curl --proxy brd.superproxy.io:22225 --proxy-user brd-customer-hl_ea329813-zone-medosine:t5gx79060y4h -k

  //Bright data proxy configuration
  const username = String(process.env.BRIGHT_DATA_USERNAME);
  const password = String(process.env.BRIGHT_DATA_PASSWORD);
  const port = 22225;
  const session_id = (1000000 * Math.random()) | 0;
  const options = {
    auth: {
      username: `${username}-session-${session_id}`,
      password,
    },
    host: "brd.superproxy.io",
    port,
    rejectUnauthorized: false,
  };

  try {
    //fetch product page
    const response = await axios.get(url, options);

    const $ = cheerio.load(response.data);
    //extract the product data
    const title = $("#productTitle").text().trim();
    const currentPrice = extractPrice(
      $(".priceToPay span.a-price-whole"),
      $("a.size.base.a-color-price"),
      $(".a-button-selected .a-color-base"),
      $(".a-price.a-text-price")
    );

    const originalPrice  = extractPrice(
        $('#priceblock_ourprice'),
        $('.a-price.a-text-price span.a-offscreen'),
        $('#listPrice'),
        $('#priceblock_dealprice'),
        $('.a-size-base.a-color-price')
    );

    const outOfStock = $('#availability span').text().trim().toLowerCase() === 'currently unavailable'

    const images = $('#imgBlkFront').attr('data-a-dynamic-image') ||
    $('#landingImage').attr('data-a-dynamic-image') || '{}'

    const imageUrls = Object.keys(JSON.parse(images));

    const currency = extractCurrency($('.a-price-symbol'))

    const discountRate = $('.savingsPercentage').text().replace(/[-%]/g,"");

    //construct data object with scraped information
    const data = {
        url, 
        currency: currency || '$',
        image : imageUrls[0],
        title,
        currentPrice : Number(currentPrice) || Number(originalPrice),
        originalPrice : Number(originalPrice) || Number(currentPrice),
        priceHistory : [],
        discountRate : Number(discountRate),
        category : 'category',
        reviewsCount: 100,
        stars : 4.5,
        isOutOfStock : outOfStock,
        lowestPrice : Number(currentPrice) || Number(originalPrice),
        highestPrice : Number(originalPrice) || Number(currentPrice)
    }

    //console.log(data)
    return data;
    
    // console.log(response.data);
    console.log("price is", currentPrice );
    console.log({ title , originalPrice , outOfStock , imageUrls});
  } catch (error: any) {
    throw new Error("Failed to fetch the product", error.message);
  }
}
