import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { instance } from '../api/requests';
import { NoProducts } from '../components/Common';
import { ProductCard } from '../components/Cards/Cards';

const CategoryList = () => {
  const { catid } = useParams();
  console.log("category Id",catid)
  const [ products, setProducts] = useState(null)
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };


  useEffect(()=>{
    getProducts()
  },[catid])

  const getProducts = async () => {
    try {
      const response = await instance.post('store/products', {
          token: "",
          id: "",
          store_id: "",
          category_id: catid,
          sub_category_id: "",
          location: "",
          store: "",
          orderBy: "",
          active: "",
          page: "",
          limit: ""
      });

        console.log('products',response);
        setProducts(response.data.data);

    } catch (error) {
      console.log(error)
    }
  }

     const filteredProducts = products?.filter((product) => {
       const productName = product.name?.toLowerCase() || '';
       const category = product.category_name?.toLowerCase() || '';
       const query = searchQuery.toLowerCase();
       return productName.includes(query) || category.includes(query);
     }) || [];
  
  return (
    <div className=" px-5 w-full">
      <div className="my-5 flex justify-center">
        <input
          type="text"
          value={searchQuery}
          className=" w-full py-3 px-4 focus:border outline-none border-solid border focus:border-primary rounded-xl"
          onChange={handleSearchChange}
          placeholder="Search products..."
        />
      </div>
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
  )
}

export default CategoryList