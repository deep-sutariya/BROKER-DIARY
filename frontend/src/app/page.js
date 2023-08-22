"use client"
import Card from "@/components/Card";
import InputCard from "@/components/InputCard";
import Months from "@/components/Months";
import { useState } from "react";

export default function Home() {
  const [View, setView] = useState("month");

  return (
    <main className="flex flex-col gap-y-8 mt-7 md:mt-14">

      <div className="mx-auto">
        <h1 className='font-heading font-semibold underline text-lg md:text-2xl text-blue'>Selling Information</h1>
      </div>

      <div className="flex items-center gap-x-2 md:gap-x-4 w-[90%] sm:w-[75%] md:w-[50%] mx-auto">
        <button className={`w-1/2 py-2 md:text-lg text-sm border border-brown flex justify-center cursor-pointer ${View == "all" ? `bg-brown text-common` : ``} `} onClick={() => { setView("all") }}>All Sellings</button>
        <button className={`w-1/2 py-2 md:text-lg text-sm border border-brown flex justify-center cursor-pointer ${View == "month" ? `bg-brown text-common` : ``} `} onClick={() => { setView("month") }}>Monthly Sellings</button>
      </div>


      {
        View == "month" ?
          <div className="month-scroll text-center overflow-x-scroll w-[90%] mx-auto flex">
            <Months />
          </div>
          :
          <></>
      }

      <div className="grid gap-y-8 w-[85%] mx-auto mb-24">
        <Card />
      </div>

    </main>
  )
}