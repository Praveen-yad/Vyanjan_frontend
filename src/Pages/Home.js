import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Slider from '../components/Slider'
import Category from '../components/Category'

function Home() {
  
  return (
    <div className='bg-neutral-900 text-white'>
        <Navbar/>
        <div className=' mt-8'>
          <div className='mx-3 sm:mx-5 bg-[radial-gradient(ellipse_at_right,_var(--tw-gradient-stops))] from-red-800 to-amber-600 mb-20 mt-4 rounded-[2.5rem] h-[14.5rem] sm:h-[19rem] md:h-[23rem] lg:h-[25rem] xl:h-[30rem] 2xl:h-[32rem] relative shadow-[0px_4px_8px_0px] shadow-black flex flex-col items-center'>
            <div className='text-center bg-clip-text bg-gradient-to-b from-[#ffffff] via-[#ffffff80] to-[#ffffff22] w-[20rem] xxs:w-full text-[2rem] xxs:text-[2.8rem] sm:text-[3.7rem] md:text-[4.3rem] lg:text-[6rem] xl:text-[7rem] 2xl:text-[8rem] font-[700] -tracking-[1px] text-transparent opacity-60 translate-y-2 md:-translate-y-3 lg:-translate-y-5'>International Cuisines</div>
            <div className='w-full flex justify-center -mt-[110px] xxs:-mt-[125px] sm:-mt-[105px] md:-mt-[90px] lg:-mt-[100px] xl:-mt-[88px] pb-5 overflow-hidden'>
              <Slider/>
            </div>
            <div className='absolute top-0 h-[14.5rem] sm:h-[19rem] md:h-[23rem] lg:h-[25rem] xl:h-[30rem] 2xl:h-[32rem] w-[100%] bg-gradient-to-b from-[#ffffff00] via-[#ffffff00] to-[#00000091] rounded-[2.5rem]'></div>
          </div>

            <div className=' flex flex-col items-center
             justify-center -mt-10 sm:-mt-16 mb-3'>
              <div className=' w-[84vw] sm:w-[51vw] text-sm'> Sarching for something else?</div>
              <div className='flex w-fit'>
                <input className=' w-[65vw] sm:w-[45vw] bg-transparent outline-none border rounded-md px-2' placeholder='Search' />
                <div className='bg-theme px-4 py-1 ml-3 rounded-md cursor-pointer'>Search</div>
              </div>
            </div> 
              <Category/>
        </div>
        <Footer/>
    </div>
  )
}

export default Home