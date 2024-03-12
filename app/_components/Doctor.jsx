import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

function Doctor({doctorList,title='Popular Doctors'}) {
  return (
    <div className='mb-10 max-w-[1216px] m-auto pt-6'>
      <h1 className='font-bold text-xl'>{title}</h1>
      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-7 mt-4'>
      {doctorList?.length > 0 ? doctorList?.map((item,index)=>(
        <div className='border-[1px] rounded-lg p-3 max-w-72 hover:border-primary hover:shadow-sm cursor-pointer transition-all ease-in-out' key={index}>
            <Image src={item?.attributes?.Image?.data?.attributes?.url} alt='image' width={500} height={200} className='h-[200px] w-full object-cover rounded-lg' />
            <div className='mt-3 items-baseline flex flex-col gap-1'>
                <h2 className='text-[10px] bg-orange-100 rounded-full py-1 px-2 text-primary'>{item?.attributes?.categories?.data[0]?.attributes?.name}</h2>
                <h2 className='font-bold'>{item?.attributes?.Name}</h2>
                <h2 className='text-sm text-primary'>{item?.attributes?.Year_of_Experience}</h2>
                <h2 className='text-gray-500 text-sm min-h-10'>{item?.attributes?.Address}</h2>
                <Link href={'/details/'+item?.id} className='w-full' >
                <h2 className='p-2 px-3 border-[1px] border-primary text-primary rounded-full w-full text-center text-[11px] mt-2 cursor-pointer hover:bg-primary hover:text-white'>Book Now</h2>
                </Link>
            </div>
        </div>
      ))
     :
     Array(6).fill(0).map((item,index)=>
     <div className='border-[1px] rounded-lg p-3 max-w-72' key={index}>
            <div className='h-[200px] w-full object-cover rounded-lg bg-slate-100 animate-pulse' />
            <div className='mt-3 items-baseline flex flex-col gap-1'>
                <h2 className='rounded-lg py-1 px-4 bg-slate-100 min-w-12 min-h-5'></h2>
                <h2 className='rounded-sm bg-slate-100 w-2/3 min-h-5 py-1 px-2'></h2>
                <h2 className='text-sm bg-slate-100 min-w-16 min-h-5 py-1 px-2'></h2>
                <h2 className='rounded-lg bg-slate-100 w-full min-h-10 py-1 px-2'></h2>
                <h2 className='p-2 px-3 border-[1px] bg-slate-100 rounded-full w-full text-center text-[11px] mt-2 py-5'></h2>
            </div>
        </div>)}
      </div>
    </div>
  )
}

export default Doctor
