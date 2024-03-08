"use client"
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Hero from "./_components/Hero";
import SearchCategory from "./_components/SearchCategory";
import Doctor from "./_components/Doctor";
import { useEffect, useState } from "react";
import GlobalApi from "./_utils/GlobalApi";

export default function Home() {
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
    <div>
      <Hero />
      <SearchCategory />
      <Doctor doctorList={doctorList}/>
    </div>
  );
}
