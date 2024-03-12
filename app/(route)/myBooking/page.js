"use client"
import React, { useEffect, useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import GlobalApi from '@/app/_utils/GlobalApi'
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs'
import BookingList from './_components/BookingList'

function MyBooking() {
   const {user} = useKindeBrowserClient();
   const [bookingList,setBookingList] = useState([]);

    const fetchBookingList = () => {
        GlobalApi.getUserBookingList(user?.email).then(res=>{
            console.log(res)
            setBookingList(res.data.data);
        }).catch(error=>{
            console.error(error);
        })
    }

    const filterBookingList = (type) => {
        const result = bookingList.filter((item)=> type === 'upcoming' ? new Date(item?.attributes?.Date)>=new Date() :new Date(item?.attributes?.Date)<new Date());
        return result;
    };

    useEffect(()=>{
        if(user)fetchBookingList();
    },[user])
  return (
    <div className='m-5'>
      <h2 className='font-bold text-2xl'>MyBooking</h2>
      <Tabs defaultValue="upcoming" className="w-full mt-5">
  <TabsList className='w-full justify-start'>
    <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
    <TabsTrigger value="expired">Expired</TabsTrigger>
  </TabsList>
  <TabsContent value="upcoming">
    <BookingList list={filterBookingList('upcoming')} expired={false} fetchBookingList={fetchBookingList}/>
  </TabsContent>
  <TabsContent value="expired">
  <BookingList list={filterBookingList('expired')} expired={true} fetchBookingList={fetchBookingList} />
  </TabsContent>
</Tabs>

    </div>
  )
}

export default MyBooking
