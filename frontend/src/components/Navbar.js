"use client"

import Link from "next/link";
import { FaRegUser, FaSignOutAlt, FaEnvelope, FaLock, FaUserPlus } from "react-icons/fa";

const Navbar = () => {

  return (
    <div className="flex shadow-lg flex-row justify-between mb-6 sm:mb-6 sm:mt-6 mx-auto py-4 px-5 lg:py-7 lg:px-20 md:py-5 md:px-10 bg-brown items-center sm:rounded-t-xl">
      <div className="flex">
        <Link href="/" className="cursor-pointer font-bold tracking-wide hover:scale-105 duration-150 text-2xl sm:text-3xl lg:text-5xl md:text-4xl font-300 sm:tracking-wide text-blue font-rare">
          Brocker Diary
        </Link>
      </div>


      <div className="flex flex-row justify-between items-center">
        {/* <div className="flex gap-x-2 md:gap-x-6 lg:gap-x-8 items-center" >
          <div className="flex hover:scale-110 duration-150 gap-x-1 md:gap-x-2 items-center justify-center cursor-pointer ">
            <FaRegUser className="w-2 h-3 lg:w-5 lg:h-5 md:w-4 md:h-4 text-common" />
            <p className="text-heading text-offwhite text-xs sm:text-base lg:text-xl md:text-lg">Deep Sutariya</p>
          </div>
          <div className="flex gap-x-1 md:gap-x-2 hover:scale-110 duration-150 items-center justify-center cursor-pointer ">
            <FaSignOutAlt className="w-3 h-4 lg:w-5 lg:h-5 md:w-4 md:h-4 text-common cursor-pointer" />
            <p className="text-heading text-offwhite hidden sm:block sm:text-base lg:text-xl md:text-lg">LogOut</p>
            </div>
          </div> */}

        <div className="flex gap-x-4 md:gap-x-6 lg:gap-x-8 items-center" >
          <div className="flex hover:scale-110 duration-150 gap-x-1 md:gap-x-2 items-center justify-center cursor-pointer ">
            <FaLock className="w-3 h-4 lg:w-5 lg:h-5 md:w-4 md:h-4 text-common cursor-pointer" />
            <Link href="login" className="cursor-pointer text-xl font-heading text-offwhite">
              <p className="text-heading text-offwhite text-xs sm:text-base lg:text-xl md:text-lg">Login</p>
            </Link>
          </div>
          <div className="flex gap-x-1 md:gap-x-2 hover:scale-110 duration-150 items-center justify-center cursor-pointer ">
            <FaUserPlus className="w-3 h-4 lg:w-5 lg:h-5 md:w-4 md:h-4 text-common cursor-pointer" />
            <Link href="signup" className="cursor-pointer text-xl font-heading text-offwhite">
              <p className="text-heading text-offwhite text-xs sm:text-base lg:text-xl md:text-lg">Signup</p>
            </Link>
          </div>
        </div>

      </div>
    </div >
  )
}

export default Navbar;