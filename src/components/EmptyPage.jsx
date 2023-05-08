import React from 'react'

const EmptyPage = ({image,title,subtitle}) => {
  return (
    <div className=" flex flex-col justify-center text-center items-center h-full px-5">
        <img src={image} alt="" className=" mb-3" />
        <h2 className=" text-2xl font-thin mb-3 ">{title}</h2>
        <p className=" w-56">{subtitle}</p>
    </div>
  )
}

export default EmptyPage