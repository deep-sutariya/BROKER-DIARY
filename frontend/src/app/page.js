"use client"
import Card from "@/components/Card";
import Months from "@/components/Months";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Home() {
  const [View, setView] = useState("month");

  const getUserInfo = async(token) => {
    const data = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/login`, {token});
    if (data?.data?.user && data?.data?.token) {
      console.log(data?.data?.token);
      sessionStorage.setItem("LOGIN_TOKEN", data?.data?.token);
      alert(data?.data?.message);
    }
  }

  useEffect(() => {
    const token = sessionStorage.getItem("LOGIN_TOKEN");
    if (token.length > 0) {
      getUserInfo(token);
    }
  }, []);

  return (
    <main className="flex flex-col gap-y-6 md:gap-y-8 mt-7 md:mt-14">

      <div className="mx-auto">
        <h1 className='font-heading font-semibold underline text-base md:text-2xl text-blue'>Selling Information</h1>
      </div>

      <div className="flex items-center gap-x-2 md:gap-x-4 w-[90%] sm:w-[75%] md:w-[50%] mx-auto">
        <button className={`w-1/2 py-1 md:py-2 md:text-lg text-sm border border-brown flex justify-center rounded-lg cursor-pointer ${View == "all" ? `bg-brown text-common` : ``} `} onClick={() => { setView("all") }}>All Sellings</button>
        <button className={`w-1/2 py-1 md:py-2 md:text-lg text-sm border border-brown flex justify-center rounded-lg cursor-pointer ${View == "month" ? `bg-brown text-common` : ``} `} onClick={() => { setView("month") }}>Monthly Sellings</button>
      </div>


      {
        View == "month" ?
          <div className="month-scroll text-center overflow-x-scroll w-[85%] mx-auto flex">
            <Months />
          </div>
          :
          <></>
      }

      <div className="grid gap-y-4 md:gap-y-8 w-[85%] mx-auto">
        <Card />
        <Card />
        <Card />
        <Card />
      </div>

    </main>
  )
}