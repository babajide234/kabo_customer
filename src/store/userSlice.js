import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { postrequest, upload } from '../api/requests';
import useLoaderStore from './loaderSlice';

const useUserStore = create( persist(
    (set,get) =>({
        isLoggedIn:false,
        loading:false,
        token:'',
        details: {},
        photo:'',
        registerStatus: false,
        setDetails: (data) => {
            set(state => ({ ...state, details: data }))
        },
        getDetails: () => {
            postrequest('account/details', {token: get().token})
            .then((res) => {
                console.log(res);
                if( res.data.status == 'success'){
                    get().setDetails(res.data.data);
                } 
            })
        },
        login: async (data)=>{
            useLoaderStore.setState({ isLoading: true });
            postrequest('account/login', data)
            .then((res) => {
                console.log(res);
                if( res.data.status == 'success'){
                    set(state => ({ ...state, token: res.data.token }))
                    set(state => ({ ...state, isLoggedIn: true }))

                    get().setDetails(res.data.data);
                } 
            })
            .catch((err) => {
                console.error(err);
            })
            .finally(() => {
                useLoaderStore.setState({ isLoading: false });
            });
        },
        register:(data)=>{
            useLoaderStore.setState({ isLoading: true });
            
            postrequest('account/register', data).then(
                res => {
                    console.log(res);
                    if( res.data.status == 'success'){
                        set(state => ({ ...state, registerStatus: true }))
                    }
                } 
            )
            .catch((err) => {
                console.error(err);
            })
            .finally(() => {
                useLoaderStore.setState({ isLoading: false });
            });
        },
        logout:() => {
            set(state => ({ ...state, isLoggedIn: false }))
            set(state => ({ ...state, token: '' }))
            set(state => ({ ...state, details: {} }))
        },
        updateDetails:(name,data) =>{
            useLoaderStore.setState({ isLoading: true });
            postrequest('account/update-'+name, data).then(
                res => {
                    console.log(res);
                    if( res.data.status == 'success'){
                        set(state => ({ ...state, loading: false }))
                        get().getDetails()
                    } else {
                        set(state => ({ ...state, loading: false }))
                    }
                } 
            )
            .catch((err) => {
                console.error(err);
            })
            .finally(() => {
                useLoaderStore.setState({ isLoading: false });
            });
        },
        profileUpload: (data) => {
            useLoaderStore.setState({ isLoading: true });
            postrequest('account/upload-photo', data).then(
                res => {
                    console.log(res);
                    if( res.data.status == 'success'){
                        set(state => ({ ...state, loading: false }))
                        get().getDetails()
                    } else {
                        set(state => ({ ...state, loading: false }))
                    }
                } 
            )
            .catch((err) => {
                console.error(err);
            })
            .finally(() => {
                useLoaderStore.setState({ isLoading: false });
            });
        },
        refetchDetails:()=>{
            get().getDetails({ token: get().token })
        }
    }),
    {
        name:'Kabo-user',
        storage: createJSONStorage(() => sessionStorage)
    }
))

export default useUserStore;