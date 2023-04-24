import React,{ useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { RxCross2 } from 'react-icons/rx'
import Cookies from 'js-cookie'
import { GiBurningSkull } from 'react-icons/gi'
import { motion } from 'framer-motion'

function Login() {
  const navigate = useNavigate()
  const [ email, setEmail ] = useState('')
  const [ password, setPassword ] = useState('')
  const [toggle, setToggle] = useState(false)

  const SubmitHandler = async(e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:5000/api/login',{
      method:"POST",
      headers:{
        "Content-Type":'application/json'
      },
      body:JSON.stringify({
        email:email,
        password:password
      })
    });
    const data = await response.json();
    console.log(data)
    Cookies.set('token',data.token)

    if(data.sucess){
      navigate('/')
      localStorage.setItem('email',data.info.email)
    }
  }

  return (
    <div className="w-full h-[100vh] flex overflow-hidden p-5 bg-neutral-900 font-poppins pl-16 group relative">
      <Link to={'/'}>
        <div className="absolute right-5 text-3xl text-white hover:bg-neutral-500 p-1 rounded-full hover:bg-opacity-20"><RxCross2/></div>
      </Link>
      <div className="w-[45%] h-full flex items-center">
        <div className="bg-theme scale-[0.95] rounded-full shadow-lg shadow-black">
          <img alt="" src="https://res.cloudinary.com/de2rges3m/image/upload/v1681362581/gofood/anh-nguyen-kcA-c3f_3FE-unsplash-PhotoRoom.png-PhotoRoom_zzg0qr.png" className='scale-[1.4]  -translate-y-1 translate-x-40 rounded-full' />
        </div>
      </div>
      <div className="flex-1 flex flex-col items-center justify-center ml-24">
        <div className="text-[50px] mb-6 font-medium text-white text-center w-full">
          Login to <span className="text-theme">Vyanjan</span>
        </div>
        <form onSubmit={SubmitHandler} className="flex flex-col text-white w-[25rem] space-y-4">
          <div className="relative bg-theme rounded-full flex justify-center"> 
            <input required className="group py-2 px-3 text-center bg-neutral-800 rounded-full w-full outline-none focus:w-[24rem] transition-all scale-x-[1.015] duration-300" placeholder="Email" type='email' onChange={(e) => setEmail(e.target.value)}/>

          </div>
          <div className="relative bg-theme rounded-full  flex justify-center "> 
            <input required className="group py-2 px-3 bg-neutral-800 rounded-full w-full outline-none focus:w-[24rem] duration-300 text-center transition-all scale-x-[1.015]" placeholder="Password" type={`${!toggle? 'password': 'text'}`} onChange={(e) => setPassword(e.target.value)} />
            <span className='absolute right-3 bottom-0 top-2.5' onClick={() => setToggle(!toggle)}><GiBurningSkull className='-mt-0.5 hover:text-red-500 cursor-pointer transition-colors duration-200' size={23}/></span>
          </div>
          <div className="flex justify-between">
            <div className="text-[12px]">Don't have an account?{' '}
            <Link to={'/signup'}>
             <span className="text-theme underline cursor-pointer">Signup</span>
            </Link>
            </div>
            <motion.div whileTap={{scale:0.97}}><button className="bg-theme px-4 py-2 rounded-full cursor-pointer hover:outline outline-[2px]">Proceed</button></motion.div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login