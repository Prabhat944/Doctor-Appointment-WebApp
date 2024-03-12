"use client"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import GlobalApi from '../_utils/GlobalApi';
import Image from 'next/image'
import Link from 'next/link'

function SearchCategory() {
  const [categoryList,setCategoryList] = useState([]);

  const fetchCategory = () => {
    GlobalApi.getCategory().then((response)=>{
      setCategoryList(response.data.data || [])
    }).catch(error=>console.error(error));
  };

  useEffect(()=>{
    fetchCategory();
  },[])
  return (
    <div className='mt-10 items-center flex flex-col  px-5'>
      <h2 className='font-bold text-4xl tracking-wide'>Search <span className='text-primary'>Doctors</span></h2>
      <h2 className='text-gray-500'>Search Your Doctor and Book Appointment in one click</h2>
      <div className="flex w-full max-w-sm items-center space-x-2 mt-4">
      <Input type="text" placeholder="Search..." />
      <Button type="submit">
        <Search className='h-4'/>
        Search
      </Button>
    </div>
    <div className='grid grid-cols-3 mt-10 md:grid-cols-4 lg:grid-cols-6'>
        {categoryList?.length > 0 ?
        categoryList?.map((item,index)=>index < 6 && (
          <Link href={"/search/" + item?.attributes?.name} key={index} className='flex flex-col text-center items-center p-5 bg-orange-50 rounded-lg m-2 gap-2 hover:scale-105 transition-all ease-in-out cursor-pointer'>
            <Image src={item?.attributes?.icon?.data?.attributes?.url} alt='icons' width={40} height={40} />
            <label className='text-orange-600 text-sm'>{item?.attributes.name}</label>
          </Link>
        )) 
        :
        Array(6).fill(0).map((item,index)=>(<div key={index} className='flex flex-col text-center items-center p-5 bg-slate-100 animate-pulse rounded-lg m-2 gap-2'>
        <div className='bg-slate-300 px-6 py-6 rounded-full'></div>
        <label className='bg-slate-300 px-8 py-2 rounded-sm'></label>
      </div>))
        }
      </div>
    </div>
  )
}

export default SearchCategory
