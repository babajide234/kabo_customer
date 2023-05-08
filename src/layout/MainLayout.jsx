import React from 'react'
import { Outlet } from 'react-router-dom'
import MobileNav from '../components/Nav/MobileNav'
import TopNav from '../components/Nav/TopNav'
import Sidebar from '../components/sidebar/Sidebar'
import { motion, AnimatePresence } from "framer-motion";
import { scaleDown } from '../utils/variants'
import useAppStore from '../store/appSlice'

const MainLayout = () => {
  const sidebar = useAppStore(state =>  state.sidebar)
  // const sidebar = useAppStore(state =>  state.sidebar)

  return (
      <AnimatePresence>
        <Sidebar/>
        
        <motion.div 
            initial="hidden"
            key={'mainLayout'}
            animate={sidebar ? 'show' : 'hidden'}
            transition={{ duration: 0.3 }}
            variants={scaleDown}
            className={`min-h-screen w-full bg-default pb-10 z-[150] ${ sidebar ? 'rounded-[50px] overflow-hidden' : ''} shadow-[-30px_40px_0px_0px_rgba(255,255,255,0.2)]`}
        >
            <TopNav/>
            {/* <div className="flex flex-col bg-default"> */}
                <Outlet/>
            {/* </div> */}
            <MobileNav/>
        </motion.div>
      </AnimatePresence>
  )
}

export default MainLayout