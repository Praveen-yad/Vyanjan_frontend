import React, { useState } from 'react'
import { MdClose } from 'react-icons/md'
import { FcMoneyTransfer } from 'react-icons/fc'
import { motion } from 'framer-motion'
import { CiSaveUp1 } from 'react-icons/ci'
import axios from 'axios'

const Order = ({setToggle, cartArray, setPlaced}) => {
    const [ tip , setTip ] = useState(0)
    const [cash, setcash] = useState(true)
    const [location, setLocation] = useState('')


    const PlaceOrder = async() => {
        await axios.post('https://vyanjan-backend-ppeg0b564-praveen-yad.vercel.app/api/order',{
            email:localStorage.getItem('email'),
            items:cartArray,
            location:location,
            tip:tip,
            payment:'cash',
            status:'Order Places'
        }).then(res => {
            res.data.sucess === true && setToggle(old => !old)
            res.data.sucess === true && setPlaced(old => !old) 
        }).catch(err => console.log(err))
        await axios.post('https://vyanjan-backend-ppeg0b564-praveen-yad.vercel.app/api/emptycart',{
            email:localStorage.getItem('email')
        })
    }

  return (
    <div className='bg-white rounded-2xl w-[22rem] xxs:w-[28rem] sm:w-[33rem] h-[24rem] xxs:h-[25rem] py-2 px-2'>
        <div>
            <div className='bg-black ml-auto w-fit p-1 rounded-full bg-opacity-0 hover:bg-opacity-30' onClick={() => setToggle(old => !old)}><MdClose  size={26}/></div>
            <div className='px-5 -mt-1'>
                <div>Location</div>
                <input onChange={(e) => setLocation(e.target.value)} className='w-full mt-2 bg-transparent outline outline-1 px-2 py-1 rounded-md'/>
            </div>
            <div className='px-5 mt-5'>
                <div>Payment</div>
                <div className='flex justify-between mt-2'>
                    <div className=' w-[5.5rem] xxs:w-[7.5rem] sm:w-[9rem] h-[5rem] rounded-lg p-2 bg-neutral-900 flex items-center justify-center cursor-not-allowed hover:bg-opacity-95'>
                        <img alt='Error' src='https://res.cloudinary.com/de2rges3m/image/upload/v1682090364/gofood/1200px-UPI-Logo-vector.svg_sije3o.webp' className='select-none'/>
                    </div>
                    <div className=' w-[5.5rem] xxs:w-[7.5rem] sm:w-[9rem] h-[5rem] rounded-lg p-2 bg-neutral-900 flex items-center justify-center cursor-not-allowed hover:bg-opacity-95'>
                        <img alt='Error' src='https://res.cloudinary.com/de2rges3m/image/upload/v1682090364/gofood/pmx-logo-mastercard-sanstext_tto67h.webp' className='select-none'/>
                    </div>
                    <motion.div onClick={() => setcash(!cash)} whileTap={{scale:0.97}} className={` w-[5.5rem] xxs:w-[7.5rem] sm:w-[9rem] h-[5rem] rounded-lg p-2 bg-neutral-900 flex items-center justify-center ${cash ? 'outline outline-theme xxs:outline-4': ''}`}>
                        <img alt='Error' src='https://res.cloudinary.com/de2rges3m/image/upload/v1682090364/gofood/cash-icon-29_xgkuph.png' className='w-[4rem] select-none'/>
                    </motion.div>
                </div>
                <div className='mt-5 '>
                    <div>Add a Tip</div>
                    <div className='flex justify-between text-white mt-2'>
                        {[0, 30, 60].map((item, index) => (
                            <motion.div onClick={() => setTip(item)} className={` w-[65px] xxs:w-[90px] sm:w-24 h-16 xxs:h-20 bg-neutral-900 flex justify-center items-center rounded-lg ${tip === item && 'outline outline-theme xxs:outline-4'}`} whileTap={{scale:0.97}} key={index}><FcMoneyTransfer/>{item}</motion.div>
                        ))}
                        <motion.div className=' w-[65px] xxs:w-[90px] sm:w-24 h-16 xxs:h-20 bg-theme flex justify-center items-center rounded-lg cursor-pointer' whileTap={{scale:0.97}} onClick={PlaceOrder}><CiSaveUp1 className='text-3xl rotate-90'/></motion.div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Order
