"use client"
import Navbar from '@/components/Navbar'
import './globals.css'
import Footer from '@/components/Footer'
import { useEffect, useState } from 'react';
import InputCard from '@/components/InputCard';

export const metadata = {
  title: 'Broker Diary',
  description: 'Broker Diary',
}

export default function RootLayout({ children }) {

  const [inputCard, setInputCard] = useState(false);
  useEffect(() => {
    if (inputCard) {
      document.getElementById("content").classList.add("blurry");
    } else {
      document.getElementById("content").classList.remove("blurry");
    }
  }, [inputCard])
  return (
    <html lang="en">
      <body id='body' className='bg-offwhite w-[85%] mx-auto font-basic '>
        {
          inputCard ? <div className="fixed inset-0 flex items-center justify-center z-50">
              <div className="w-[85%] mx-auto shadow-lg">
                <InputCard setInputCard={setInputCard} />
              </div>
          </div>
      : <></>
        }
      <div className="fixed top-[87%] left-[87%] shadow-md z-50 rounded-[40%] px-4 py-2 bg-blue cursor-pointer" onClick={() => setInputCard(!inputCard)}>
        <h1 className="text-3xl font-bold text-common">+</h1>
      </div>

      <div id='content' className='content'>
        <Navbar />
        {children}
        <Footer />
      </div>

    </body>
    </html >
  )
}