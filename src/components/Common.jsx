import React from 'react'
import { Link } from 'react-router-dom'
import { AiOutlineShoppingCart } from "react-icons/ai";
import { RiArrowLeftSLine } from "react-icons/ri";

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
    <div className="w-full h-72 flex flex-col justify-center items-center">
      <AiOutlineShoppingCart className="text-[50px] mb-4 text-gray-500" />
      <h1 className="text-lg leading-10 font-bold">No Products</h1>
      <Link  className="mt-4 text-sm  bg-primary flex justify-between items-center text-default px-10 py-3 rounded-3xl ">
        Go back
      </Link>
    </div>
  )
}

