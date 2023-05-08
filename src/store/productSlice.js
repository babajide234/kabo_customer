import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { postrequest } from '../api/requests';
import useLoaderStore from './loaderSlice';

const useProductStore = create(
    (set,get) =>({
        products: [],
        categories:[],
        loading: false,
        product:null,
        getProducts:(data)=>{
            useLoaderStore.setState({ isLoading: true });
            
            postrequest('store/products', data).then( res => {
                console.log(res)
                if( res.data.status == 'success'){
                    set(state => ({ ...state, products: res.data.data }))
                }
            })
            .catch((err) => {
                console.error(err);
            })
            .finally(() => {
                useLoaderStore.setState({ isLoading: false });
            });
        },
        getProductsDetails:(data)=>{
            useLoaderStore.setState({ isLoading: true });
            
            postrequest('store/products', data).then( res => {
                console.log(res)
                if( res.data.status == 'success'){
                    set(state => ({ ...state, product: res.data.data }))
                }
            })
            .catch((err) => {
                console.error(err);
            })
            .finally(() => {
                useLoaderStore.setState({ isLoading: false });
            });
        },
        getCat:(data)=>{
            useLoaderStore.setState({ isLoading: true });
            
            postrequest('misc/category', data).then( res => {
                if( res.data.status == 'success'){
                    console.log(res.data)
                    set(state => ({ ...state, loading: false }))
                    set(state => ({ ...state, categories: res.data.data }))
                }
            })
            .catch((err) => {
                console.error(err);
            })
            .finally(() => {
                useLoaderStore.setState({ isLoading: false });
            });
        }
    }))

export default useProductStore;