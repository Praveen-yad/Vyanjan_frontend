import React,{ useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import Cookies from 'js-cookie'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useLocation } from 'react-router-dom'
import { FiMenu } from 'react-icons/fi'
import { RxCross2 } from 'react-icons/rx'

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate()
  const item = useSelector((state) => state.cart)
  const [token , setToken ] = useState('')
  const [count, setCount] = useState()
  const [menu, setMenu] = useState(false)

  const Navigation = () => {
    if(count !== 0){
      navigate('/cart')
    }
  }

  const CartNavigation = () => {
    if(location.pathname !== '/cart'){
      if(count !== 0){
        navigate('/cart')
      }
    } 
  }

  useEffect(() => {
    setToken(Cookies.get('token'))
  },[token])

  useEffect(() => {
    const apiCall = async() => {
      const json = await axios.post(`https://vyanjan-backend.vercel.app/api/getcart`,{email:localStorage.getItem('email')})
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
    <div className='bg-neutral-900 w-full h-[4.5rem] px-5 flex items-center justify-between shadow-[0px_3px_4px_0px] shadow-black sticky top-0 z-50' >
      <div className='flex space-x-8 items-center relative'>
        <img alt='' src='https://res.cloudinary.com/de2rges3m/image/upload/v1681306027/vyanjan-removebg-preview_ocfns3.png' className='w-52 -translate-x-4' onClick={() => navigate('/')} />
        {(location.pathname !== '/') && <div className='text-neutral-300 pt-1 cursor-pointer -translate-x-8 hidden sm:flex' onClick={() => navigate('/')}>Home</div>}
        {(location.pathname !== '/orders') && <div className='text-neutral-300 pt-1 cursor-pointer -translate-x-8 hidden sm:flex' onClick={() => navigate('/orders')}>Orders</div>}
      </div>
      {(token)? 
      <div className='space-x-3 font-poppins hidden sm:flex'>
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
      <div className='flex scale-[0.9] xxs:scale-100 -ml-2 -mr-3 xxs:ml-auto xxs:mr-0 space-x-3 font-poppins'>
        <Link to={'/login'}>
          <motion.div whileTap={{scale:0.97}} className=' bg-theme text-black px-4 py-1 rounded-md cursor-pointer'>Login</motion.div>
        </Link>
        <Link to={'/signup'}>
          <motion.div whileTap={{scale:0.97}} className='bg-theme cursor-pointer text-black px-4 py-1 rounded-md'>Signup</motion.div>
        </Link>
      </div> 
      }
      {(token)? 
      <div className='flex sm:hidden relative'>
        {menu ? 
        <RxCross2 size={30} onClick={() => setMenu(!menu)} className='text-white' />
        :
        <FiMenu size={30} onClick={() => setMenu(!menu)} className='text-white'/>
        }
        <div className={`absolute  right-0 transition-all duration-300 ${menu ? 'top-[65px]' : '-top-[90px]'} ease-in-out px-3 py-4 space-x-3 w-[90vw] flex justify-around bg-neutral-800 text-lg rounded-lg`}>
          <div className='w-full bg-theme px-2 py-1 rounded-md text-center' onClick={() => (location.pathname !== '/') ? navigate('/') : console.log()}>Home</div>

          <div className='w-full bg-theme px-2 py-1 rounded-md text-center relative'onClick={CartNavigation} >Cart
          {count !== 0 && <span className='absolute -top-2 -right-2 bg-neutral-100 rounded-full text-black px-2 scale-[0.7]'>{count}</span>}
          </div>

          <div className='w-full bg-theme px-2 py-1 rounded-md text-center' onClick={() => (location.pathname !== '/orders') ? navigate('/orders') : console.log()}>Orders</div>

          <div className='w-full bg-theme px-2 py-1 rounded-md text-center' onClick={LogoutHandler}>Logout</div>
        </div>
      </div>
      :
      <div></div> 
      }
    </div>
  )
}

export default Navbar