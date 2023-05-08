import React, { useState,useEffect } from 'react'
import Buttons from '../components/buttons/Buttons'
import { CardContent } from '../components/Cards/Cards'
import { UnauthContainer } from '../components/UnauthContainer'
import useUserStore from '../store/userSlice'

import { CgClose } from 'react-icons/cg';
import { Formik } from 'formik'
import { AuthInputs } from '../components/Inputs'
import { Modal } from '../components/Modal/Modal'
import { Spinner } from '../components/Spinner'

import { BsArrowBarRight, BsCaretRight, BsPencil, BsTrash } from 'react-icons/bs'
import { MdArrowForwardIos } from 'react-icons/md'

import Alert from '../components/Alert'
import AnimatedCheck from '../components/AnimationCheck'
import { uploadFile } from '../utils/functions'
import { upload } from '../api/requests'
import useCartStore from '../store/cartSlice'
import useLoaderStore from '../store/loaderSlice'

const UserProfile = () => {
    const [modal, setModal] = useState(false)
    const [phoneModal, setPhoneModal] = useState(false)
    const [addressModal, setAddressModal] = useState(false)

    const [alert, setAlert] = useState(false)
    const [order, setOrder] = useState(false)

    const [currentFile, setCurrentFile] = useState(null);
    const [uploadStatus,setUploadStatus] = useState(false)
    const [fileUrl,setFileUrl] = useState(null)

    const details = useUserStore(state=> state.details);
    const token = useUserStore(state=> state.token);
    const loading = useUserStore(state=> state.loading);
    const profileUpload = useUserStore(state=> state.profileUpload);
    const updateDetails = useUserStore(state=> state.updateDetails);
    const getorders = useCartStore(state=> state.getorders);
    const orders = useCartStore(state=> state.orders);
    const setIsLoading = useLoaderStore(state=> state.setIsLoading);

    const phoneValues = {
            phone: ""
    }

    useEffect(()=>{
        const data = {
            token: token,
            reference_code: "",
            account: "customer", 
            from: "",
            to: "",
            payment_status: "", 
            order_status: "" 
        }
        getorders(data)
    },[getorders])

    useEffect(()=>{
        const data = {
            token: token,
            file_url:fileUrl
        }

        profileUpload(data)
    },[uploadStatus])
    


    const handleFileSelect = (event) => {
        setCurrentFile(event.target.files[0]);
        handleUpload()
    };

    const onPhoneSubmit = (values)=>{
        const data ={
            token:token,
            phone: values.phone,
        }
        updateDetails('phone',  data)
    }
    const onAddressSubmit = (values)=>{
        const data ={
            token:token,
            address: values.address,
        }
        updateDetails('address',data)
    }
    const onNameSubmit = (values)=>{
        const data ={
            token:token,
            lastname: values.lastname,
            othernames:values.othername
        }
        updateDetails('name',data)
    }

    const closeModal = ()=>{
        setModal(!modal)
    }
    const closeAlert = ()=>{
        setAlert(!alert)
    }

    const handleUpload = async () => {
        setIsLoading(true)
        const response = await upload(token, currentFile);
        console.log(response);
        if(response.data.status == "success"){
            setFileUrl(response.data.file_url)
            setIsLoading(false)
            setUploadStatus(true);
        }else{
            setIsLoading(false)
        }

    };


    const handleUpdate = (event)=>{
        console.log(event)
    }

  return (
    <UnauthContainer>
        <div className=" flex flex-col px-[20px] py-10 min-h-screen">
            <h2 className=" font-thin text-4xl mb-10">My profile</h2>

            <CardContent
                title='Personal details'
            >
                <div className=" w-full flex flex-col justify-center items-center">
                    
                    <label htmlFor='profile-pic' className=' relative flex justify-center flex-col items-center mb-5'>
                        <img src={details.photo ? details.photo : '' } alt="profile picture" className=" w-[91px] h-[100px] rounded-full mb-3" />
                        <input type="file" name='profile-pic'  onChange={handleFileSelect} id='profile-pic' accept="image/*" className='hidden' />
                        <span className=' w-10 h-10 absolute bg-primary rounded-full text-white flex justify-center items-center bottom-2 right-0'><BsPencil/></span> 
                    </label>

                    <div className=" w-full">
                        <h2 className=" font-bold text-xl">{ details.username}</h2>

                        <div className="flex justify-between">
                            <h2 className=" font-bold text-xl">{` ${details.othernames} ${details.lastname}`}</h2>
                            <button className=' w-6 h-6 rounded-full '  onClick={()=>setModal(!modal)}><BsPencil/></button>
                        </div>
                        <h3 className="text-base">{ details.email  ? details.email : "empty Email"}</h3>
                        <span className=" w-full block my-3 border-b border-solid "></span>
                        <div className="flex justify-between">
                            <h3 className=" text-base font-normal">{ details?.phone }</h3>
                            <button className=' w-6 h-6 rounded-full '  onClick={()=>setPhoneModal(!phoneModal)}><BsPencil/></button>
                        </div>
                        <span className=" w-full block my-3 border-b border-solid "></span>
                        <div className="flex justify-between">
                            <p className=" text-sm font-normal">{ details.address  ? details.address : "No Address"}</p>
                            <button className=' w-6 h-6 rounded-full '  onClick={()=>setAddressModal(!addressModal)}><BsPencil/></button>
                        </div>
                    </div>
                </div>
            </CardContent>

            <CardContent title="">
                <div className="flex justify-between items-center" onClick={()=>setOrder(!order)}>
                    <h2 className="text-gray-800 text-2xl font-bold">Orders</h2>
                    <span className='text-gray-800  font-bold w-6 h-6 flex justify-center items-center'><MdArrowForwardIos/></span>
                </div>
                <div className={`  text-center ${order ? ' h-fit py-5' : 'h-0 overflow-hidden'}`}>
                    {
                        orders == null ? (
                            <h3 className="">No Orders</h3>
                        ):(
                            orders.map((order)=>(
                                <div className=" text-left border border-solid border-gray-200 rounded-lg overflow-hidden px-4 py-5">
                                    <div className="flex ">
                                        <h2 className=" font-bold mr-4">Ref: </h2>
                                        <span className=" whitespace-pre">{order.reference_code}</span>
                                    </div>
                                    <div className="flex ">
                                        <h2 className=" font-bold mr-4">Order Status: </h2>
                                        <span className="">{order.order_status}</span>
                                    </div>
                                    <div className="flex ">
                                        <h2 className=" font-bold mr-4">Payment Status: </h2>
                                        <span className=""> {order.payment_status}</span>
                                    </div>
                                    <div className="flex ">
                                        <h2 className=" font-bold mr-4">Value: </h2>
                                        <span className="">&#x20A6; {order.amount.total}</span>
                                    </div>
                                    <div className="flex mt-5 ">
                                        <button className=' capitalize bg-primary text-white rounded-md px-5 py-2'>pay</button>
                                    </div>
                                    <h2 className=" font-bold mr-4"></h2>
                                </div>
                            ))
                        )
                    }
                </div>
            </CardContent>

            <CardContent title="">
                <div className="flex justify-between">
                    <h2 className="text-primary font-bold">Delete Account</h2>
                    <span className='text-primary font-bold'><BsTrash/></span>
                </div>
            </CardContent>

            <Modal title={'Form'} open={phoneModal} close={()=>setPhoneModal(!phoneModal)} >
                <Formik initialValues={phoneValues} onSubmit={onPhoneSubmit}>
                    {(props)=>(
                        <form onSubmit={props.handleSubmit}>
                            
                            <AuthInputs name="phone" placeholder={'Phone'} value={props.values.phone} onChange={props.handleChange} />

                            <button  
                                type='submit' 
                                className='w-full py-4 flex justify-center items-center text-lg font-bold rounded-full bg-primary text-default'

                            >{false ? <Spinner/> : "Update"}</button>
                        </form>
                    )}                                                                                                                  
                </Formik>
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

            <Modal title={'Form'} open={modal} close={closeModal} >
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
            <Alert open={alert} close={closeAlert}>
                <AnimatedCheck success={uploadStatus} loading={loading}/>
            </Alert>
        </div>
    </UnauthContainer>
  )
}

export default UserProfile