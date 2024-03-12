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

const fetchDoctorsByCategory = (category) => axiosClient.get('doctors?filters[categories][name][$in]='+category + '&populate=*');

const fetchDoctorsById = (id) => axiosClient.get('doctors/' + id + '?populate=*');

const createAppointment = (payload) => axiosClient.post("appointments",payload);

const getUserBookingList = (userEmail) => axiosClient.get('appointments?[filters][email][$eq]=' + userEmail + "&populate[doctor][populate][Image][populate][0]=url&populate=*");

const cancelAppointment = (payload) => axiosClient.delete("appointments/" + payload);

const sendEmail = (payload) => axios.post('/api/sendEmail',payload);
export default{
    getCategory,
    getDoctors,
    fetchDoctorsByCategory,
    fetchDoctorsById,
    createAppointment,
    getUserBookingList,
    sendEmail,
    cancelAppointment,
}