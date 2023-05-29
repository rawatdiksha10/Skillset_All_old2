import { getCookie } from "../util/cookieService";
import { httpGet, httpDelete, httpGetUserSession, httpPostWithBody } from "./commonAPIClient";

export async function login(navigate:any, data:any) {
    const user = await httpPostWithBody(navigate, '/api/account/login', { userid:data.userid, password: data.password });   
    return user;
}

export async function logout(navigate:any) {
    const isSuccess = await httpDelete('/api/account/logout/'+ getCookie("sv"));  
    return isSuccess;
}

export async function getUserSession() {   
    const user = await httpGetUserSession('/api/account/checkAuthorization');   
    return user;
}

export async function checkUserIdExist(navigate:any, data:any){
    var isITEExist = await httpPostWithBody(navigate, '/api/account/checkite', { userid:data });   
    return isITEExist;
}

export async function resetPasswordRequest(navigate:any, data:any){
    var isAddedRecord = await httpPostWithBody(navigate, '/api/account/resetpwdinit', { userid:data });
    return isAddedRecord;
}

export async function getResetPasswordRequest(navigate:any){
    var getResetPassword= await httpGet(navigate, '/api/account/getAllResetpwd');
    return getResetPassword;
}

export async function resetPassword(navigate:any, data:any) {
    const user = await httpPostWithBody(navigate, '/api/account/resetpwd', { userid:data.userid, firstpassword: data.firstpassword, secondpassword: data.secondpassword});   
    return user;
}