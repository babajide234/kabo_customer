import React from 'react'
import { Link } from 'react-router-dom'

export const CommonHeader = ({ headerText, link, linkText}) => {
  return (
    <div className=" px-5 flex items-center justify-between my-3">
        <h1 className=" text-lg leading-10 font-bold">{headerText}</h1>
        <Link to={link} className=' font-bold capitalize text-primary'>{linkText}</Link>
    </div>
  )
}
export const NoProducts = () => {
  return (
    <div className=" w-full h-72 flex justify-center items-center">
        <h1 className=" text-lg leading-10 font-bold">No Products</h1>
    </div>
  )
}

