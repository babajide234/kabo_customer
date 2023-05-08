import { motion } from 'framer-motion';
import React from 'react';
import { toast } from 'react-toastify';
import { CgClose } from 'react-icons/cg';

import { container, item } from '../../utils/variants';

const Alert = ({open,close,children}) => {

  return (
    <motion.div
        variants={container}
        initial='hidden'
        animate={ open ? 'show':'hidden'}
        className={`fixed w-full h-screen top-0 left-0 z-50 bg-gray-900/30 ${ open ? 'flex':'hidden' } justify-center items-center`}
    >
      <div className=" relative w-5/6 min-h-20 bg-white rounded-xl px-5 py-10 flex flex-col items-center justify-center">

        <button onClick={close} className=" absolute right-2 top-2 text-2xl w-12 h-12 rounded-full flex justify-center items-center hover:bg-gray-300"><CgClose/></button>

        {children}
      </div>
    </motion.div>
  )
};


export default Alert;