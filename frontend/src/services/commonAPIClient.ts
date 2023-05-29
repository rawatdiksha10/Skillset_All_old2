import axios from 'axios';
import { removeCookie } from '../util/cookieService';
let baseUrl: string = 'http://localhost:5000';


export async function httpGet(navigate: any, path: string) {
    var data = null;
    var url = baseUrl+path;
    await axios.get(url, 
    {
        headers: {
            'Content-Type': 'application/json'
        },
        withCredentials:true
    })
    .then(response => response.data)
    .then(x => {
        data = x;
    })
    .catch((error) => {
        console.log(error);
        navigateToLogin(navigate, error);       
    });
    return data;
}

export async function httpGetUserSession(path: string) {
    var data = null;
    var url = baseUrl+path;
    await axios.get(url, 
    {
        headers: {
            'Content-Type': 'application/json'
        },
        withCredentials:true
    })
    .then(response => response.data)
    .then(x => {
        data = x;
    })
    .catch((error) => {
        console.log(error);      
    });
    return data;
}

export async function httpPostWithBody(navigate: any, path: string, body: any) {
    var data = null;
    var url = baseUrl+path;

    await axios.post(url, body,
    {
        headers: {
            'Content-Type': 'application/json'
        },
        withCredentials:true
    })
    .then(response => response.data)
    .then(x => {
        data = x;
    })
    .catch(error => {
        console.error(error);
        navigateToLogin(navigate, error);   
    });
    return data;
}

export async function httpPost(navigate: any, path: string) {
    var data = null;
    var url = baseUrl+path;
    await axios.post(url,
    {
        headers: {
            'Content-Type': 'application/json'
        },
        withCredentials:true
    })
    .then(response => response.data)
    .then(x => {
        data = x;
    })
    .catch(error => {
        console.error(error);
        navigateToLogin(navigate, error);   
    });
    return data;
}


export async function httpDelete(path: string) {
    var isDeleted = false;
    var url = baseUrl+path;

    await axios.delete(url)
    .then(response => response.data)
    .then(x => {
        isDeleted = x;
    })
    .catch(error => {
        console.error(error);
    });
    return isDeleted;
}

function navigateToLogin(navigate:any, error:any){
    if(error.response?.status === 401){
        navigate('/login');
        removeCookie("sv");
        alert(error.response.data);
    }    
} 