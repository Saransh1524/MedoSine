"use client";

import { scrapeAndStoreProduct } from "@/lib/actions";
import {FormEvent, useState } from "react";

function Searchbar() {

  const isValidAmazonProductURL = (url:string) => {
      try {
        const parsedURL = new URL(url);
        const hostname = parsedURL.hostname;
        if(hostname.includes('amazon.com') || hostname.includes('amazon.') || hostname.endsWith('amazon')){
          return true;
        }
      } catch (error) {
        return false;
      }
      return false;
  }

  //states
  const [isLoading , setIsLoading] = useState(false);
  const [searchPrompt, setSearchPrompt] = useState("");

  //submit handler 
  const handleSubmit =async  (event : FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const isValidLink = isValidAmazonProductURL(searchPrompt)
    if(!isValidLink){
     return alert('PLease provide a valid link')
  };
  try {
    setIsLoading(true)

    //scraping the product
    const product = await scrapeAndStoreProduct(searchPrompt)
  } catch (error) {
    console.log(error)
  }finally{
    setIsLoading(false);
  }
}
  return (
    <>
      <form className=" flex flex-wrap gap-4 mt-12" onSubmit={handleSubmit}>
        <input
          type="text"
          className="searchbar-input"
          placeholder="Enter product link"
          value={searchPrompt}
          onChange={(e) => setSearchPrompt(e.target.value)}
        ></input>
        <button className="searchbar-btn" type="submit">
          {isLoading? 'Searching...': 'Search'}
        </button>
      </form>
    </>
  );
}

export default Searchbar;
