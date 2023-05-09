import React from 'react'
import { CartCards } from '../components/Cards/Cards'
import Buttons from '../components/buttons/Buttons';
import useCartStore from '../store/cartSlice';
import EmptyPage from '../components/EmptyPage';
import Icon from '../assets/ector.svg'

const CartPage = () => {
    const cart = useCartStore(state=> state.cart);
  
  return (
    <div className=" min-h-full flex flex-col justify-between">
        <div className="">

        {
            cart?.product && cart.product.map((item)=>(
                <CartCards
                    key={item.id}
                    item={item}
                />
                ))
            }
        {
            !cart?.product && (
                
                <EmptyPage
                image={Icon}
                title={'No Cart yet'}
                subtitle={'Hit the orange button down below to Create an order'}
                />
                )
            }
        </div>
        <div className=" px-8 py-5 w-full">
            <Buttons
                type={'primary'}
                to={'/checkout'}
            > Complete Order</Buttons>
        </div>
    </div>
  )
}

export default CartPage