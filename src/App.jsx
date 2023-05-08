import React, { useState, useEffect,useRef  } from 'react'
import './App.css'
import 'react-alice-carousel/lib/alice-carousel.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import router from './routes';
import useCartStore from './store/cartSlice';
import useUserStore from './store/cartSlice';

import LoadingBar from 'react-top-loading-bar'
import useLoaderStore from './store/loaderSlice';

function App() {
  const { isLoading } = useLoaderStore();
  const loadingBar = useRef(null);

  // useEffect(() => {
  //   // listen for changes to the isLoading value and update the loading bar accordingly
  //   if (isLoading) {
  //     loadingBar.current.continuousStart();
  //   } else {
  //     loadingBar.current.complete();
  //   }
  // }, [isLoading]);

  return (
    <>
      <LoadingBar
        progress={isLoading ? 30 : 100}
        height={10}
        color='#0d0a63'
      />
      <RouterProvider router={router}/>
    </>
  )
}

export default App
