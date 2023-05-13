import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { instance } from '../api/requests';
import { MdLocationOn, MdLocationCity } from 'react-icons/md';
import { ProductCard } from '../components/Cards/Cards';
import { NoProducts } from '../components/Common';

const StoreProductList = () => {
  const [ store, setStores] = useState(null)
  const [ products, setProducts] = useState(null)
  const [searchQuery, setSearchQuery] = useState('');

  const { storeid } = useParams();
  console.log("category Id",storeid)
  
  useEffect(()=>{
    getSingleStore()
  },[])
  
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const getSingleStore = async () => {
    try {
        const response = await instance.post('store/list',{
          token: "",
          store_id: storeid,
          location: "",
          store: "",
          page: "",
          limit: ""
      });

        console.log('store',response.data.data[0]);
        setStores(response.data.data[0]);

    } catch (error) {
      console.log(error)
    }
  }

  const getProducts = async () => {
    try {
      const response = await instance.post('store/products', {
          token: "",
          id: "",
          store_id: storeid,
          category_id: "",
          sub_category_id: "",
          location:"",
          store: "",
          orderBy: "",
          active: "",
          page: "",
          limit: ""
      });

        console.log('category',response);
        setProducts(response.data);

    } catch (error) {
      console.log(error)
    }
  }

  // Apply search filter
  const filteredProducts = products?.filter((product) => {
      const productName = product.name.toLowerCase();
      const category = product.category_name.toLowerCase();
      const query = searchQuery.toLowerCase();
      return productName.includes(query) || category.includes(query);
  });

  return (
    <div className=" px-5 w-full pt-5 h-full">

      <div className=" w-full h-20  flex justify-between pb-3 border-gray-300 border-b border-solid">
        {
          store ? (
            <>
              <div className="bg-slate-200 w-[24%] h-full rounded-xl">
                <img src={store.photo} alt="" className=" w-full h-full" />
              </div>
              <div className=" w-[73%] rounded-xl px-5 flex justify-center items-start flex-col">
                <h2 className=" flex items-center  capitalize text-lg font-bold"><MdLocationCity className=' text-primary mr-2'/>{ store.name}</h2>
                <h2 className=" flex items-center text-sm"><MdLocationOn className='mr-2 text-primary'/>{ store.city}</h2>
              </div> 
            </>
          ):(
            <>
              <div className="bg-slate-200 w-[24%] h-full rounded-xl"></div>
              <div className="bg-slate-200 w-[73%] rounded-xl"></div>
            </>
          )
        }
      </div>
      
      <div className=" w-full">
      {
        filteredProducts?.length === 0 ? (
        <NoProducts/>
      ) : (
        <div className=" grid grid-cols-3 gap-3">
          {
            filteredProducts?.map((product, index) => (
              <ProductCard
                key={index}
                src={product.main_photo} 
                title={product.name} 
                price={`${product.amount} `} 
                id={product.id} 
              />
            ))
          }
        </div>
      )
    }
      </div>

    </div>
  )
}

export default StoreProductList