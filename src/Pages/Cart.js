import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { remove } from '../store/cardSlice'
import { useSelector } from 'react-redux'
import { motion } from 'framer-motion'
import { BiRupee } from 'react-icons/bi'
import Order from '../components/Order'
import { Player, Controls } from '@lottiefiles/react-lottie-player';
import { MdClose } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'
import Footer from '../components/Footer'


function Cart() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const item = useSelector((state) => state.cart)
  const [cartArray, setCartArray] = useState()
  const [ toggle, setToggle ] = useState(true)
  const [placed, setPlaced ] = useState(false)

  
  useEffect(() => {
    const apiCall = async() => {
      const json = await axios.post('https://vyanjan-backend-ppeg0b564-praveen-yad.vercel.app/api/getcart', {
        email: localStorage.getItem('email')
      })
      setCartArray(json.data.items)
    }
    apiCall();
  },[item])

  const RemoveHandler = async(id) => {
    await axios.put('https://vyanjan-backend-ppeg0b564-praveen-yad.vercel.app/api/decart',{
        email: localStorage.getItem('email'),
        id: id
    })
    dispatch(remove())
}

  return (
    <div className='bg-neutral-900 font-poppins min-h-[110vh] flex flex-col justify-between'>
      <div className='pb-10'>
        <Navbar/>
        <div className='text-neutral-200 text-4xl font-medium mt-4 ml-4'> Cart</div>
        
        <div className=' sm:mx-8 flex flex-col items-center 2md:grid 2xl:grid-cols-3 2md:grid-cols-2 2md:gap-7 pb-10'>
          {cartArray && cartArray.map((items, index) => (
            <div className='h-[13rem] sm:h-[15rem] bg-neutral-900 text-white mt-7 w-[90vw] xxs/:w-[29.5rem] rounded-3xl flex overflow-hidden shadow-[1px_1px_10px_0px] shadow-black scale-100 2md:scale-[0.8] lg:scale-100 ' key={index}>
              <img alt='Not Found' src={items.img} className='w-[10rem] xxs:w-[12rem] sm:w-[14rem] h-[13rem] sm:h-[15rem] object-cover' />
              <div className='flex-1 px-3 p-2 mt-3'>
                <div className='text-xl xxs:text-2xl text-theme font-[400] '>
                  {items.name}
                </div>
                <div className=' flex flex-col space-y-2'>
                  <div className='text-white mb-2 text-sm xxs:text-base'>{items.CategoryName}</div>
                  <div className='grid grid-cols-2 place-items-center scale-95 gap-x-4 gap-y-2.5 text-black'>
                    <div className='scale-[0.9] xxs:scale-[1] bg-theme text-sm xxs:text-base w-[5.5rem] xxs:w-[7rem] text-center py-3 rounded-l-xl rounded-tr-xl'>Amount= {items.amount}</div>
                    <div className='scale-[0.9] xxs:scale-[1] bg-theme text-sm xxs:text-base w-[5.5rem] xxs:w-[7rem] text-center py-3 rounded-tl-xl rounded-r-xl'>Size= {items.size}</div>
                    <div className='scale-[0.9] xxs:scale-[1] bg-theme text-sm xxs:text-base w-[5.5rem] xxs:w-[7rem] text-center py-3 rounded-l-xl rounded-br-xl flex items-center justify-center'>Total=<BiRupee/>{(items.size === 'half')? items.options.half*items.amount : items.options.full*items.amount}</div>
                    <motion.div whileTap={{scale:0.96}} className='scale-[0.9] xxs:scale-[1] bg-red-600 hover:outline hover:outline-1 text-sm xxs:text-base w-[5.5rem] xxs:w-[7rem] text-center py-3 rounded-r-xl rounded-bl-xl cursor-pointer text-white' onClick={() => RemoveHandler(items.id)}>Remove</motion.div>
                  </div>
                </div>
              </div>
            </div>
            ))}
        </div>
        <div className='px-9'><motion.div whileTap={{scale:0.97}} className='bg-theme w-fit ml-auto px-4 py-2 rounded-lg cursor-pointer' onClick={() => setToggle(!toggle)}>Place Order</motion.div></div>
        {toggle ? <div></div> :
          <div className='fixed top-0 flex justify-center items-center  w-[100vw] h-[100vh] z-20 backdrop-blur-3xl'>
            <Order setPlaced={setPlaced} cartArray={cartArray} setToggle={setToggle} toggle={toggle} />
          </div>
        }

        {placed && 
          <div className='fixed top-0 flex justify-center items-center w-[100vw] h-[100vh] z-20 backdrop-blur-3xl'>
            <div className='bg-neutral-100 rounded-2xl w-[22rem] xxs:w-[28rem] sm:w-[33rem] h-[24rem] py-2 px-2 flex flex-col'>
              <div className='z-10'><div className='ml-auto w-fit p-1 rounded-full hover:bg-black hover:bg-opacity-30 z-50' onClick={() => navigate('/')}><MdClose size={26}/></div></div>
              <div className=' h-[12.5rem]'>
                <Player
                  autoplay
                  loop={false}
                  keepLastFrame={true}
                  src="https://assets5.lottiefiles.com/packages/lf20_rj03nx91.json"
                  style={{ height: '350px', width: '100%' }}
                  speed={1.25}
                  className='-translate-y-20'
                >
                <Controls visible={false} />
                </Player>
              </div>
              <div className='text-center font-semibold text-3xl text-black'>Order Placed</div>
              <div className='flex justify-center'>
              <motion.div onClick={() => navigate('/orders')} className='text-xl text-neutral-100 bg-black w-fit px-3 py-1 rounded-lg cursor-pointer z-10 mt-2' whileTap={{scale:0.97}}>All Orders</motion.div>
            </div>
            </div>
        </div>
        }
      </div>
        <div>
          <Footer/>
        </div>
    </div>
  )
}

export default Cart