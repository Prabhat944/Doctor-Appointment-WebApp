const { default: axios } = require("axios");

const API_TOKEN = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;

const axiosClient = axios.create({
    baseURL:process.env.NEXT_PUBLIC_BASE_URL ,
    headers:{
        'Authorization':`Bearer ${API_TOKEN}`
    }
})

const getCategory = () => axiosClient.get('categories?populate=*');

const getDoctors = () => axiosClient.get('doctors?populate=*');

export default{
    getCategory,
    getDoctors
}