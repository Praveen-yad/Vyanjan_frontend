import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { MdOutlineFoodBank } from 'react-icons/md'

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

import { EffectCoverflow, Pagination } from "swiper";

function Slider() {
  const scrollFxn = (name) => {
    if(name === 'Indian'){
      window.scrollTo(0, 620)
    }else if(name === 'Italian'){
      window.scrollTo(0, 1100)
    }else{
      window.scrollTo(0,1500)
    }
  }
  return (
    <div className="w-[100vw] flex justify-center ml-0 md:-ml-16 lg:ml-0">
        <Swiper
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={3}
        initialSlide={1}
        coverflowEffect={{
          rotate: 0,
          stretch: 2,
          depth: 60,
          modifier: 2,
          slideShadows: false,
        }}
        pagination={false}
        modules={[EffectCoverflow, Pagination]}
        breakpoints={{
          10:{
            spaceBetween:-140
          },
          450:{
              spaceBetween:-20
          },
          768:{
            spaceBetween:-170
          },
          1024:{
            spaceBetween:-100
          },
          1280:{
            spaceBetween:1
          }
        }}
        className="2xl:w-[80rem] xl:w-[70rem] lg:w-[60rem] md:w-[47rem] sm:w-[35rem] overflow-visible xxs:w-[27rem] w-[23rem] "
      >
        {a.map((item, index) => (
        <SwiperSlide key={index} className="">
          <div className="w-[28rem] h-[23.5rem] bg-white backdrop-blur-md bg-opacity-20 rounded-3xl overflow-hidden p-3 font-poppins scale-[0.4] sm:scale-[0.5] md:scale-[0.7] lg:scale-[0.7] xl:scale-90 2xl:scale-100 xxs:-translate-x-[150px] -translate-x-[110px] md:translate-x-0 sm:-translate-x-28">
            <div className="overflow-hidden h-[14rem] rounded-2xl">
              <img onClick={() => scrollFxn(item.name)} alt="failed" src={item.image} className=" w-full object-cover h-[14rem] scale-[1.05]"/>
            </div>
            <div className="capitalize text-2xl font-medium px-1 mt-2  mb-1 flex items-center"><MdOutlineFoodBank/> {item.name}</div>
            <div className="px-1 text-sm">{item.disc}</div>
            <div className="text-right"><span className="px-2 bg-neutral-900 py-1 rounded-br-xl rounded-l-md rounded-tr-md " onClick={() => scrollFxn(item.name)}>Explore</span></div>
          </div>
        </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

export default Slider

const a = [
    {
        image:"https://res.cloudinary.com/de2rges3m/image/upload/v1681996279/gofood/pexels-engin-akyurt-1487511_ic3y8a.jpg",
        name:"Italian",
        disc:"Italian cuisine is a Mediterranean cuisine consisting of the ingredients, recipes and cooking techniques developed across the Italian Peninsula",
    },
    {
        image:"https://res.cloudinary.com/de2rges3m/image/upload/v1681996527/gofood/pexels-saveurs-secretes-5410400_zv4l5x.jpg",
        name:"Indian",
        disc:"Indian cuisine consists of a variety of regional and traditional cuisines. This cuisines vary substantially and use locally available spices, herbs and vegetables",
    },
    {
        image:"https://res.cloudinary.com/de2rges3m/image/upload/v1681546033/gofood/premium_photo-1664648234174-96f1245fc916_v7noiv.avif",
        name:"Maxican",
        disc:"Mexican cuisine consists of the cooking cuisines and traditions of the modern country of Mexico. Its earliest roots lie in Mesoamerican cuisine.",
    },
    
]