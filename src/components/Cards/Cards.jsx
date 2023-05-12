import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FaTrash,
  FaRegHeart
} from 'react-icons/fa';
import useCartStore from '../../store/cartSlice';
import useUserStore from '../../store/userSlice';
import { useMutation } from 'react-query';

export const ProductCards = ({src,title,price,id}) => {
  return (
    <Link to={`/product/${id}`} className=" w-[200px] h-[250px] rounded-[30px] shadow-card relative px-6 pb-5 text-center bg-white flex flex-col justify-end ml-[34px] mt-20 mb-20">
        <div className={`w-[160px] h-[160px] overflow-hidden rounded-full  absolute top-[-17%] left-[23px] flex justify-center items-center`}>
          <img src={src} alt="" className=" w-full h-full" />
        </div>
        <h2 className=" text-xl font-extralight capitalize mt-[75px]">{title}</h2>
        <h3 className=" text-primary font-bold text-lg mt-2 ">{price}</h3>
    </Link>
  )
}

export const ProductCard = ({src,title,price,id}) => {
  return (
    <Link 
      to={`/product/${id}`} 
      className=" w-[156px] h-[202px] shadow-card p-3 bg-white flex flex-col ml-[34px] mt-5  rounded-lg  ">
        <div className={`overflow-hidden rounded-lg flex justify-center items-center`}>
          <img src={src} alt="" className=" w-full h-full" />
        </div>
        <h3 className=" text-gray-400 text-xs mt-2">Platters</h3>
        <h2 className=" text-sm font-bold capitalize mt-[6px]">{title}</h2>
        <h3 className=" text-primary font-bold text-sm mt-[6px] ">₦ {price}</h3>
    </Link>
  )
}
export const RecommendProductCard = ({src,title,category,price,id}) => {
  return (
    <Link 
      to={`/product/${id}`} 
      className=" w-[239px] h-[90px] shadow-card p-3 bg-white flex justify-between mr-5 rounded-lg  ">
        <div className={`  w-[64px] h-[64px] mr-4 bg-slate-200 overflow-hidden rounded-lg flex justify-center items-center`}>
          { src ?  <img src={src} alt="" className=" w-full h-full" /> : <div className=" w-full h-[64px] bg-slate-200 rounded-lg mr-4"/>}
        </div>
        <div className="flex flex-col justify-center">
          <h2 className=" text-sm font-bold capitalize text-ellipsis">{ title }</h2>
          <h3 className=" text-gray-400 text-xs">{category}</h3>
          <h3 className=" text-primary font-bold text-sm ">₦ {price}</h3>
        </div>
    </Link>
  )
}

export const SearchProductCards = ({src,title,price,id}) => {
  return (
    <Link to={`/product/${id}`} className=" w-[150px] h-[200px] rounded-[30px] shadow-card relative px-6 pb-5 text-center bg-white flex flex-col justify-end ">
        <div className={`w-[120px] h-[120px] overflow-hidden rounded-full  absolute top-[-20%] left-[17px] flex justify-center items-center`}>
          <img src={src} alt="" className=" w-full h-full" />
        </div>
        <h2 className=" text-xl font-extralight capitalize mt-[75px]">{title}</h2>
        <h3 className=" text-primary font-bold text-lg mt-2 ">{price}</h3>
    </Link>
  )
}


export const CartCards = ({ item }) => {
  const [showButtons, setShowButtons] = useState(false);
  const [quantity, setQuantity] = useState(item.quantity);
  const removeCart = useCartStore((state)=> state.removeCart)
  const updateCart = useCartStore((state)=> state.updateCart)
  const token = useUserStore((state)=> state.token)



  
  const deleteMutation = useMutation((formData) => removeCart(formData), {
    onSuccess: () => {
      // handle successful delete operation
    },
    onError: () => {
      // handle delete operation failure
    },
  });


  const updateMutation = useMutation((formData) => updateCart(formData), {
    onSuccess: () => {
      // handle successful favorite update operation
    },
    onError: () => {
      // handle favorite update operation failure
    },
  });
  
  const handleSwipe = (event, info) => {
    if (info.offset.x < -50) {
      setShowButtons(true);
    } else {
      setShowButtons(false);
    }
  };

  const handleFavorite = (id) => {
      // TODO: implement favorite functionality
      updateMutation.mutate(
        {
          token,
          poid: [id],
          quantity: ""
      });
  };

  const handleDelete = (id) => {
    // TODO: implement delete functionality
    deleteMutation.mutate({
      token,
      poid:[id]
    });
  };

  const increaseCart = (id) => {
    // TODO: implement delete functionality
    updateMutation.mutate({
        token,
        poid: [id],
        quantity:[ parseInt(quantity) + 1 ]
    })
  };
  const decreaseCart = (id) => {
    if (quantity === 1) {
      deleteMutation.mutate({
        token,
        poid:[id]
      });
    } else {
      updateMutation.mutate({
        token,
        poid: [id],
        quantity: [ `${parseInt(quantity) - 1}` ]
      });
    }
  };

  return (
    <div className="relative mb-5">
      <motion.div
        className="relative w-11/12 mx-auto rounded-[20px] bg-white py-3 px-5 flex items-center"
        animate={{ x: showButtons ? -140 : 0 }}
        onPan={handleSwipe}
        onDrag={handleSwipe}
        drag="x"
        dragConstraints={{ left: -140, right: 0 }}
        style={{ zIndex: showButtons ? 1 : 0 }}
      >
        <div className="">
          <img
            src={
              item.main_photo ||
              "https://api.12basketsfoods.com/files/a8a675761f1be5180a56f8e5298b6281YlObT9ZLVR.webp"
            }
            alt={item.name}
            className="w-[100px] h-[100px] rounded-full"
          />
        </div>
        <div className="pl-5">
          <h2 className="text-[17px] font-bold capitalize">{item.name}</h2>
          <div className="flex">
            <h3 className="">{item.amount}</h3>
          </div>
          <div className="absolute right-5 bottom-3 bg-primary w-fit text-white rounded-full overflow-hidden flex justify-between items-center">
            <button onClick={()=> decreaseCart(item.poid)} className="px-3 py-[2px] text-2xl font-bold">-</button>
            <span>{quantity}</span>
            <button onClick={()=> increaseCart(item.poid)} className="px-3 py-[2px] text-2xl font-bold">+</button>
          </div>
        </div>
      </motion.div>
      <motion.div
        className="absolute top-0 right-5 h-full flex items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: showButtons ? 1 : 0 }}
        style={{ zIndex: showButtons ? 0 : -1 }}
      >
        <button
          className="flex items-center justify-center w-[45px] h-[45px] rounded-full bg-[#DF2C2C] text-white mr-5 font-bold text-xl"
          onClick={handleFavorite}
        >
          <FaRegHeart />
        </button>
        <button
          className="flex items-center justify-center w-[45px] h-[45px] rounded-full bg-[#DF2C2C] text-white font-bold text-xl"
          onClick={()=> handleDelete(item.poid)}
        >
          <FaTrash />
        </button>
      </motion.div>
    </div>
  );
}


export const CardContent = ({title,children})=>{
  return(
    <div className=" flex flex-col mb-10 ">
      <div className=" flex justify-between mb-6">
        <h3 className=" font-thin text-xl capitalize">{title}</h3>
      </div>
      <div className=" bg-white w-full mx-auto px-[30px] py-[25px] rounded-[20px] flex flex-col">
        {children}
      </div>
    </div>
  )
}

export const CategoryCard = ({ title, src ,id})=>{
  return(
    <Link 
      to={`/category/${id}`} 
      className=" relative w-full h-[100px] shadow-card p-3 bg-white flex flex-col justify-center mr-5 rounded-lg"
      style={{
        background: `url(${src})`,
        backgroundSize: 'cover'
      }}
    >
        {/* <div className={`  w-full h-[64px] mb-3 bg-slate-200 overflow-hidden rounded-lg flex justify-center items-center`}>
          { src?  <img src={src} alt="" className=" w-full h-full" /> : <div className=" w-full h-[64px] bg-slate-200 rounded-lg mr-4"/>}
        </div> */}
        <div className=" absolute left-0 top-0 w-full h-full items-center flex flex-col justify-center bg-primary/40">
          <h2 className=" text-md font-bold text-default capitalize text-ellipsis">{ title }</h2>
        </div>
    </Link>
  )
}

export const StoreCard = ({ title, src ,id})=>{
  return(
    // <Link 
    //   to={`/store/${id}`} 
    //   className=" relative w-[150px] h-[150px] p-3 bg-transparent flex flex-col justify-center items-center mr-5 overflow-hidden"
     
    // >
    //   <div className="  w-[100px] h-[100px] rounded-full shadow-card p-3 mb-3 ">
    //     { src?  <img src={src} alt="" className=" w-full h-full" /> : <div className=" w-full h-full bg-slate-200 mr-4"/>}
    //   </div>
    //   <div className=" flex justify-center items-center">
    //     <h2 className=" text-md font-bold text-primary capitalize text-ellipsis">{ title }</h2>
    //   </div>
    // </Link>
    <Link 
      to={`/product/${id}`} 
      className=" w-[239px] h-[90px] shadow-card p-3 bg-white flex justify-between mr-5 rounded-lg  ">
        <div className={`  w-[64px] h-[64px] mr-4 bg-slate-200 overflow-hidden rounded-lg flex justify-center items-center`}>
          { src ?  <img src={src} alt="" className=" w-full h-full" /> : <div className=" w-full h-[64px] bg-slate-200 rounded-lg mr-4"/>}
        </div>
        <div className="flex flex-col justify-center">
          <h2 className=" text-sm font-bold capitalize text-ellipsis">{ title }</h2>
        </div>
    </Link>
  )
}