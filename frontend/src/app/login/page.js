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
        <div className="flex justify-center items-center rounded-xl h-[70vh]">
            <div className="bg-common p-10 rounded-md shadow-md w-[40%]">
                <h2 className="text-3xl font-bold mb-8 font-heading">Login</h2>
                <form className="flex flex-col gap-y-6 form-input" onSubmit={handleLoginSubmit}>
                    <div className="gap-y-2">
                        <label htmlFor="email" className="block font-medium text-gray-700">Email</label>
                        <input type="email" id="email" name="email" value={values.name} onChange={handleChange} required className="focus:border-brown w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-none" />
                    </div>
                    <div className="gap-y-2">
                        <label htmlFor="password" className="block font-medium text-gray-700">Password</label>
                        <input type="password" id="password" name="password" value={values.name} onChange={handleChange} required className="focus:border-brown w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-none" />
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