import React, { useEffect, useState } from 'react'
import Buttons from '../buttons/Buttons'
import { AuthInputs } from '../Inputs'
import { Formik, ErrorMessage  } from 'formik'
import useUserStore from '../../store/userSlice'
import { AnimatePresence, motion } from 'framer-motion'

import { BsPersonCheck } from 'react-icons/bs';
import { Link } from 'react-router-dom'
import { Spinner } from '../Spinner'
import Alert from '../Alert'
import AnimatedCheck from '../AnimationCheck'

const RegisterForm = () => {
  const Loading = useUserStore(state=> state.loading);
  const register = useUserStore(state=> state.register);
  const status = useUserStore(state=> state.registerStatus);
  const [alert, setAlert] = useState(false)

  const initialValues = {
    username: "",
    email: "",
    phone: "",
    passcode: "",
    referral_code: ""
  };

  useEffect(()=>{
    setAlert(status)
  },[status])

  const onSubmit = (values, { setSubmitting }) => {

    const data = {
      username: values.username,
      email: values.email,
      passcode: values.passcode,
      phone: values.phone,
      referral_code: values.referral_code
    }

    register(data)
    setSubmitting(false);

  };

  
  const closeAlert = ()=>{
    setAlert(!alert)
  }

  return (
    <AnimatePresence>
      <div className=" flex flex-col h-full justify-between">
            <Formik initialValues={initialValues}  onSubmit={onSubmit}>
              {({ isSubmitting, values, handleSubmit,handleChange }) => (
                <form onSubmit={handleSubmit}>
                    <div className="">
                        <AuthInputs value={values.username} name='username' onChange={handleChange} placeholder={'Username'} type={'text'}/>
                        <AuthInputs value={values.email} name='email' onChange={handleChange} placeholder={'Email'} type={'email'}/>
                        <AuthInputs value={values.phone} name='phone' onChange={handleChange} placeholder={'Phone'} type={'text'}/>
                        <AuthInputs value={values.passcode} name='passcode' onChange={handleChange} placeholder={'Password'} type={'password'}/>
                        <AuthInputs value={values.referral_code} name='referral_code' onChange={handleChange} placeholder={'Refferal Code'} type={'text'}/>
                    </div>
                    <button 
                      type="submit"
                      className="w-full py-4 flex justify-center items-center text-lg font-bold rounded-full bg-primary text-default"
                      >Register
                    </button>
                </form>
              )}
            </Formik>
          
            <Alert open={alert} close={closeAlert}>
                    <div className=" text-center">
                      <AnimatedCheck success={true} loading={false}/>

                      <h2 className=" font-bold text-xl mb-5 mt-5">Regisration Successfull</h2>
                      <p className=" mb-10 text-gray-500">Thank you for registring on our platform please Login too Continue</p>
                      <Buttons to='/login' type='primary'>Login</Buttons>
                    </div>
            </Alert>
      </div>
    </AnimatePresence>
  )
}

export default RegisterForm