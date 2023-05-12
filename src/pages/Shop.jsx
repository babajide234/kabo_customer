import React, { useState, useEffect} from 'react'
import { motion } from 'framer-motion'
import { ProductCard, RecommendProductCard, SearchProductCards } from '../components/Cards/Cards'
import { Tab, TabPanel } from '../components/Tab/Tab'
import { Modal } from '../components/Modal/Modal'
import searchStore from '../store/searchSlice'
import { Link } from 'react-router-dom'
import Banner1 from '../assets/Card.png'
import useGeolocation from 'react-hook-geolocation'
import { instance } from '../api/requests'
import Skeleton from '@yisheng90/react-loading';
import {  MdLocationPin } from 'react-icons/md'

const Shop = () => {

    const [ location, setLocation] = useState('')
    const [ storeNearMe, setStoreNearMe] = useState(null)
    const [ categories, setCategories] = useState(null)
    const [ products, setProducts] = useState(null)
    const [ recomended, setRecomended] = useState(null)

    // const products = useProductStore(state => state.products)
    const searchModal = searchStore(state => state.searchModal)
    const changeSearchModal = searchStore(state => state.changeSearchModal)
    const searchResult = searchStore(state => state.searchResult)
    
    const geolocation = useGeolocation({
      enableHighAccuracy: false,
      maximumAge: 15000,
      timeout: 10000,
    });

    useEffect(() => {
      updateLocation()
    }, [])

    useEffect(() => {
      getProducts()
      getCategory()
      getRecommended()
    }, [storeNearMe])

    const updateLocation = async () => {
      try {
          const response =  instance.post('misc/choose-location', {
              token: "",
              lat: 6.595587,
              long: 3.3451767,
              address: ""
          });
          response.then(res => {
                console.log(res.data)
                setStoreNearMe(res.data)
          })
      } catch (error) {
        console.log(error)
      }
    }

    const getCategory = async () => {
      try {
          const response = await instance.post('store/category',{
              token: "",
              category_id: ""
          });

          console.log('category',response);
          setCategories(response.data)

          // response.then(res => {
          // })
      } catch (error) {
        console.log(error)
      }
    }
  
    const getProducts = async () => {
      try {
        const response = await instance.post('store/products', {
            token: "",
            id: "",
            store_id: "",
            category_id: "",
            sub_category_id: "",
            location: storeNearMe ? storeNearMe.data : "",
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

    const getRecommended = async () => {
      try {
          const response = await instance.post('store/top-sales',{
            token: "",
            store_id: "",
            category_id: "",
            sub_category_id: "",
            active: ""
          });

          console.log('recommend',response);
          setRecomended(response.data);

      } catch (error) {
        console.log(error)
      }
    }

    const filterProductsByCategory = (categoryName) => {
        if (!products?.data) {
          return <div>Loading...</div>;
        }
      
        const filtered = products.data.filter((product) => product.category_name === categoryName);
      
        
        if (filtered.length > 0) {
          return filtered.map((product) => (
            <ProductCard src={product.main_photo} title={product.name} price={`${product.amount} `} id={product.id} />
          ));
        } else {
          return (
            <div className="w-full h-32 flex justify-center items-center mx-auto">
              <h2 className="">No Products In this Category</h2>
            </div>
          );
        }
    };
      
    const handleModalClose = ()=>{
      changeSearchModal(!searchModal);
    }

  return (
   <>
        <motion.div 
          className="min:h-full w-full pb-32"
        >
              <div className=" flex justify-center px-5 mb-5">
              {
                storeNearMe ?  <div className=" flex items-center justify-between text-2xl capitalize font-bold"> <MdLocationPin className=' text-primary mr-3'/>{ storeNearMe.data } </div> : <Skeleton width={100} height={30}/>
              } 
              </div>
              <div className=" px-5">
                {/* <h1 className=" text-xl leading-10 font-bold mb-5">What do you want to eat today?</h1> */}
              </div>
              <div className="flex px-5 mx-auto overflow-x-auto scrollbar-hide">
                <div className="flex">
                  <div className=" w-[280px] h-[120px] bg-slate-200 rounded-lg mr-4">
                    <img src={Banner1} alt="" className=" w-full h-full " />
                  </div>
                  <div className=" w-[280px] h-[120px] bg-slate-200 rounded-lg mr-4">
                    <img src={Banner1} alt="" className=" w-full h-full " />
                  </div>
                </div>
              </div>
              <Tab>
                    {
                        categories ? (
                            categories.data.map((item, index) => (
                                <TabPanel title={item.category_name} key={index}>
                                    { filterProductsByCategory(item.category_name) }
                                </TabPanel>
                            ))
                          
                        ): (
                          <div className=' flex flex-col w-full px-5'>
                            
                            <div className=" w-full mb-5">
                              <Skeleton height={40}/>
                            </div>
                            <div className="w-full flex">
                              <div className=" mr-5">
                                <Skeleton height={160} width={120}/>
                              </div>
                              <div className=" mr-5">
                                <Skeleton height={160} width={120}/>
                              </div>
                              <div className=" mr-5">
                                <Skeleton height={160} width={120}/>
                              </div>
                            </div>
                          </div>
                        )
                    }
              </Tab>
                  {
                    recomended ? (
                      <div className=' flex flex-col w-full px-5'>
                          <div className=" w-full mb-5">
                            <Skeleton height={40}/>
                          </div>
                          <div className="w-full flex">
                            <div className=" mr-5">
                              <Skeleton height={100} width={160}/>
                            </div>
                            <div className=" mr-5">
                              <Skeleton height={100} width={160}/>
                            </div>
                          </div>
                      </div>
                    ) : (
                      <>
                        <div className="flex justify-between mt-10 px-5">
                          <h2 className=" text-base font-bold">Recomendation</h2>
                          <Link className=' text-primary text-sm font-semibold'>Show All</Link>
                        </div>
                        <div className="flex px-5 mx-auto overflow-x-auto scrollbar-hide mt-5">
                          <div className="flex">
                              {
                                recomended?.data.map((item, index) => (
                                  <RecommendProductCard key={index} id={item.id} src={item.main_photo} title={item.name} category={item.category_name} price={item.amount} />
                                ))
                              }
                          </div>
                        </div>
                      </>
                    )
                  }
        </motion.div>

        <Modal title="Search Result" open={searchModal} close={handleModalClose}>
          <div className=" w-full grid grid-cols-2 pt-10 gap-y-16">
                {
                  searchResult && searchResult.map((product)=>(
                    <SearchProductCards src={product.main_photo} title={product.name} price={`N ${product.amount} `} id={product.id} />
                  ))
                }
          </div>
        </Modal>

        <Modal title="Select Location" open={location} close={()=> setLocation(!location)}>
          <div className=" w-full grid grid-cols-2 pt-10 gap-y-16">
                
          </div>
        </Modal>
   </>
  )
}

export default Shop