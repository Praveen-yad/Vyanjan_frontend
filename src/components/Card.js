import React, {useEffect, useState} from 'react'
import { HiMinus, HiPlus } from 'react-icons/hi'
import { BiRupee } from 'react-icons/bi'
import axios from 'axios'
import { add, remove } from '../store/cardSlice'
import { useDispatch } from 'react-redux'
import { motion } from 'framer-motion'
import {AiOutlineShoppingCart} from 'react-icons/ai'
import Url from '../Url'

function Card({data}){
    const dispatch = useDispatch()
    const [size, setSize] = useState('half')
    const [count, setcount] = useState(1)
    const [toggle , setToggle ] = useState(true)
    const [token] = useState(localStorage.getItem('token'))
    const email = localStorage.getItem('email')

    const AddToCart = async(id) => {
        await axios.put(`${Url}/upcart`,{
            email: email,
            id: id,
            amount:count,
            size:size,
            name:data.name,
            CategoryName:data.CategoryName,
            description:data.description,
            options:{
                half:data.options.half,
                full:data.options.full
            },
            img:data.img
        })
        setToggle(false)
        dispatch(add())
    }

    useEffect(() => {
        const apiCall = async() => {
            const json = await axios.post(`${Url}/getcart`,{email:localStorage.getItem('email')})
            let items = json.data.items
            let ied = data._id
            items && items.map((item) => item.id === ied && setToggle(false))
        }
        apiCall()
    },[data._id])

    const RemoveHandler = async(id) => {
        await axios.put(`${Url}/decart`,{
            email: email,
            id: id
        })
        setToggle(true)
        dispatch(remove())
    }

  return (
    <div className=' bg-neutral-900 h-[12rem] sm:h-[16rem] rounded-2xl overflow-hidden min-w-[21rem] sm:min-w-[28rem] shadow-[1px_1px_10px_0px] shadow-black flex items-center '>
        <div className='bg-white w-[15rem] h-[16rem]'>
            <img alt='failed' src={data.img} className='w-full h-full object-cover select-none' />
        </div>
        <div className='mx-3 my-1 w-[13rem]'>
            <div className='text-[20px] select-none mb-2'>{data.name}</div>
            <div className='text-[13px] select-none hidden sm:flex'>{data.description.slice(0,120)}</div>
            <div className='flex items-center justify-between mx-[1px] mt-5'>
                <div className='flex bg-neutral-800 w-fit rounded-sm items-center'>
                    <div className='px-1' onClick={() => (count > 1) && setcount((count) => count-1)}><HiMinus/></div>
                    <div className='bg-neutral-900 px-1 select-none'>{count}</div>
                    <div className='px-1' onClick={() => (count < 10) && setcount((count) => count+1)}><HiPlus/></div>
                </div>
                <div>
                <select onChange={(e) => setSize(e.target.value)} className='bg-neutral-800 outline-none rounded-[4px] px-1 select-none py-0.5'>
                        <option value={"half"} className='select-none'>Half</option>
                        <option value={"full"} className='select-none'>Full</option>
                    </select>
                </div>
            </div>
            <div className='flex mt-4 justify-between'>
                <div className=' flex items-center'>
                    <BiRupee className='text-xl'/> 
                    <span id='total' className='select-none'>{(size === 'half')? data.options.half*count : data.options.full*count }</span>
                </div>
                {toggle ? (token) ? 
                    <motion.div whileTap={{scale:0.97}} className='bg-theme px-2 py-1 rounded-md text-center hover:outline outline-[1.5px] cursor-pointer'
                    onClick={() => AddToCart(data._id) } ><AiOutlineShoppingCart size={22} className='w-[2.69rem]'/></motion.div>
                :
                    <div className=' bg-theme px-2 py-1 rounded-md text-center hover:outline hover:opacity-75 outline-[1.5px] cursor-not-allowed select-none'><AiOutlineShoppingCart size={22} className='w-[2.69rem]'/></div>
                :
                <motion.div whileTap={{scale:0.96}} className='bg-theme px-2 py-1 rounded-md text-center hover:outline outline-[1.5px] cursor-pointer' onClick={() => RemoveHandler(data._id)} >Remove</motion.div>

                }
            </div>
        </div> 
    </div>
  )
}

export default Card