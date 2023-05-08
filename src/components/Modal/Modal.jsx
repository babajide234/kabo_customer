import React from 'react'
import { CgClose } from 'react-icons/cg';
import { motion } from 'framer-motion';
import { container, item } from '../../utils/variants';

export const Modal = ({ title,open,close, children}) => {
  return (
    <motion.div
        variants={container}
        initial='hidden'
        animate={ open ? 'show':'hidden'}
        className={`fixed w-full h-screen top-0 left-0 z-50 bg-gray-900/30 ${ open ? 'flex':'hidden' } justify-end items-end`}
    >
        <motion.div variants={item} className=" relative pt-20 px-5 w-full h-5/6 bg-default rounded-tl-[50px] rounded-tr-[50px] flex flex-col">
            <button onClick={close} className=" absolute right-10 top-10 text-2xl w-12 h-12 rounded-full flex justify-center items-center hover:bg-gray-300"><CgClose/></button>
            <h2 className=" text-2xl font-semibold mb-10 text-gray-800 capitalize">{ title }</h2>
            <div className=" overflow-auto mt-5">
                {children}
            </div>
        </motion.div>
    </motion.div>
  )
}
