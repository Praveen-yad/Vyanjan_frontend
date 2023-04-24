import React,{ useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import Cookies from 'js-cookie'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useLocation } from 'react-router-dom'

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate()
  const item = useSelector((state) => state.cart)
  const [token , setToken ] = useState('')
  const [count, setCount] = useState()

  const Navigation = () => {
    if(count !== 0){
      navigate('/cart')
    }
  }

  useEffect(() => {
    setToken(Cookies.get('token'))
  },[token])

  useEffect(() => {
    const apiCall = async() => {
      const json = await axios.post('http://localhost:5000/api/getcart',{email:localStorage.getItem('email')})
      const items = json.data.items
      setCount(items.length)
    }
    apiCall()
  },[item])
  
  const LogoutHandler = async() => {
    await Cookies.remove('token')
    setToken('')
    localStorage.removeItem('email')
    window.scrollTo(0,0)
    navigate('/')
  }

  if(location.pathname === '/cart'){
    if(count === 0){
      setTimeout(() => {
        navigate('/')
      }, 50)
    }
  }
  
  return (
    <div className='bg-neutral-900 w-full h-[4.5rem] px-5 flex items-center justify-between shadow-[0px_3px_4px_0px] shadow-black sticky top-0 z-10'>
      <div className='flex space-x-8 items-center relative'>
        <img alt='' src='https://res.cloudinary.com/de2rges3m/image/upload/v1681306027/vyanjan-removebg-preview_ocfns3.png' className='w-52 -translate-x-4' onClick={() => navigate('/')} />
        {(location.pathname !== '/') && <div className='text-neutral-300 pt-1 cursor-pointer -translate-x-8' onClick={() => navigate('/')}>Home</div>}
        {(location.pathname !== '/orders') && <div className='text-neutral-300 pt-1 cursor-pointer -translate-x-8' onClick={() => navigate('/orders')}>Orders</div>}
      </div>
      {(token)? 
      <div className='flex  space-x-3 font-poppins'>
        {location.pathname !== '/cart' && 
          <motion.div whileTap={{scale:0.97}} className='bg-theme text-black px-4 py-1 rounded-md cursor-pointer relative' onClick={Navigation} >Cart
          {(count === 0) ?
            <span></span>
          :
            <span className='absolute -top-[10px] -left-[10px] px-2 scale-75 bg-white rounded-full'>{count}</span>
          }
          </motion.div>
        }
        <motion.div whileTap={{scale:0.97}} className='bg-theme text-black px-4 py-1 rounded-md cursor-pointer' onClick={LogoutHandler}>Logout</motion.div>
      </div>
      :
      <div className='flex  space-x-3 font-poppins'>
        <Link to={'/login'}>
          <motion.div whileTap={{scale:0.97}} className=' bg-theme text-black px-4 py-1 rounded-md cursor-pointer'>Login</motion.div>
        </Link>
        <Link to={'/signup'}>
          <motion.div whileTap={{scale:0.97}} className='bg-theme cursor-pointer text-black px-4 py-1 rounded-md'>Signup</motion.div>
        </Link>
      </div> 
      }
    </div>
  )
}

export default Navbar