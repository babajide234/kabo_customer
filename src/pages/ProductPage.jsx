import React, {useEffect} from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import useCartStore from '../store/cartSlice';
import useProductStore from '../store/productSlice';
import useUserStore from '../store/userSlice'

const ProductPage = () => {

    const token = useUserStore(state=> state.token);
    const isLoggedIn = useUserStore(state=> state.isLoggedIn);
    const loading = useCartStore(state=> state.loading);

    const addToCart = useCartStore(state=> state.addToCart);
    const getProductsDetails = useProductStore(state=> state.getProductsDetails);
    const product = useProductStore(state=> state.product);

    let { productId } = useParams()
    let navigate = useNavigate()
    
    
    useEffect(() => {
        console.log("productId", productId)
        const data ={
            token: token,
            id: productId,
            store_id: "",
            category_id: "",
            sub_category_id: "",
            location: "",
            store: "",
            orderBy: "", 
            active: ""
        }
    
        getProductsDetails(data)

    }, [productId,getProductsDetails])

    
//   const { data, isLoading } = useQuery([ "cart", cart ], async () => {
//     const response = await getProductsDetails(cartId);
//     return response.data
//   },{
//     enabled: true,
//     staleTime: 1000, 
//     refetchOnWindowFocus: true,
//   });


    console.log("product: ",loading)

    const handleAddToCart = (id)=>{

        if(isLoggedIn){

            const data ={
                token:token,
                id: productId,
                details: "",
                quantity: 1
            };
    
            addToCart(data)
        } else {
            navigate('/login')
        }
    }

  return (
    <>
        {
            product != null ? (
                <div className=" flex flex-col px-10 mb-20 pb-40">
                    <div className=" flex justify-center items-center mb-10">
                        <img src={product[0].main_photo} alt="" className=' w-[200px] h-[200px] rounded-full shadow-card' />
                    </div>
                    <div className="  mb-11 text-center">
                        <h2 className=" text-[28px] font-thin leading-9">{product[0].name}</h2>
                        <h3 className=" tex-[22px] font-bold text-primary">N {product[0].amount}</h3>
                    </div>
            
                    <div className=" mb-5">
                        <h2 className=" text-[17px] font-thin mb-[6px]">Details</h2>
                        <p className=" text-[15px] font-normal leading-normal">{product[0].details}</p>
                    </div>
            
                    <div className="">
                        <h2 className=" text-[17px] font-thin mb-[6px]">Return policy</h2>
                        <p className="text-[15px] font-normal leading-normal">All our foods are double checked before leaving our stores so by any case you found a broken food please contact our hotline immediately.</p>
                    </div>
                    <div className=" px-8 py-5 mt-20 w-full">
                        <button  
                            onClick={handleAddToCart}
                            className={`w-full py-4 flex justify-center items-center text-lg font-bold rounded-full ${ loading ? 'bg-primary/50':'bg-primary'} text-default`}
                        >Add to Cart</button>
                    </div>
                </div>
            ):(<></>)
        }
    </>
    
  )
}

export default ProductPage