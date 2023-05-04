import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import axios from 'axios'
import { BiRupee } from 'react-icons/bi'
import { MdCurrencyRupee } from 'react-icons/md'
import Footer from '../components/Footer'
import Url from '../Url'

const Business = () => {
    const [ array, setArray ] = useState([])


    useEffect(() => {
        const apiCall = async() => {
            const response = await axios.post(`${Url}/allOrders`)
            setArray(response.data.json)
        }
        apiCall();
          
    }, [])

  return (
    <div className='min-h-screen bg-neutral-900'>
    <Navbar/>
    <div className=''>
        <div className='text-4xl text-white pt-4 pl-3 pb-6 font-medium'>Orders</div>
    </div>
    <div className='space-y-6 pb-10 min-h-screen'>
        {array.map((item, index) =>(
            <div key={index}>

                <div className='pl-7 pt-3 pb-6 text-lg'>
                    <div className=' text-white  w-fit md:flex md:flex-wrap space-y-2 md:space-x-5'>
                        <div className='bg-neutral-800 shadow-black shadow-sm px-4 py-2 rounded-xl capitalize'>From: {item.name}</div>
                        <div className='bg-neutral-800 shadow-black shadow-sm px-4 py-2 rounded-xl'>Location: {item.location}</div>
                        <div className='bg-neutral-800 shadow-black shadow-sm px-4 py-2 rounded-xl'>Phone Number: {item.phone}</div>
                        <div className='bg-neutral-800 shadow-black shadow-sm px-4 py-2 rounded-xl flex items-center'>Total: <MdCurrencyRupee/>{item.total}</div>
                    </div>
                </div>

                <div  className='w-[100%] flex flex-col items-center 2md:grid 2xl:grid-cols-3 2md:grid-cols-2 2md:gap-y-7 px-7 border-b border-dashed pb-12 border-neutral-600'>
                    {(item.items).map((data, indexes) => (
                        <div className='-mb-10 xxs:mb-2 sm:mb-0 scale-[0.7] xxs:scale-[0.9] md:scale-[0.8] translate-x-0 md:-translate-x-9 lg:translate-x-0 lg:scale-100 h-[15rem] bg-neutral-900 text-white w-[29.5rem] rounded-3xl flex overflow-hidden shadow-[1px_1px_10px_0px] shadow-black' key={indexes}>
                        <img alt='Not Found' src={data.img} className='w-[14rem] h-[15rem] object-cover' />
                        <div className='flex-1 px-3 p-2 mt-3'>
                        <div className='text-2xl text-theme font-[400] '>
                            {data.name}
                        </div>
                        <div className=' flex flex-col space-y-2'>
                            <div className='text-white mb-2'>{data.CategoryName}</div>
                            <div className='grid grid-cols-2 place-items-center scale-95 gap-x-4 gap-y-2.5 text-black'>
                            <div className='bg-theme w-[7rem] text-center py-3 rounded-l-xl rounded-tr-xl'>Amount= {data.amount}</div>
                            <div className='bg-theme w-[7rem] text-center py-3 rounded-tl-xl rounded-r-xl'>Size= {data.size}</div>
                            <div className='bg-theme w-[7rem] text-center py-3 rounded-l-xl rounded-br-xl flex items-center justify-center'>Total=<BiRupee/>{(data.size === 'half')? data.options.half*data.amount : data.options.full*data.amount}</div>
                            <div className='bg-green-500 w-[7rem] text-center py-3 rounded-r-xl rounded-bl-xl flex items-center justify-center'>{item.status}</div>
                            </div>
                        </div>
                        </div>
                    </div>
                    ))}
                </div>
            </div>
        ))}
    </div>
  <Footer/>
</div>
  )
}

export default Business
