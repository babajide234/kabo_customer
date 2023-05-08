import React from 'react'
import { Link } from 'react-router-dom'

const Buttons = ({to,type,btn,children, ...rest}) => {
  return (
    <>
      {
        btn ? (
          <button  className={`
              w-full max-h-10 py-4 flex justify-center items-center text-lg font-bold rounded-full
              ${ type == 'default' && ' bg-default text-primary'}
              ${ type == 'primary' && ' bg-primary text-default'}
          `} {...rest}>{children}</button>    
          ) : (
          <Link to={to} className={`
              w-full max-h-10 py-4 flex justify-center items-center text-lg font-bold rounded-full
              ${ type == 'default' && ' bg-default text-primary'}
              ${ type == 'primary' && ' bg-primary text-default'}
          `} {...rest}>{children}</Link>    
        )

      }
    </>
  )
}

export default Buttons