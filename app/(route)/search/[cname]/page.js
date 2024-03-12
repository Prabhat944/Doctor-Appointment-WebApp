"use client"
import Doctor from '@/app/_components/Doctor';
import GlobalApi from '@/app/_utils/GlobalApi'
import React, { useEffect, useState } from 'react'

const index = ({params}) => {
  const [doctorListByCategory,setDoctorListByCategory] = useState([]);

  const getDoctorCategoryList = async() => {
    await GlobalApi.fetchDoctorsByCategory(params.cname).then((response)=>{
      console.log("getDoctorCategoryList", response.data?.data);
      setDoctorListByCategory(response.data?.data)
    }).catch((error)=>{
      console.error(error)
    })
  };

  useEffect(()=>{
    getDoctorCategoryList();
  },[])
  return (
    <div>
      <Doctor doctorList={doctorListByCategory} title={params.cname} />
    </div>
  )
}

export default index
