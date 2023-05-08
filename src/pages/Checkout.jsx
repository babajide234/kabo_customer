import React, {useState} from 'react'
import Buttons from '../components/buttons/Buttons'
import { CardContent } from '../components/Cards/Cards'
import Checkbox from '../components/Forms/Checkbox'
import { Modal } from '../components/Modal/Modal'
import useCartStore from '../store/cartSlice'
import useUserStore from '../store/userSlice'
import { Formik } from 'formik'
import { AuthInputs } from '../components/Inputs'
import { Spinner } from '../components/Spinner'
import { BsPencil } from 'react-icons/bs'


const Checkout = () => {
    const token = useUserStore((state) => state.token)
    const details = useUserStore((state) => state.details)
    const cart = useCartStore((state) => state.cart)
    const loading = useCartStore(state=> state.loading);
    const shipping = useCartStore(state=> state.shipping);
    const shiping_details = useCartStore(state=> state.shiping_details);
    const updateDetails = useUserStore(state=> state.updateDetails);

    const [modal, setModal] = useState(false);
    const [nameModal, setNameModal] = useState(false);
    const [addressModal, setAddressModal] = useState(false)

    const initialValues = {
        details: details.address ? details.address : "",
        info: "",
    }

    console.log("checkout: ", shiping_details)
    
    const closeModal = ()=>{
        setModal(!modal)
    }
    const onSubmit = (values)=>{
        const data = {
            token:token,
            details: values.details,
            info: values.info,
        }
        shipping(data)
    }

    const onNameSubmit = (values)=>{
        const data ={
            token:token,
            lastname: values.lastname,
            othernames:values.othername
        }
        updateDetails('name',data)
    }

    const onAddressSubmit = (values)=>{
        const data ={
            token:token,
            address: values.address,
        }
        updateDetails('address',data)
    }

  return (
    <div className=" min-h-full flex flex-col justify-between px-5 pb-20">
            <h2 className=" font-thin text-4xl mb-10">Delivery</h2>
            <CardContent
                title='Address details'
            >
                <div className="flex justify-between">
                    <h2 className=" font-medium text-xl capitalize">{` ${details.othernames} ${details.lastname}`}</h2>
                    <button className=' w-6 h-6 rounded-full '  onClick={()=>setNameModal(!nameModal)}><BsPencil/></button>
                </div>
               <span className=" w-full block my-3 border-b border-solid "></span>
               <div className="flex justify-between">
                    <p className=" text-sm font-normal">{ details.address  ? details.address : "No Address"}</p>
                    <button className=' w-6 h-6 rounded-full '  onClick={()=>setAddressModal(!addressModal)}><BsPencil/></button>
                </div>
               <span className=" w-full block my-3 border-b border-solid "></span>
               <h3 className=" text-base font-normal">{details.phone}</h3>
            </CardContent>
            <CardContent
                title='Delivery method.'
            >
               <Checkbox label='Door delivery'/>
               <span className=" w-full block my-3 border-b border-solid "></span>
               <Checkbox label='Pick up'/>
            </CardContent>
            <div className="flex justify-between">
                <h3 className=" text-lg font-semibold">Total</h3>
                <h3 className=" text-2xl font-bold">{ cart?.amount.total}</h3>
            </div>
            <div className=" px-8 py-5 w-full">
                <button onClick={()=>setModal(!modal)} className='w-full py-2 flex justify-center items-center text-lg font-bold rounded-full bg-primary text-default'>Shipping Info</button>
            </div>

            <Modal title={'Form'} open={nameModal} close={()=> setNameModal(!nameModal)} >
                <Formik initialValues={{lastname:"",othername:""}} onSubmit={onNameSubmit}>
                    {(props)=>(
                        <form onSubmit={props.handleSubmit}>
                            <AuthInputs name="lastname" placeholder={'LastName'} value={props.values.lastname} onChange={props.handleChange} />
                            <AuthInputs name="othername" placeholder={'Othername'} value={props.values.othername} onChange={props.handleChange} />
                            
                            <button  
                                type='submit' 
                                className='w-full py-4 flex justify-center items-center text-lg font-bold rounded-full bg-primary text-default'

                            >{false ? <Spinner/> : "Update"}</button>
                        </form>
                    )}                                                                                                                  
                </Formik>
            </Modal>

            <Modal title={details.address ? "Payment ":'Shipping Form'} open={modal} close={closeModal} >
                {
                    !shiping_details ? (
                        <Formik initialValues={initialValues} onSubmit={onSubmit}>
                            {(props)=>(
                                <form onSubmit={props.handleSubmit}>
                                    <AuthInputs name="details" placeholder={'Shipping Address'} value={props.values.details} onChange={props.handleChange} />
                                    <AuthInputs name="info" placeholder={'Additional Info'} value={props.values.info} onChange={props.handleChange} />
                                    <button  
                                        type='submit' 
                                        className='w-full py-4 flex justify-center items-center text-lg font-bold rounded-full bg-primary text-default'

                                    >{loading ? <Spinner/> : "Proceed"}</button>
                                </form>
                            )}                                                                                                                  
                        </Formik>
                    ): (
                        <>
                            <Buttons  to="/payment" type={'primary'}>Proceed to payment</Buttons>
                        </>
                    )
                }
            </Modal>

            <Modal title={'Form'} open={addressModal} close={()=>setAddressModal(!addressModal)} >
                <Formik initialValues={{address:""}} onSubmit={onAddressSubmit}>
                    {(props)=>(
                        <form onSubmit={props.handleSubmit}>
                            
                            <AuthInputs name="address" placeholder={'Address'} value={props.values.address} onChange={props.handleChange} />

                            <button  
                                type='submit' 
                                className='w-full py-4 flex justify-center items-center text-lg font-bold rounded-full bg-primary text-default'

                            >{false ? <Spinner/> : "Update"}</button>
                        </form>
                    )}                                                                                                                  
                </Formik>
            </Modal>
    </div>
  )
}

export default Checkout