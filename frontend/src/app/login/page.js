"use client"
import { EmailValidator } from "@/utils/Validation";
import useForm from "@/utils/useForm";
import { useState } from "react";

const page = () => {
    const { values, handleChange } = useForm({
        email: '',
        password: '',
    })
    const [ErrorMessage, setErrorMessage] = useState("");

    const handleLoginSubmit = (e) => {
        e.preventDefault();
        const { email, password } = values;

        if (EmailValidator(email)) {

        }
        else {
            setErrorMessage("Enter valid email!");
        }
        console.log(values)
    }
    return (
        <div className="flex justify-center items-center rounded-xl h-[70vh] ">
            <div className="bg-common p-7 md:p-10 rounded-md shadow-md w-[85%] sm:w-[70%] md:w-[60%] lg:w-[50%] bg-gradient-to-br from-brown to-common">
                <h2 className="mb:text-3xl text-2xl font-extrabold mb-8 font-heading text-gray-700">Login</h2>
                <form className="flex flex-col gap-y-6 form-input" onSubmit={handleLoginSubmit}>
                    <div className="gap-y-2">
                        <label htmlFor="email" className="block text-base md:text-lg font-medium text-gray-700">Email</label>
                        <input type="email" placeholder="abc@gmail.com" id="email" name="email" value={values.name} onChange={handleChange} required className="sm:text-lg text-base px-3 py-1 md:px-3 md:py-2 w-full rounded-md border-gray-300 focus:outline-none focus:border-brown" />
                    </div>
                    <div className="gap-y-2">
                        <label htmlFor="password" className="block text-base md:text-lg font-medium text-gray-700">Password</label>
                        <input type="password" id="password" placeholder="Enter Password" name="password" value={values.name} onChange={handleChange} required className="sm:text-lg text-base px-3 py-1 md:px-3 md:py-2 w-full rounded-md border-gray-300 focus:outline-none focus:border-brown" />
                    </div>
                    <div>
                        <p className="text-red-400 font-heading block font-semibold mb-2">{ErrorMessage}</p>
                        <button type="submit" className="px-4 text-lg font-heading py-2 w-full transition ease-in-out duration-300 border border-1 border-brown hover:bg-brown">Login</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default page