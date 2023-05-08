import React,{useState,useEffect} from 'react'
import { useFlutterwave } from 'flutterwave-react-v3';
import useUserStore from '../store/userSlice';
import useCartStore from '../store/cartSlice';
import { CardContent } from '../components/Cards/Cards';
import Alert from '../components/Alert';
import Buttons from '../components/buttons/Buttons';
import AnimatedCheck from '../components/AnimationCheck';

const Paymentpage = () => {
  const token = useUserStore((state) => state.token)
  const details = useUserStore((state) => state.details)
  const cart = useCartStore((state) => state.cart)
  const order = useCartStore((state) => state.order)
  const checkout = useCartStore((state) => state.checkout)

  const { open , setOpen } = useState(true);
  const [alert, setAlert] = useState(false)

  const { paymentType , setPaymentType } = useState(true);

  const config = {
    public_key: 'FLWPUBK_TEST-e6a2fdc7c99903def336ab7d047ad6f7-X',
    tx_ref: checkout,
    amount: cart.amount.total,
    currency: 'NGN',
    payment_options: 'card,mobilemoney,ussd',
    customer: {
      email: details.email,
      phone_number:details.phone,
      name: details.othernames+" "+details.lastname,
    },
    customizations: {
      title: 'Payment',
      description: 'Payment for items in cart',
      logo: 'https://st2.depositphotos.com/4403291/7418/v/450/depositphotos_74189661-stock-illustration-online-shop-log.jpg',
    },
  };

  const handleFlutterPayment = useFlutterwave(config);

  const handleCheckout= ()=>{
    const data = {
      token
    };
    order(data);
  }

  const handlePay = ()=>{

  }

  useEffect(() => {
    if(checkout != null){

      handleFlutterPayment({
        callback: (response) => {
          console.log(response);
          handleCheckout()
          setAlert(!alert);
          closePaymentModal() 
        },
        onClose: () => {
          handleCheckout()
        },
      });
    }
  }, [checkout])

  const closeAlert = ()=>{
    setAlert(!alert)
  }

  return (
    <div className=" flex flex-col px-5  pb-40">
        <h2 className=" font-thin text-4xl mb-10">Payment</h2>
        <CardContent title={'Shiping Adress'}>
          <div className=" flex flex-col ">
            <h2 className=" font-bold text-xl">Home</h2>
            <p className="  font-medium text-lg text-gray-500 mt-3">{details.address}</p>
          </div>
        </CardContent>

        <h2 className=" mb-5 text-xl font-thin">Payment Method</h2>
        <div className=" mb-10">
          <div className="flex items-center mb-4 cursor-pointer shadow-lg px-5 rounded-lg bg-white">
            <label htmlFor="payment-option-1" className="flex w-full justify-between items-center cursor-pointer">
              <img src="https://flutterwave.market/_nuxt/img/logo-colored.0d02b19.svg" alt="Flutterwave" className="w-16 h-16 rounded-md mr-4"/>
              <span className="text-lg font-medium">Card</span>
              <input type="radio" value={paymentType} onChange={(e) => setPaymentType(e.target.value)} id="payment-option-1" name="payment-option-1" className=" w-5 h-5"/>
            </label>
          </div>
        </div>


        <div className="flex justify-between">
          <h2 className=" text-sm font-semibold text-gray-600 ">Sub Total</h2>
          <span className=""> &#x20A6; {cart?.amount.product}</span>
        </div>
        <div className="flex justify-between">
          <h2 className=" text-sm font-semibold text-gray-600 ">Delivery fee</h2>
          <span className=""> &#x20A6; {cart?.amount.shipping}</span>
        </div>
        <div className="flex justify-between">
          <h2 className=" text-lg font-bold text-primary">Total</h2>
          <span className="text-lg font-bold text-primary"> &#x20A6; {cart?.amount.total}</span>
        </div>

        <div className=" px-8 py-5 left-0 w-full mt-10">
            <button 
              onClick={() => {
                handleCheckout()
              }} 
              disabled={paymentType}
              className='w-full py-4 flex justify-center items-center text-lg font-bold rounded-full bg-primary text-default'
              >Pay Now</button>
        </div>

        <div 
         className={`fixed w-full h-screen top-0 left-0 z-50 bg-gray-900/30 ${ open ? 'flex':'hidden'} justify-center items-center`}>
          <div className=" w-5/6 bg-default h-3/6"></div>
        </div>
        <Alert open={alert} close={closeAlert}>
              <div className=" text-center">
                <AnimatedCheck success={true} loading={false}/>

                <h2 className=" font-bold text-xl mb-5 mt-5">Thanks for Order</h2>
                <p className=" mb-10 text-gray-500">Your paymet has been confirmed, you can
                  check the details for order.</p>
                <Buttons to='/shop' type='primary'>Back to Home</Buttons>
              </div>
        </Alert>
    </div>
  )
}

export default Paymentpage