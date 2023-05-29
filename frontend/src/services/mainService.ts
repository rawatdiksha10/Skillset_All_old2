import { httpGet, httpPostWithBody } from "./commonAPIClient";

export async function getAllTags(navigate:any){
    var data = await httpGet(navigate, '/api/getLabels');
    return data;
}

export async function search(navigate:any, data:any) {
    const user = await httpPostWithBody(navigate, '/api/search', JSON.stringify(data));   
    return user;
}

export async function searchByKeyWord(navigate:any, data:any) {
    const user = await httpPostWithBody(navigate, '/api/searchByKeyword', JSON.stringify(data));   
    return user;
}