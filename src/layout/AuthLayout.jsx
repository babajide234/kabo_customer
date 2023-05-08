import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import Container from '../components/Container'
import Logo from '../assets/logo.jpeg'
import { BiCaretLeft } from 'react-icons/bi'
import { FaRegCaretSquareLeft } from 'react-icons/fa'

const AuthLayout = () => {
  return (
    <Container>
        <div className=" w-full h-1/2 bg-primary bg-cover bg-no-repeat bg-center rounded-bl-[30px] rounded-br-[30px] px-10 py-5 flex flex-col justify-end">
            <Link to='/shop' className=' text-white text-3xl' ><FaRegCaretSquareLeft/></Link>
            <div className=" w-full h-full flex justify-center items-center py-12">
              <img src={Logo} alt="Kabo logo" className=" w-[140px] rounded-full" />
            </div>
            <ul className="flex justify-between w-11/12 mx-auto">
                <li className=""><Link to='/login' className=' capitalize text-default font-semibold text-xl'>login</Link></li>
                <li className=""><Link to='/register' className=' capitalize text-default font-semibold text-xl'>Register</Link></li>
            </ul>
        </div>
        <div className=" px-11 py-10 h-full flex flex-col bg-default">
            <Outlet/>
        </div>
    </Container>
  )
}

export default AuthLayout