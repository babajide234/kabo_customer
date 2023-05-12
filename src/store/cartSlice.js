import { create } from "zustand";

import { persist, createJSONStorage } from 'zustand/middleware'
import { postrequest } from '../api/requests';
import useLoaderStore from './loaderSlice';
import useUserStore from "./userSlice";

const useCartStore = create( 
    (set,get) =>({
        cart:null,
        loading: false,
        shiping_details: false,
        checkout:null,
        report:null,
        orders:null,
        addToCart:(data) => {
            useLoaderStore.setState({ isLoading: true });

            postrequest('order/add', data).then( res => {
                console.log(res);
                if( res.data.status == 'success'){
                    set(state => ({ ...state, loading: false }))
                }
                set(state => ({ ...state, loading: false }))
            })
            .catch((err) => {
                console.error(err);
            })
            .finally(() => {
                get().refetchCart()
                useLoaderStore.setState({ isLoading: false });
            });
        },
        updateCart:(data) => {
            useLoaderStore.setState({ isLoading: true });

            postrequest('order/update', data).then( res => {
               
            })
            .catch((err) => {
                console.error(err);
            })
            .finally(() => {
                get().refetchCart()
                useLoaderStore.setState({ isLoading: false });
            });
        },
        getCart:(data) => {
            
            postrequest('order/cart', data).then( res => {
                console.log(res);
                if( res.data.status == 'success'){
                    set(state => ({ ...state, cart: res.data.data }))
                }
            })
        },
        remove:(data) => {
            useLoaderStore.setState({ isLoading: true });

            postrequest('order/remove', data).then( res => {
                console.log(res);
                if( res.data.status == 'success'){
                    set(state => ({ ...state, cart: res.data.data }))
                     
                }
            })
            .catch((err) => {
                console.error(err);
            })
            .finally(() => {
                get().refetchCart()
                useLoaderStore.setState({ isLoading: false });
            });
        },
        shipping:(data) =>{
            useLoaderStore.setState({ isLoading: true });

            postrequest('order/shipping', data).then( res => {
                console.log(res);
                if( res.data.status == 'success'){
                    set(state => ({ ...state, shiping_details: true }))
                    
                }
            })
            .catch((err) => {
                console.error(err);
            })
            .finally(() => {
                useLoaderStore.setState({ isLoading: false });
            });
        },
        order:(data) =>{
            useLoaderStore.setState({ isLoading: true });

            postrequest('order/checkout', data).then( res => {
                console.log(res);
                if( res.data.status == 'success'){
                    set(state => ({ ...state, checkout: res.data.reference_code }))
                    set(state => ({ ...state, cart: null }))
                    set(state => ({ ...state, shiping_details: false }))
                }
            })
            .catch((err) => {
                console.error(err);
            })
            .finally(() => {
                useLoaderStore.setState({ isLoading: false });
            });
        },
        orderReport:(data) =>{
            set(state => ({ ...state, loading: true }))

            postrequest('order/report', data).then( res => {
                console.log(res);
                if( res.data.status == 'success'){
                    set(state => ({ ...state, report : res.data.data }))

                }
                set(state => ({ ...state, loading: false }))
            })
        },
        removeCart:(data)=>{
            useLoaderStore.setState({ isLoading: true });

            postrequest('order/remove', data).then( res => {
                console.log(res);
                if( res.data.status == 'success'){
                    set(state => ({ ...state, report : res.data.data }))

                }
                set(state => ({ ...state, loading: false }))
            })
            .catch((err) => {
                console.error(err);
            })
            .finally(() => {
                get().refetchCart()
                useLoaderStore.setState({ isLoading: false });
            });
        },
        getorders:(data)=>{

            postrequest('order/details', data).then( res => {
                console.log(res);
                if( res.data.status == 'success'){
                    set(state => ({ ...state, orders : res.data.data }))

                }
                set(state => ({ ...state, loading: false }))
            })
        },
        payment:()=>{
            useLoaderStore.setState({ isLoading: true });

            postrequest('order/pay', data).then( res => {
                console.log(res);
                if( res.data.status == 'success'){
                    
                }
            })
            .catch((err) => {
                console.error(err);
            })
            .finally(() => {
                useLoaderStore.setState({ isLoading: false });
            });
        },
        refetchCart:()=>{
            get().getCart({ token: useUserStore.getState().token })
           
        }
    })
);

export default useCartStore;