import React, { useState,useEffect } from 'react'
import {
    BsCart2
} from 'react-icons/bs';
import {
    HiMenuAlt1
} from 'react-icons/hi';
import { Link } from 'react-router-dom';
import useFetch from '../../api/useFetch';
import useAppStore from '../../store/appSlice';
import useCartStore from '../../store/cartSlice';
import useUserStore from '../../store/userSlice';
import { SearchInput } from '../Inputs';
import { motion } from 'framer-motion';
import { headerVariants } from '../../utils/variants';

const TopNav = () => {
  const toggleSidebar = useAppStore((state) => state.toggleSidebar);
  const cart = useCartStore((state) => state.cart);
  const token = useUserStore(state => state.token)
  const getCart = useCartStore(state=> state.getCart);
  const details = useUserStore(state=> state.details);
  const [isHeaderFixed, setIsHeaderFixed] = useState(false);

  useEffect(() => {
    function handleScroll() {
      if (window.pageYOffset > 0) {
        setIsHeaderFixed(true);
      } else {
        setIsHeaderFixed(false);
      }
    }
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const data = {
      token: token,
      from: "",
      to: ""
    }
    getCart(data);
  }, [])

  let cartNumber = cart && cart.quantity;


  
  return (
    <motion.header
      variants={headerVariants}
      initial="unfixed"
      animate={isHeaderFixed ? 'fixed' : 'unfixed'}
      className="py-6 w-full z-30 bg-default px-4"
    >
        <div className="w-full flex justify-between items-center">
          <button onClick={() => toggleSidebar()}  className="text-xl font-bold text-gray-500 w-8 h-8 rounded-full flex justify-center items-center"><HiMenuAlt1/></button>
          <SearchInput/>
          <Link to='/profile' className=' w-8 h-8 rounded-full bg-slate-200 overflow-hidden'>
            <img src={details.photo ? details.photo : ''} alt="" className="" />
          </Link>
        </div>
    </motion.header>
  )
}

export default TopNav