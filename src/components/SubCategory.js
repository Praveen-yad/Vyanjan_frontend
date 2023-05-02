import React from 'react'
import { MdNavigateBefore, MdNavigateNext } from "react-icons/md";
import Card from "./Card";

function SubCategory({name, data}) {

    const sliderLeft = () => {
        var slider = document.getElementById(`slider${name}`);
        slider.scrollLeft = slider.scrollLeft - 478;
      };
      const sliderRight = () => {
        var slider = document.getElementById(`slider${name}`);
        slider.scrollLeft = slider.scrollLeft + 478;
      };

  return (
    <>
        <div className='h-[85px] sm:h-44 px-5'>
            <div id='category' className='text-neutral-900 text-[3.7rem] xxs:text-[4.7rem] sm:text-[7rem] -ml-2 xxs:ml-0 bg-gradient-to-b from-[#ffffff7f] opacity-80 via-[#ffffff4b] to-[#fff0] font-extrabold -tracking-[2px] px-1'>{name}</div>
            <div className=' text-[1.55rem] xxs:text-[1.85rem] sm:text-[3.2rem] uppercase ml-5 -translate-x-3 xxs:translate-x-0 -translate-y-[55px] xxs:-translate-y-[71px] sm:-translate-y-[108px] tracking-[1px] font-[800]'>{name}</div>
            </div> 
            <div className="flex items-center ">
            <div className="hover:bg-white hover:bg-opacity-10 transition-all ease-in-out duration-300 p-2 rounded-full ml-2 hidden sm:flex" onClick={sliderLeft}>
                <MdNavigateBefore className="text-white text-2xl " />
            </div>
            <div className="flex space-x-[1.65rem] overflow-x-scroll scrollbar-hide scroll-smooth -mt-4 xxs:mt-0 py-4 pl-5 xxs:pl-7 2xl:pl-3" id={`slider${name}`} >
                {data.map((item) => (
                <Card
                    data={item}
                    key={item._id}
                />
                ))}
            </div>
            <div onClick={sliderRight} className="hover:bg-white hover:bg-opacity-10 transition-all ease-in-out duration-300 p-2 rounded-full mx-2 hidden sm:flex">
                <MdNavigateNext className="text-white text-2xl " />
            </div>
        </div>
    </>
  )
}

export default SubCategory