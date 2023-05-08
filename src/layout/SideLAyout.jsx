import React from 'react'
import { Outlet, useParams } from 'react-router-dom'
import Buttons from '../components/buttons/Buttons'
import PageNav from '../components/Nav/PageNav'
import { motion, AnimatePresence } from 'framer-motion'
import MobileNav from '../components/Nav/MobileNav'

const SideLAyout = () => {
    let { query } = useParams();
  return (
    <AnimatePresence>
      <motion.div 
        initial={{ x: 2000 }}
        animate={{ x: 0 }}
        transition={{ duration: .3 }}
        className=" relative min-h-screen w-full ">
          <PageNav/>
          <div className=" min-h-screen  flex flex-col bg-default">
              <Outlet/>
          </div>
          <MobileNav/>
      </motion.div>
    </AnimatePresence>
  )
}

export default SideLAyout