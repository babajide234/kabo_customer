import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Buttons from '../buttons/Buttons'
import { AuthInputs } from '../Inputs'
import { Formik, ErrorMessage  } from 'formik'
import * as Yup from 'yup';
import { Spinner } from '../Spinner'
import useUserStore from '../../store/userSlice'

const LoginForm = () => {

  const login = useUserStore(state=> state.login);
  const isLoggedIn = useUserStore(state=> state.isLoggeIn);
  const Loading = useUserStore(state=> state.loading);
  const navigate = useNavigate();

  const initialValues = {
    email: '',
    password: '',
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
  });

  const onSubmit = (values, { setSubmitting }) => {

    const data = {
      email: values.email,
      passcode: values.password
    }

    login(data)
    setSubmitting(false);

  };

  return (
    <div className=" flex flex-col h-full justify-between">
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
        {({ isSubmitting, values, handleSubmit,handleChange }) => (
          <form onSubmit={handleSubmit}>
            <div className=" mb-10">
              <AuthInputs value={values.email} name="email"  onChange={handleChange} placeholder={'Email address'} type={'email'} />
              
              <AuthInputs value={values.password} name="password"  onChange={handleChange} placeholder={'Password'} type={'Password'} />
              
              <Link to="/" className=' text-primary text-lg font-medium'>Forgot password?</Link>
            </div>
            {
              isLoggedIn ? (
                <Link to='/shop' className='w-full py-2 flex justify-center items-center text-lg font-bold rounded-full bg-primary text-default'> Back to Shop</Link>
              ) : (
                <button 
                  type="submit"
                  className="w-full py-2 flex justify-center items-center text-lg font-bold rounded-full bg-primary text-default"
                >
                  Login
                </button>
              )
            }
          </form>
        )}
      </Formik>
    </div>
  )
}

export default LoginForm