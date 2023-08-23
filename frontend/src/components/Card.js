"use client"

import { CheckCardInput } from "@/utils/Validation";
import useUpdate from "@/utils/useUpdate";
import { useEffect, useState } from "react";
import { FaTimes, FaEdit, FaTrash } from 'react-icons/fa';

const Card = () => {
    const [ViewEdit, setViewEdit] = useState(false);

    const [formData, setFormData] = useState({
        seller: 'John Doe',
        buyer: 'Jane Smisssssssss',
        sellingDate: '2023-08-14',
        dueDate: '2023-08-30',
        dueDay: '5',
        weight: '10',
        outPercentage: '5',
        outWeight: '0.5',
        netWeight: '9.5',
        price: '10',
        lessPercentage: '2',
        totalAmount: '76',
        brokerage: '2',
        brokerageAmt: '1.52',
        pendingAmount: '95',
        paymentRemarks: [],
        fullpaymentDone: false,
    });

    const { values, handleChange } = useUpdate({
        seller: formData.seller,
        buyer: formData.buyer,
        sellingDate: formData.sellingDate,
        dueDate: formData.dueDate,
        dueDay: formData.dueDay,
        weight: formData.weight,
        outPercentage: formData.outPercentage,
        outWeight: formData.outWeight,
        netWeight: formData.netWeight,
        price: formData.price,
        lessPercentage: formData.lessPercentage,
        totalAmount: formData.totalAmount,
        brokerage: formData.brokerage,
        brokerageAmt: formData.brokerageAmt,
        pendingAmount: formData.totalAmount,
        paidDate: new Date().toISOString().split('T')[0],
        paidAmount: "",
        paymentRemarks: formData.paymentRemarks,
        fullpaymentDone: formData.fullpaymentDone,
    });


    const CancelEdit = () => {
        handleChange([
            { name: 'seller', value: formData.seller },
            { name: 'buyer', value: formData.buyer },
            { name: 'sellingDate', value: formData.sellingDate },
            { name: 'dueDate', value: formData.dueDate },
            { name: 'dueDay', value: formData.dueDay },
            { name: 'weight', value: formData.weight },
            { name: 'outPercentage', value: formData.outPercentage },
            { name: 'outWeight', value: formData.outWeight },
            { name: 'netWeight', value: formData.netWeight },
            { name: 'price', value: formData.price },
            { name: 'lessPercentage', value: formData.lessPercentage },
            { name: 'totalAmount', value: formData.totalAmount },
            { name: 'brokerage', value: formData.brokerage },
            { name: 'brokerageAmt', value: formData.brokerageAmt },
            { name: 'pendingAmount', value: formData.pendingAmount },
            { name: 'paidDate', value: new Date().toISOString().split('T')[0] },
            { name: 'paidAmount', value: "" },
            { name: 'paymentRemarks', value: formData.paymentRemarks },
            { name: 'fullpaymentDone', value: formData.fullpaymentDone },
        ]);

        setViewEdit(false);
    };


    const SaveEdit = () => {
        if (values.pendingAmount < values.paidAmount) alert("Enter Paid Amount Properly")
        else {
            const responseError = CheckCardInput(values);
            if (responseError === "Success") {
                let npa, val;
                if (values.pendingAmount > 0 && values.paidAmount > 0 && values.pendingAmount >= values.paidAmount && values.paidDate) {
                    npa = values.pendingAmount - values.paidAmount;
                    val = [...values.paymentRemarks];
                    val.push({ Date: values.paidDate, PaidAmount: values.paidAmount, fullpaymentDone: false })
                    if (values.fullpaymentDone) {
                        val.push({ Date: values.paidDate, PaidAmount: npa, fullpaymentDone: true })
                        handleChange([{ name: "paymentRemarks", value: val }, { name: "pendingAmount", value: 0 }])
                    }
                    else handleChange([{ name: "paymentRemarks", value: val }, { name: "pendingAmount", value: npa }])
                }
                else if (values.fullpaymentDone && values.pendingAmount > 0) {
                    val = [...values.paymentRemarks];
                    val.push({ Date: values.paidDate, PaidAmount: values.pendingAmount, fullpaymentDone: true })
                    handleChange([{ name: "paymentRemarks", value: val }, { name: "pendingAmount", value: 0 }])

                }
                setFormData(values);
                setViewEdit(false);
                values.paidAmount = "";
            }
            else alert(responseError);
        }
    }

    const DeletePaymentEntry = (ind) => {
        let paidAmount = Number(values.paymentRemarks[ind].PaidAmount);
        let NewpendingAmount = values.pendingAmount + paidAmount;
        values.paymentRemarks.splice(ind, 1);
        handleChange([{ name: "paymentRemarks", value: values.paymentRemarks }, { name: "pendingAmount", value: NewpendingAmount }]);
    }

    const checkBoxHandler = () => {
        handleChange([{ name: "fullpaymentDone", value: document.getElementById("fullpaymentDoneCheckBox").checked }]);
    }

    useEffect(() => {
        handleChange([{ name: "pendingAmount", value: values.totalAmount }])
    }, [values.totalAmount])

    useEffect(() => {
        const startDate = new Date(values.sellingDate);
        const endDate = new Date(values.dueDate);

        const differenceInMillis = endDate - startDate;
        values.dueDay = differenceInMillis / (1000 * 60 * 60 * 24);
        setFormData(prevFormData => ({
            ...prevFormData,
            dueDay: values.dueDay.toString(),
        }));
    }, [values.sellingDate, values.dueDate]);

    useEffect(() => {
        if (values.weight > 0 && values.outPercentage > 0) {
            const ow = (values.weight * values.outPercentage) / 100;
            const nw = values.weight - ow;
            handleChange([{ name: "netWeight", value: nw }, { name: "outWeight", value: ow }]);
        } else {
            handleChange([{ name: "netWeight", value: "" }, { name: "outWeight", value: "" }])
        }
    }, [values.weight, values.outPercentage])

    useEffect(() => {
        if (values.netWeight > 0 && values.price > 0 && values.lessPercentage > 0) {
            const ta = (values.netWeight * values.price) - (values.netWeight * values.lessPercentage);
            handleChange([{ name: "totalAmount", value: ta }]);
        } else {
            handleChange([{ name: "totalAmount", value: "" }]);
        }
    }, [values.price, values.lessPercentage, values.netWeight])

    useEffect(() => {
        if (values.totalAmount > 0 && values.brokerage > 0) {
            const ba = (values.totalAmount * values.brokerage) / 100;
            handleChange([{ name: "brokerageAmt", value: ba }]);
        } else {
            handleChange([{ name: "brokerageAmt", value: "" }]);
        }
    }, [values.totalAmount, values.brokerage])

    return (
        <div>
            <div className={`rounded-t-lg flex flex-col border-t-4 ${formData.fullpaymentDone === true ? `border-green-500` : `border-red-500`}`}></div>

            <div className="rounded-b-lg bg-common shadow-md py-2 px-2 md:py-3 md:px-4">
                <div className="m-2 flex justify-between gap-x-10">
                    <div className="flex flex-col justify-between gap-y-2 w-full">
                        <div className="flex gap-x-2 items-center">
                            <h1 className="text-gray-600 text-xs sm:text-base">Seller:</h1>
                            {
                                ViewEdit ?
                                    <input
                                        className="text-xs sm:text-base px-1 py-1 md:px-3 md:py-1 w-full rounded-md focus:outline-none"
                                        type="text"
                                        name="seller"
                                        value={values.seller}
                                        onChange={handleChange}
                                    />
                                    :
                                    <h1 className="font-semibold text-xs sm:text-base">{formData.seller}</h1>
                            }
                        </div>
                        <div className="flex gap-x-2 items-center">
                            <h1 className="text-gray-600 text-xs sm:text-base">Buyer:</h1>
                            {
                                ViewEdit ?
                                    <input
                                        className="text-xs sm:text-base px-1 py-1 md:px-3 md:py-1 w-full rounded-md focus:outline-none"
                                        type="text"
                                        name="buyer"
                                        value={values.buyer}
                                        onChange={handleChange}
                                    />
                                    :
                                    <h1 className="font-semibold text-xs sm:text-base">{formData.buyer}</h1>
                            }
                        </div>
                        {
                            !ViewEdit ?
                                <div className="flex gap-x-2 w-full items-center">
                                    <h1 className="text-gray-600 text-xs sm:text-base">Pending Amount:</h1>
                                    <div className=" flex gap-x-2 items-center">
                                        <h1 className="font-extrabold font-heading sm:tracking-wider text-red-700 text-xs sm:text-base">{values.pendingAmount}</h1>
                                        <h1 className="text-gray-600 text-xs sm:text-base">₹</h1>
                                    </div>
                                </div>
                                : <></>
                        }
                    </div>
                    <div className="cursor-pointer" >
                        {
                            ViewEdit ?
                                <FaTimes className="w-4 h-4 md:w-5 md:h-5 opacity-60" onClick={CancelEdit} />
                                :
                                <FaEdit className="w-4 h-4 md:w-5 md:h-5 opacity-60" onClick={() => setViewEdit(true)} />
                        }
                    </div>
                </div>

                <div className="m-2 flex justify-between border-t-2 border-brown pt-3 gap-x-1 md:gap-x-5 lg:gap-x-10">
                    <div className="flex flex-col lg:flex-row w-2/6 md:w-1/3 md:gap-x-2 text-center items-center">
                        <h1 className="text-gray-600 text-xs sm:text-base">Selling Date:</h1>
                        {
                            ViewEdit ?
                                <input
                                    className="text-xs sm:text-base px-1 py-1 md:px-3 md:py-1 w-4/6 sm:w-full rounded-md focus:outline-none"
                                    type="date"
                                    name="sellingDate"
                                    value={values.sellingDate}
                                    max={values.dueDate}
                                    onChange={handleChange}
                                />
                                :
                                <h1 className="font-semibold text-xs sm:text-base">{formData.sellingDate}</h1>
                        }
                    </div>
                    <div className="flex flex-col lg:flex-row w-2/6 md:w-1/3 gap-x-2 text-center items-center">
                        <h1 className="text-gray-600 text-xs sm:text-base">Due Date:</h1>
                        {
                            ViewEdit ?
                                <input
                                    className="text-xs sm:text-base px-1 py-1 md:px-3 md:py-1 w-4/6 sm:w-full rounded-md focus:outline-none"
                                    type="date"
                                    name="dueDate"
                                    value={values.dueDate}
                                    min={values.sellingDate}
                                    onChange={handleChange}
                                />
                                :
                                <h1 className="font-semibold text-xs sm:text-base">{formData.dueDate}</h1>
                        }
                    </div>
                    <div className="flex flex-col lg:flex-row w-2/6 md:w-1/3 gap-x-2 text-center items-center">
                        <h1 className="text-gray-600 text-xs sm:text-base">Due Day:</h1>
                        {
                            ViewEdit ?
                                <input
                                    className="text-xs sm:text-base px-1 py-1 md:px-3 md:py-1 w-4/6 sm:w-full rounded-md focus:outline-none"
                                    type="text"
                                    name="dueDay"
                                    value={values.dueDay}
                                    onChange={handleChange}
                                    disabled
                                />
                                :
                                <h1 className="font-semibold text-xs sm:text-base">{formData.dueDay}</h1>
                        }
                    </div>
                </div>

                <div className="m-2 flex justify-between border-t-2 border-brown pt-3 gap-y-2 gap-x-1 md:gap-x-5 lg:gap-x-10">
                    <div className="flex flex-col lg:flex-row w-1/3 gap-x-2 text-center items-center">
                        <h1 className="text-gray-600 text-xs sm:text-base">Weight:</h1>
                        <div className="flex gap-x-1 md:gap-x-2 items-center justify-center">
                            {
                                ViewEdit ?
                                    <input
                                        className="text-xs sm:text-base px-1 py-1 md:px-3 md:py-1 w-4/6 sm:w-full rounded-md focus:outline-none"
                                        type="text"
                                        name="weight"
                                        value={values.weight}
                                        onChange={handleChange}
                                    />
                                    :
                                    <h1 className="font-semibold text-xs sm:text-base">{formData.weight}</h1>
                            }
                            <h1 className="text-gray-600 text-xs sm:text-base">kg</h1>
                        </div>
                    </div>
                    <div className="flex flex-col lg:flex-row w-1/3 gap-x-2 text-center items-center">
                        <h1 className="text-gray-600 text-xs sm:text-base">Out(%):</h1>
                        <div className="flex gap-x-1 md:gap-x-2 items-center justify-center">
                            {
                                ViewEdit ?
                                    <input
                                        className="text-xs sm:text-base px-1 py-1 md:px-3 md:py-1 w-4/6 sm:w-full rounded-md focus:outline-none"
                                        type="text"
                                        name="outPercentage"
                                        value={values.outPercentage}
                                        onChange={handleChange}
                                    />
                                    :
                                    <h1 className="font-semibold text-xs sm:text-base">{formData.outPercentage}</h1>
                            }
                            <h1 className="text-gray-600 text-xs sm:text-base">%</h1>
                        </div>
                    </div>
                    <div className="flex flex-col lg:flex-row w-1/3 gap-x-2 text-center items-center">
                        <h1 className="text-gray-600 text-xs sm:text-base">Out Weight:</h1>
                        <div className="flex gap-x-1 md:gap-x-2 items-center justify-center">
                            {
                                ViewEdit ?
                                    <input
                                        className="text-xs sm:text-base px-1 py-1 md:px-3 md:py-1 w-4/6 sm:w-full rounded-md focus:outline-none"
                                        type="text"
                                        name="outWeight"
                                        value={values.outWeight}
                                        onChange={handleChange}
                                        disabled
                                    />
                                    :
                                    <h1 className="font-semibold text-xs sm:text-base">{formData.outWeight}</h1>
                            }
                            <h1 className="text-gray-600 text-xs sm:text-base">kg</h1>
                        </div>
                    </div>
                </div>

                <div className="m-2 border-t-2 border-brown pt-3 gap-y-2">
                    <div className="flex flex-row gap-x-1 md:gap-x-5 lg:gap-x-10 mb-1">
                        <div className="flex flex-col lg:flex-row w-1/3 text-center gap-x-2 items-center">
                            <h1 className="text-gray-600 text-xs sm:text-base">Net Weight:</h1>
                            <div className="flex gap-x-1 md:gap-x-2 items-center justify-center">
                                {
                                    ViewEdit ?
                                        <input
                                            className="text-xs sm:text-base px-1 py-1 md:px-3 md:py-1 w-4/6 sm:w-full rounded-md focus:outline-none"
                                            type="text"
                                            name="netWeight"
                                            value={values.netWeight}
                                            onChange={handleChange}
                                            disabled
                                        />
                                        :
                                        <h1 className="font-semibold text-xs sm:text-base">{formData.netWeight}</h1>
                                }
                                <h1 className="text-gray-600 text-xs sm:text-base">kg</h1>
                            </div>
                        </div>
                        <div className="flex flex-col lg:flex-row w-1/3 gap-x-2 items-center">
                            <h1 className="text-gray-600 text-xs sm:text-base">Price:</h1>
                            <div className=" flex gap-x-1 md:gap-x-2 items-center justify-center">
                                {
                                    ViewEdit ?
                                        <input
                                            className="text-xs sm:text-base px-1 py-1 md:px-3 md:py-1 w-4/6 sm:w-full rounded-md focus:outline-none"
                                            type="text"
                                            name="price"
                                            value={values.price}
                                            onChange={handleChange}
                                        />
                                        :
                                        <h1 className="font-semibold text-xs sm:text-base">{formData.price}</h1>
                                }
                                <h1 className="text-gray-600 text-xs sm:text-base">₹</h1>
                            </div>
                        </div>
                        <div className="flex flex-col lg:flex-row w-1/3 gap-x-2 items-center">
                            <h1 className="text-gray-600 text-xs sm:text-base">Less(%):</h1>
                            <div className=" flex gap-x-1 md:gap-x-2 items-center justify-center">
                                {
                                    ViewEdit ?
                                        <input
                                            className="text-xs sm:text-base px-1 py-1 md:px-3 md:py-1 w-4/6 sm:w-full rounded-md focus:outline-none"
                                            type="text"
                                            name="lessPercentage"
                                            value={values.lessPercentage}
                                            onChange={handleChange}
                                        />
                                        :
                                        <h1 className="font-semibold text-xs sm:text-base">{formData.lessPercentage}</h1>
                                }
                                <h1 className="text-gray-600 text-xs sm:text-base">%</h1>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-between flex-row gap-x-1 md:gap-x-5 lg:gap-x-10 mb-1 pb-3">
                        <div className="flex flex-col lg:flex-row w-1/3 gap-x-2 items-center">
                            <h1 className="text-gray-600 text-xs hidden sm:block sm:text-base">Total Amount:</h1>
                            <h1 className="text-gray-600 text-xs block sm:hidden sm:text-base">Total Amt:</h1>
                            <div className=" flex gap-x-1 md:gap-x-2 items-center justify-center">
                                {
                                    ViewEdit ?
                                        <input
                                            className="text-xs sm:text-base px-1 py-1 md:px-3 md:py-1 w-4/6 sm:w-full rounded-md focus:outline-none"
                                            type="text"
                                            name="totalAmount"
                                            value={values.totalAmount}
                                            onChange={handleChange}
                                            disabled
                                        />
                                        :
                                        <h1 className="font-semibold text-xs sm:text-base">{formData.totalAmount}</h1>
                                }
                                <h1 className="text-gray-600 text-xs sm:text-base">₹</h1>
                            </div>
                        </div>
                        <div className="flex flex-col lg:flex-row w-1/3 gap-x-2 items-center">
                            <h1 className="text-gray-600 text-xs sm:text-base">Brokerage:</h1>
                            <div className=" flex gap-x-1 md:gap-x-2 items-center justify-center">
                                {
                                    ViewEdit ?
                                        <input
                                            className="text-xs sm:text-base px-1 py-1 md:px-3 md:py-1 w-4/6 sm:w-full rounded-md focus:outline-none"
                                            type="text"
                                            name="brokerage"
                                            value={values.brokerage}

                                            onChange={handleChange}
                                        />
                                        :
                                        <h1 className="font-semibold text-xs sm:text-base">{formData.brokerage}</h1>
                                }
                                <h1 className="text-gray-600 text-xs sm:text-base">%</h1>
                            </div>
                        </div>
                        <div className="flex flex-col lg:flex-row w-1/3 gap-x-2 items-center">
                            <h1 className="text-gray-600 text-xs hidden sm:block sm:text-base">Brokerage Amt:</h1>
                            <h1 className="text-gray-600 text-xs block sm:hidden">Brok Amt:</h1>
                            <div className=" flex gap-x-1 md:gap-x-2 items-center justify-center">
                                {
                                    ViewEdit ?
                                        <input
                                            className="text-xs sm:text-base px-1 py-1 md:px-3 md:py-1 w-4/6 sm:w-full rounded-md focus:outline-none"
                                            type="text"
                                            name="brokerageAmt"
                                            value={values.brokerageAmt}
                                            onChange={handleChange}
                                            disabled
                                        />
                                        :
                                        <h1 className="font-semibold text-xs sm:text-base">{formData.brokerageAmt}</h1>
                                }
                                <h1 className="text-gray-600 text-xs sm:text-base">₹</h1>
                            </div>
                        </div>
                    </div>
                </div>

                {
                    ViewEdit ?
                        <div className="m-2 border-2 flex flex-col border-brown rounded-md p-3 gap-y-3 md:gap-y-6">
                            <div className="flex gap-x-2 w-full items-center">
                                <h1 className="text-gray-600 text-xs sm:text-base">Pending Amount:</h1>
                                <div className=" flex gap-x-1 sm:gap-x-2 items-center">
                                    <h1 className="font-semibold text-xs sm:text-base">{values.pendingAmount}</h1>
                                    <h1 className="text-gray-600 text-xs sm:text-base">₹</h1>
                                </div>
                            </div>
                            <div className="flex gap-x-2 justify-between items-center">
                                <div className="flex flex-col lg:flex-row gap-x-2 w-1/2 items-center justify-center">
                                    <h1 className="text-gray-600 text-xs sm:text-base">Paid Amount:</h1>
                                    <div className="flex gap-x-2 items-center justify-center">
                                        <input
                                            className="text-xs sm:text-base px-1 py-1 md:px-3 md:py-1 w-4/6 sm:w-full rounded-md focus:outline-none"
                                            type="number"
                                            name="paidAmount"
                                            value={values.paidAmount}
                                            onChange={handleChange}
                                        />
                                        <h1 className="text-gray-600">₹</h1>
                                    </div>
                                </div>
                                <div className="flex flex-col lg:flex-row gap-x-2 w-1/2 items-center justify-center">
                                    <h1 className="text-gray-600 text-xs sm:text-base">Paid Date:</h1>
                                    <input
                                        className="text-xs sm:text-base px-1 py-1 md:px-3 md:py-1 w-4/6 sm:w-full rounded-md focus:outline-none"
                                        type="date"
                                        name="paidDate"
                                        value={values.paidDate}
                                        min={values.sellingDate}
                                        max={values.dueDate}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                            <div className="flex flex-col gap-x-2">
                                <h1 className="text-gray-600 text-xs sm:text-base">Payment Details:</h1>
                                <div className="flex flex-col gap-y-2 p-3 bg-slate-50 max-h-40 overflow-y-scroll rounded-md">
                                    {
                                        values.paymentRemarks.length > 0 &&
                                        values.paymentRemarks.map((ele, ind) => {
                                            return <div key={ind} className="flex gap-x-1 sm:gap-x-2 justify-between">
                                                <h1 className="text-xs sm:text-base">({ind + 1}) Date: {ele.Date}, Paid Amount: {ele.PaidAmount} {ele.fullpaymentDone ? `(Full Payment)` : ``}</h1>
                                                <FaTrash className="cursor-pointer opacity-70" onClick={() => DeletePaymentEntry(ind)} />
                                            </div>
                                        })
                                    }
                                </div>
                            </div>
                            <div className="flex gap-x-2 items-center">
                                <input
                                    className="px-3 py-1 rounded-md focus:outline-none"
                                    id="fullpaymentDoneCheckBox"
                                    type="checkbox"
                                    name="fullpaymentDone"
                                    checked={values.fullpaymentDone}
                                    onChange={checkBoxHandler}
                                />
                                <h1 className="text-gray-600">Full Payment Done</h1>
                            </div>
                        </div>
                        :
                        <></>
                }

                {
                    ViewEdit ?
                        <div className="m-2 mt-4 flex gap-x-6 cursor-pointer">
                            <div className="px-2 py-2 rounded-lg text-common text-xl tracking-wider text-center bg-blue w-1/4" onClick={SaveEdit}>Save</div>
                            <div className="px-2 py-2 rounded-lg text-common text-xl tracking-wider text-center bg-blue w-1/4" onClick={CancelEdit}>Cancel</div>
                        </div>
                        :
                        <></>
                }
            </div>
        </div >
    );
};

export default Card;