"use client"
import React, { useEffect, useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
  import { Calendar } from "@/components/ui/calendar"
import { CalendarDays, ClockIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { DialogClose } from '@radix-ui/react-dialog'
import GlobalApi from '@/app/_utils/GlobalApi'
import { toast } from "sonner"
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs'
import { Textarea } from "@/components/ui/textarea"



function BookAppointment({doctor}) {
    const [date, setDate] = useState(new Date());
    const [timeSlot,setTimeSlot] = useState([]);
    const {user} = useKindeBrowserClient();
    const [selectedTimeSlot,setSelectedTimeSlot] = useState();
    const [userNote,setUserNote] = useState('');

console.log({doctor,date,selectedTimeSlot,user})
    const getTime = () => {
        const timeList = [];
        for(let i=10; i<=12; i++){
            timeList.push({
                time: i + ':00 AM'
            })
            timeList.push({
                time: i + ':30 AM'
            })
        }
        for(let i=1; i<=6; i++){
            timeList.push({
                time: i + ':00 PM'
            })
            timeList.push({
                time: i + ':30 PM'
            })
        }
        setTimeSlot(timeList)
    };

    const messageHandler = (e) => {
        e.preventDefault();
        setUserNote(e.target.value)
    }
    const bookAppointmentHandler = () => {
        const payload ={
           data:{
            UserName:user?.given_name + " " + user?.family_name,
            Email:user?.email,
            Date:date,
            Time:selectedTimeSlot,
            Note:userNote,
            doctor:doctor?.id
           }
        }

        GlobalApi.createAppointment(payload).then(res=>{
            console.log(res)
            if(res){
                GlobalApi.sendEmail(payload).then(res=>{
                    console.log(res)
                }).catch((error)=>{
                    console.error("error in send email",error)
                })
                toast("Appointment Detail send to your email.")
            }
        })
    }
    useEffect(()=>{
        getTime();
    },[])

  return (
    <Dialog>
  <DialogTrigger>
  <h2 className='p-2 border-[1px] border-primary rounded-full px-16 text-center text-[16px] mt-2 cursor-pointer bg-primary text-white'>Book Appointment</h2>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Book Appointment</DialogTitle>
      <DialogDescription>
       <div className='grid grid-cols-1 md:grid-cols-2 mt-5'>
        {/* calender */}
        <div className='flex flex-col items-baseline gap-3'>
            <h2 className='flex gap-2 items-center'>
                <CalendarDays className='text-primary h-5 w-5'/>
                Select Date
            </h2>
            <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md border"
            />
        </div>
        {/* Time slot */}
        <div className='mt-5 md:mt-0 flex flex-col  items-baseline '>
            <h2 className='flex gap-2 items-center'>
                <ClockIcon className='text-primary w-5 h-5'/>
                Select Time Slot
            </h2>
            <div className='grid grid-cols-3 gap-2 gap-y-6 border rounded-lg p-3 py-6 mt-3'>
                {timeSlot?.map((item,index)=>(
                  <h2 key={index} className={`border p-1 px-3 rounded-full flex items-center justify-center hover:bg-primary hover:text-white cursor-pointer ${item.time === selectedTimeSlot && 'bg-primary text-white'}`} onClick={()=>setSelectedTimeSlot(item.time)}>{item.time}</h2>  
                ))}
            </div>
        </div>
       </div>
       <Textarea placeholder="Type your message here." className='mt-5' onChange={messageHandler} />
      </DialogDescription>
    </DialogHeader>
    <DialogFooter className="sm:justify-end">
    <DialogClose asChild>
            <Button type="button" variant="outline" className='border-red-500 text-red-500 hover:text-red-500'>
              Close
            </Button>
    </DialogClose>
      <Button type="submit" disabled={!(selectedTimeSlot&&date)} onClick={bookAppointmentHandler}>Submit</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>

  )
}

export default BookAppointment
