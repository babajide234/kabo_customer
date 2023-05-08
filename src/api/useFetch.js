import React,{ useEffect, useState } from 'react'
import axios from 'axios'

function useFetch (url,payload){
 const [ data, setData ] = useState(null)
 const [ loading, setLoading ] = useState(false)
 const [ error, setError ] = useState(null)

 const instance = axios.create({
    baseURL:'https://kabo.designparklab.com.ng/'
 })
 
 useEffect(()=>{
    setLoading(true);

    instance.post(url,payload).then((response)=>{
        console.log(response.data)
        console.log(loading)
        setData(response.data.data)

    }).catch((err)=>{
        setError(err)
    }).finally(() => {

        setLoading(false);
    });
 },[url]);
 return { data, loading, error }
}

export default useFetch