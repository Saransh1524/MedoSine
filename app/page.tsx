import HeroCarousel from '@/components/HeroCarousel'
import Searchbar from '@/components/Searchbar'
import Image from 'next/image'
import React from 'react'

function Home() {
  return (
    <>
    <section className='px-6 border-2 md:px-20 py-24'>
      <div className='flex max-xl:flex-col gap-16'>
        <div className='flex flex-col justify-center'>
          <p className='small-text'>
            Get your desired medicine in minimal price
            <Image src= "/ssets/icons/arrow-right.svg"
            alt = "arrow-right"
            width = {16}
            height = {16}  />
          </p>
          <h1 className='head-text'>
            Unleash the Power of  
            <span className = "text-primary"> MedoSine</span>
          </h1>
          <p className='mt-6'>Powerful, self-serve product and growth analytics to help you conver, engage,and retain more.</p>
          <Searchbar />
        </div>
      <HeroCarousel/>
      </div>

    </section>
    <section className='tending-section'>
      <h2 className='section-text'>Trending</h2>

      <div className='flex flex-wrap gap-x-8 gap-y-16'>
        {['apple iphone 15' , 'book' , 'sneakers'].map((product , index) => (
          <div key = {index} >{product}</div>
        ))}
      </div>
       </section>
    </>
  )
}

export default Home