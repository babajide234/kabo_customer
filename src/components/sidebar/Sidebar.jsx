import React from 'react'
import { motion } from 'framer-motion';

import { BiUserCircle } from "react-icons/bi";
import { CiStickyNote } from "react-icons/ci";
import { FaShieldAlt } from "react-icons/fa";

import {
  BsShieldShaded,
  BsCart2,
  BsTag,
  BsArrowRight
} from 'react-icons/bs';
import {
  GrClose
} from 'react-icons/gr';
import { Link } from 'react-router-dom';
import useAppStore from '../../store/appSlice';
import useUserStore from '../../store/userSlice';
import { leftToRight } from '../../utils/variants';



const Sidebar = () => {
  const sidebar = useAppStore(state =>  state.sidebar)
  const toggleSidebar = useAppStore(state =>  state.toggleSidebar)
  const logout = useUserStore(state =>  state.logout)
  const isLoggedIn = useUserStore(state =>  state.isLoggedIn)

  const log = ()=>{
    logout();
    toggleSidebar();
  }
  
  return (
    <motion.div 
      key={'sidbar'} 
      variants={leftToRight}
      initial="hidden"
      animate={sidebar ? 'show' : 'hidden'}
      transition={{ duration: 0.3 }}
      className={` min-h-screen w-[70%] bg-primary absolute top-0 left-0  px-10 ${ sidebar ? ' z-50' : 'hidden '} ` }
    >
      <div className=" h-screen flex flex-col justify-between items-start py-20">
        {/* <button className="  absolute top-5 right-5 bg-default p-2 rounded-full"><GrClose className='text-default'/></button> */}
        <ul className=" flex flex-col ">
          <li className='  text-base text-default font-semibold py-5 border-b border-solid border-slate-50 last-of-type:border-b-0 capitalize '> 
            <Link to='/' className=' flex items-center'>  <BiUserCircle className='mr-3 font-black text-2xl'/> Profile</Link>
          </li>
          <li className='  text-base text-default font-semibold py-5 border-b border-solid border-slate-50 last-of-type:border-b-0 capitalize  '> 
             <Link to='/' className=' flex items-center'> <BsCart2 className='mr-3 font-black text-2xl'/> orders</Link>  
          </li>
          <li className='  text-base text-default font-semibold py-5 border-b border-solid border-slate-50 last-of-type:border-b-0 capitalize '>  
             <Link to='/' className=' flex items-center' > <BsTag className='mr-3 font-black text-2xl'/> offer and promo</Link>  
          </li>
          <li className='  text-base text-default font-semibold py-5 border-b border-solid border-slate-50 last-of-type:border-b-0 capitalize  '>  
             <Link to='/' className=' flex items-center ' ><CiStickyNote className='mr-3 font-black text-2xl'/> Privacy policy</Link>  
          </li>
          <li className='  text-base text-default font-semibold py-5 border-b border-solid border-slate-50 last-of-type:border-b-0  capitalize '>  
             <Link to='/' className=' flex items-center' ><FaShieldAlt className='mr-3 font-black text-2xl'/> Security</Link>  
          </li> 
        </ul>
        {
          isLoggedIn ? 
          <button onClick={log} className=' text-base text-default font-semibold flex items-center'>Sign-out <BsArrowRight className='ml-3 font-black text-2xl'/></button>
          :
          <Link to='/login' onClick={toggleSidebar} className=' text-base text-default font-semibold flex items-center'>Login <BsArrowRight className='ml-3 font-black text-2xl'/> </Link>
        }
        
      </div>
    </motion.div>
  )
}

export default Sidebar