import axios from "axios";
const url ='https://kabo.designparklab.com.ng';

export const instance = axios.create({
    baseURL:url
});



export const postrequest = async (url,data)=>{
    return instance.post(url,data)
}
export const getrequest = async (url,data)=>{
    return instance.get(url,data)
}
export const upload = async (user, file) =>{
    const formData = new FormData();
    formData.append('token', user);
    formData.append('file', file);

    return instance.post('misc/file-upload', formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
    })

}