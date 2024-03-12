"use client"
import GlobalApi from '@/app/_utils/GlobalApi'
import React, { useEffect, useState } from 'react'
import DoctorDetail from '../../_components/DoctorDetail'
import SuggestionList from '../../_components/SuggestionList';

function page({params}) {
  const [doctor,setDoctor] = useState();
  const fetchDoctorDetails = () => {
    GlobalApi.fetchDoctorsById(params.docId).then((response)=>{
      console.log(response.data.data)
      setDoctor(response.data.data);
    }).catch((error)=>{
      console.error(error)
    })
  }

  useEffect(()=>{
    fetchDoctorDetails();
  },[]);

  return (
    <div className='p-5 md:px-20'>
      <div className='font-bold text-[22px]'>Details</div>
      <div className='grid grid-cols-1 lg:grid-cols-4'>
        {/* Doctor details */}
        <div className='col-span-3'>
          <DoctorDetail doctor={doctor}/>
        </div>
        {/* Doctor suggestion */}
        <div>
         <SuggestionList />
        </div>
      </div>
    </div>
  )
}

export default page
