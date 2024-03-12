import { Button } from '@/components/ui/button'
import { CalendarCheck, ClockIcon, MapPinnedIcon } from 'lucide-react'
import moment from 'moment'
import Image from 'next/image'
import React from 'react'
import CancelBooking from './CancelBooking'
import GlobalApi from '@/app/_utils/GlobalApi'
import { toast } from 'sonner'

function BookingList({list,expired,fetchBookingList}) {

    const cancelBookingHandler = (item) => {
        console.log("item",item?.id)
        GlobalApi.cancelAppointment(item?.id).then(res=>{
            toast("Appointment cancelled successfully.");
            fetchBookingList();
        }).catch(error=>{
            toast("something went wrong")
            console.error(error)
        })
    };

  return (
    <div className='flex flex-col gap-3'>
      {list.map((items)=>(<div className='w-full border-[1px] border-slate-200 p-5 rounded-lg flex flex-col  gap-4 md:flex-row md:gap-0'>
        <Image src={items?.attributes?.doctor?.data?.attributes?.Image?.data?.attributes?.url} alt='image' width={150} height={150} className='rounded-lg' />
        <div className='flex flex-col ml-4 gap-1 flex-1'>
            <h2 className='font-bold text-xl'>{items?.attributes?.doctor?.data?.attributes?.Name}</h2>
            <div className='flex gap-2'>
                <MapPinnedIcon className='text-primary w-5 h-5' />
                <h2 className='text-slate-400 text-sm'>{items?.attributes?.doctor?.data?.attributes?.Address}</h2></div>
            <div className='flex gap-2'>
                <CalendarCheck className={ `${expired ? 'text-red-600' : 'text-green-600'} w-5 h-5`}/>
                <h2 className={`font-medium text-sm ${expired ? 'text-red-600' : 'text-green-600'}`}>Appointment On: {moment(items?.attributes?.Date).format('LL')}</h2></div>
            <div className='flex gap-2'>
                <ClockIcon className={ `${expired ? 'text-red-600' : 'text-green-600'} w-5 h-5`}/>
                <h2 className={`font-medium text-sm ${expired ? 'text-red-600' : 'text-green-600'}`}>At Time: {items?.attributes?.Time}</h2></div>
        </div>
        {expired ? <Button className='bg-red-600 px-8' disabled={true} >
            Expired
        </Button> :
        <CancelBooking deleteBooking={()=>cancelBookingHandler(items)} />
        }
       </div>))}
    </div>
  )
}

export default BookingList
