import { GraduationCap, MapPin } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import BookAppointment from './BookAppointment';

function DoctorDetail({doctor}) {
    console.log("doctor",doctor)
    const socialList = [
        {
            id:0,
            icon:'/facebook.png',
            url:''
        },
        {
            id:1,
            icon:'/instagram.png',
            url:''
        },
        {
            id:2,
            icon:'/linkedin.png',
            url:''
        },
        {
            id:3,
            icon:'/youtube.png',
            url:''
        },
        {
            id:4,
            icon:'/twitter.png',
            url:''
        },
        {
            id:5,
            icon:'/whatsapp.png',
            url:''
        }
    ];

  return (
    <>
    <div className='grid grid-cols-1 md:grid-cols-3 border-[1px] p-5 mt-5 rounded-lg'>
          {/* Doctor Image */}
          <div>
          <Image src={doctor?.attributes?.Image?.data?.attributes?.url} width={200} height={200} alt='doctor-image' className='rounded-lg w-full h-[280px] object-cover' /> 
          </div>
          {/* Doctor info */}
          <div className='col-span-2 mt-5 flex flex-col gap-3 items-baseline md:px-3'>
            <h2 className='font-bold text-2xl'>{doctor?.attributes?.Name}</h2>
            <h2 className='flex gap-2 text-gray-500'>
                <GraduationCap />
                <span>{doctor?.attributes?.Year_of_Experience}</span>
            </h2>
            <h2 className='text-md flex gap-2 text-gray-500'>
                <MapPin />
                <span>{doctor?.attributes?.Address}</span>
            </h2>
            <h2 className='text-[10px] bg-orange-100 rounded-full py-1 px-2 text-primary'>{doctor?.attributes?.categories?.data[0]?.attributes?.name}</h2>
            <div className='flex gap-3'>
                {socialList.map((item,index)=><Image key={index} src={item.icon} width={30} height={30} alt='icon' />)}
            </div>
            <BookAppointment doctor={doctor} />
          </div>
    </div>
    <div className='border-[1px] rounded-lg p-3 mt-5'>
        <h2 className='font-bold text-[20px]'>About me</h2>
        <p className='text-gray-500 tracking-wide mt-2'>
            {doctor?.attributes?.About[0]?.children[0]?.text}
        </p>
    </div>
    </>
  )
}

export default DoctorDetail
