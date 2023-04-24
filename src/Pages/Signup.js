import React,{ useState} from "react";
import { Link } from "react-router-dom";
import { RxCross2 } from 'react-icons/rx'
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";


function Signup() {
  const navigate = useNavigate();

  const [name, setName ] = useState('')
  const [email, setEmail ] = useState('')
  const [password, setPassword ] = useState('')

  const submitHandler = async(e) => {
    e.preventDefault();
    const response = await fetch('https://vyanjan-backend-ppeg0b564-praveen-yad.vercel.app/api/signup',{
      method:"POST",
      headers:{
        "Content-Type":'application/json'
      },
      body:JSON.stringify({
        name:name,
        email:email,
        password:password
      })
    });
    const json = await response.json();
    console.log(json)
    if(json.succes){
      navigate('/login')
      axios.post('https://vyanjan-backend-ppeg0b564-praveen-yad.vercel.app/api/tocart',{
          email:email
        }).catch((err) => {
          console.log(err)
        })
    }
  }
  return (
    <div className="w-full min-h-screen flex flex-col items-center lg:items-start lg:flex-row overflow-hidden py-5 md:pl-16 bg-neutral-900 font-poppins relative ">
      <Link to={'/'}>
        <div className="absolute right-5 z-20 text-3xl text-white hover:bg-neutral-500 p-1 rounded-full hover:bg-opacity-20"><RxCross2/></div>
      </Link>
      <div className="w-[90%] md:w-[60%] lg:w-[35%] xl:w-[45%] lg:h-[100vh] flex items-center translate-x-0 md:-translate-x-20 lg:translate-x-0">
        <div className="bg-theme -translate-x-7 md:translate-x-0 scale-[0.7] md:scale-[0.95] rounded-full shadow-lg shadow-black">
          <img alt="" src="https://res.cloudinary.com/de2rges3m/image/upload/v1681362581/gofood/anh-nguyen-kcA-c3f_3FE-unsplash-PhotoRoom.png-PhotoRoom_zzg0qr.png" className="scale-[1.45]  md:scale-[1.4] -translate-y-1 translate-x-24 md:translate-x-32 lg:translate-x-40 rounded-full" />
        </div>
      </div>
      <div className="lg:h-[100vh] flex flex-col items-center lg:justify-center lg:ml-44">
        <div className=" text-[30px] lg:text-[42px] xl:text-[50px] mb-12 lg:mb-6 font-medium text-white text-center w-full mt-0 md:mt-12 lg:mt-0">
          Signup to <span className="text-theme">Vyanjan</span>
        </div>
        <form className="flex flex-col text-white w-[21rem] lg:w-[24rem] xl:w-[25rem] space-y-4" onSubmit={submitHandler}>
        <div className="relative bg-theme rounded-full flex justify-center"> 
            <input required className="group py-2 px-3 text-center bg-neutral-800 rounded-full w-full outline-none focus:w-[20rem]  lg:focus:w-[23rem] xl:focus:w-[24rem] transition-all duration-300 scale-x-[1.015]" placeholder="Username" type='text' value={name} onChange={(e)=>setName(e.target.value)} />

          </div>
          <div className="relative bg-theme rounded-full flex justify-center"> 
            <input required className="group py-2 px-3 text-center bg-neutral-800 rounded-full w-full outline-none focus:w-[20rem] lg:focus:w-[23rem] xl:focus:w-[24rem] transition-all scale-x-[1.015] duration-300" placeholder="Email" type='email' value={email} onChange={(e)=>setEmail(e.target.value)} />

          </div>
          <div className="relative bg-theme rounded-full  flex justify-center"> 
            <input required className="group py-2 px-3 bg-neutral-800 rounded-full w-full outline-none focus:w-[20rem] lg:focus:w-[23rem] xl:focus:w-[24rem] duration-300 text-center transition-all scale-x-[1.015]" placeholder="Password" type='password' value={password} onChange={(e)=>setPassword(e.target.value)} />
          </div>
          <div className="flex justify-between">
            <div className="text-[12px]">Already signed it{' '}
            <Link to={'/login'}>
             <span className="text-theme underline cursor-pointer">Login</span>
            </Link>
            </div>
            <motion.div whileTap={{scale:0.97}}><button className="bg-theme px-4 py-2 rounded-full cursor-pointer hover:outline outline-[2px]">Proceed</button></motion.div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
