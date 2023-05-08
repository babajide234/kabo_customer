import axiosInstance from "./AxiosInstance"

export function signUp(username,email,phone,passcode,referral_code){
    const data = {
        username,
        email,
        phone,
        passcode,
        referral_code
    }
    return axiosInstance.post('account/register',data);
}
export function login(email,passcode){
    const data = {
        email,
        passcode
    }
    return axiosInstance.post('account/login',data);
}

export function saveTokenInLocalStorage(tokenDetails) {
    // tokenDetails.expireDate = new Date(
    //     new Date().getTime() + tokenDetails.expiresIn * 1000,
    // );
    localStorage.setItem('userDetails', JSON.stringify(tokenDetails));
}