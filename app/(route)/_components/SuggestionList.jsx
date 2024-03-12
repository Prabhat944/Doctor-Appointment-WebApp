"use client"
import GlobalApi from '@/app/_utils/GlobalApi';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'

function SuggestionList() {
    const [doctorList,setDoctorList] = useState([]);

  const fetchDoctors = () => {
    GlobalApi.getDoctors().then((response)=>{
      setDoctorList(response.data.data || []);
        }).catch(error=>console.error(error));
  };

  useEffect(()=>{
    fetchDoctors();
  },[])
  return (
    <div className='flex flex-col gap-4 mt-4 lg:mt-0 lg:px-4'>
      <h2 className='font-bold text-[18px]'>Suggestions</h2>
      {doctorList.map((item,index)=>(
        <Link href={'/details/'+item?.id} className='w-full' >
        <div className='border-[1px] rounded-lg p-3 max-w-72 hover:border-primary hover:shadow-sm cursor-pointer transition-all ease-in-out' key={index}>
        <div className='flex gap-2'>
        <Image src={item?.attributes?.Image?.data?.attributes?.url} alt='image' width={80} height={80} className='h-[80px] object-cover rounded-lg' />
        <div className='flex flex-col items-baseline'>
        <h2 className='text-[10px] bg-orange-100 rounded-full py-1 px-2 text-primary'>{item?.attributes?.categories?.data[0]?.attributes?.name}</h2>
        <h2 className='font-bold'>{item?.attributes?.Name}</h2>
        <h2 className='text-sm text-primary'>{item?.attributes?.Year_of_Experience}</h2>
        </div>
        </div>
    </div>
    </Link>
      ))}
    </div>
  )
}

export default SuggestionList
