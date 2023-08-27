import axios from "axios";

export const getAllProvinces = ()=>{
    return axios.get("https://iran-locations-api.vercel.app/api/v1/states")
}
export const getCenterOfProvince = (id)=>{
    return axios.get(`https://iran-locations-api.vercel.app/api/v1/states?id=${id}`)
}
