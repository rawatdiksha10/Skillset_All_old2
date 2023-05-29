import { httpGet, httpPostWithBody } from "./commonAPIClient";

export async function saveEngineerProfile(navigate:any, data:any){
    var isAddedRecord = await httpPostWithBody(navigate, '/api/skill/saveEngineerProfile', JSON.stringify(data));
    return isAddedRecord;
}

export async function saveEngineerProfileByEngineer(navigate:any, data:any){
    var isAddedRecord = await httpPostWithBody(navigate, '/api/skill/saveEngineerProfileByEngineer', JSON.stringify(data));
    return isAddedRecord;
}

export async function getAllTags(navigate:any){
    var data = await httpGet(navigate, '/api/skill/getAllTags');
    return data;
}

export async function getUserProfileByITENo(navigate:any, iteNo:any){
    var data = await httpGet(navigate, '/api/skill/getUserProfileByITENo/'+iteNo);
    return data;
}

export async function getAllEngineer(navigate:any){
    var data = await httpGet(navigate, '/api/skill/getAllEngineer');
    return data;
}

export async function deleteEngineer(navigate:any, data:any){
    var deleteEngineer = await httpPostWithBody(navigate, '/api/skill/deleteEngineer', { userid:data });   
    return deleteEngineer;
}

export async function newengineerregistration(navigate:any, data:any){
    var isAddedRecord = await httpPostWithBody(navigate, '/api/skill/register', JSON.stringify(data));
    return isAddedRecord;
}

export async function getEngineerProfileByUserId(navigate:any, data:any){
    var getUserid = await httpPostWithBody(navigate, '/api/skill/fetchEnggInfoByID/',{ userid :data});
    return getUserid;
}

export async function getAllEngineerInfo(navigate:any){
    var data = await httpGet(navigate, '/api/skill/fetchEnggInfo');
    return data;
}

