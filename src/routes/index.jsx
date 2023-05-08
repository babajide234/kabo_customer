import { Children } from "react";
import {
    createBrowserRouter,
  } from "react-router-dom";
import AuthLayout from "../layout/AuthLayout";
import MainLayout from "../layout/MainLayout";
import SideLAyout from "../layout/SideLAyout";
import CartPage from "../pages/CartPage";
import Checkout from "../pages/Checkout";
import { Favourite } from "../pages/Favourite";
import History from "../pages/History";
// import App from "../App";
import Landing from "../pages/Landing";
import Login from "../pages/Login";
import Paymentpage from "../pages/Paymentpage";
import ProductPage from "../pages/ProductPage";
import Register from "../pages/register";
import SearchResult from "../pages/SearchResult";
import Shop from "../pages/Shop";
import UserProfile from "../pages/UserProfile";



const router = createBrowserRouter([
    {
      path: "/",
      element: <Landing/>
    },
    {
      path:'/',
      element: <AuthLayout/>,
      children:[
        {
          path: 'login',
          element: <Login/>
        },
        {
          path: 'register',
          element: <Register/>
        }, 
      ]
    },
    {
      path:'/',
      element: <MainLayout/>,
      children: [
        {
          path:'/shop',
          element:<Shop/>
        }
      ]
    },
    {
      path:'/',
      element: <SideLAyout/>,
      children: [
        {
          path:'/history',
          element:<History/>
        },
        {
          path:'/saved',
          element:<Favourite/>
        },
        {
          path:'/cart',
          element:<CartPage/>
        },
        {
          path:'/checkout',
          element:<Checkout/>
        },
        {
          path:'/payment',
          element:<Paymentpage/>
        },
        {
          path:'/product/:productId',
          element: <ProductPage/>
        },
        {
          path:'/profile',
          element: <UserProfile/>
        },
        {
          path:'/search',
          element: <SearchResult/>
        }
      ]
    },
]);

export default router;