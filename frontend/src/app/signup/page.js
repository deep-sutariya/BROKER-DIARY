"use client"
import { EmailValidator, IsNullValidator, PasswordValidator } from "@/utils/Validation"
import useForm from "@/utils/useForm"
import { useState } from "react"

const page = () => {
    const { values, handleChange } = useForm({
        fullname: '',
        email: '',
        password: '',
        cpassword: ''
    })

    const [ErrorMessage, setErrorMessage] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        const { fullname, email, password, cpassword } = values;

        if (EmailValidator(email)) {
            if (PasswordValidator(password, cpassword)) {
                alert("Signup successfully!");
            }
            else {
                setErrorMessage("Enter current password same as password!")
            }
        }
        else {
            setErrorMessage("Enter valid email!");
            document.getElementById("email").focus = true;
        }

        console.log(values)
    }
    return (
        <div className="flex justify-center items-center rounded-xl h-[70vh]">
            <div className="bg-common p-10 rounded-md shadow-md w-[60%]">
                <h2 className="text-3xl font-bold mb-10 font-heading">Signup</h2>
                <form className="flex flex-col gap-y-8 form-input" onSubmit={handleSubmit}>
                    <div className="flex gap-x-10 w-full">
                        <div className="flex flex-col gap-y-4 w-1/2">
                            <div className="gap-y-2">
                                <label htmlFor="fullname" className="font-medium text-gray-700">Full Name</label>
                                <input type="text" id="fullname" name="fullname" value={values.name} onChange={handleChange} required className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-brown" />
                            </div>
                            <div className="gap-y-2">
                                <label htmlFor="email" className="font-medium text-gray-700">Email</label>
                                <input id="email" name="email" value={values.name} onChange={handleChange} required className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-brown" />
                            </div>
                        </div>

                        <div className="flex flex-col gap-y-4 w-1/2">
                            <div className="gap-y-2">
                                <label htmlFor="password" className="font-medium text-gray-700">Password</label>
                                <input type="password" id="password" name="password" value={values.name} onChange={handleChange} required className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-brown" />
                            </div>
                            <div className="gap-y-2">
                                <label htmlFor="cpassword" className="font-medium text-gray-700">Confirm Password</label>
                                <input type="password" id="cpassword" name="cpassword" value={values.name} onChange={handleChange} required className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-brown" />
                            </div>
                        </div>

                    </div>
                    <div>
                        <p className="text-red-400 font-heading block font-semibold mb-2">{ErrorMessage}</p>
                        <button type="submit" className="px-4 text-lg font-heading py-2 w-full transition ease-in-out duration-300 border border-1 border-brown hover:bg-brown">Signup</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default page