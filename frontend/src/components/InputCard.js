"use client"

import { CheckCardInput } from "@/utils/Validation";
import useUpdate from "@/utils/useUpdate";
import { useEffect, useState } from "react";
import { FaTimes } from 'react-icons/fa';

const InputCard = ({ setInputCard }) => {

    const { values, handleChange } = useUpdate({
        seller: "",
        buyer: "",
        sellingDate: "",
        dueDate: "",
        dueDay: "",
        weight: "",
        outPercentage: "",
        outWeight: "",
        netWeight: "",
        price: "",
        lessPercentage: 0,
        totalAmount: "",
        brokerage: "",
        brokerageAmt: "",
        pendingAmount: "",
        paidDate: "",
        paidAmount: "",
        paymentRemarks: "",
        fullpaymentDone: "",
    });

    const SaveEdit = () => {
        const validationResponse = CheckCardInput(values);
        if (validationResponse === "Success") {
            // SaveCard Axios Request
            // setInputCard(false);
        }
        alert(validationResponse)
    }

    useEffect(() => {
        if (values.sellingDate.length > 0 && values.dueDate.length > 0) {
            const startDate = new Date(values.sellingDate);
            const endDate = new Date(values.dueDate);

            const differenceInMillis = endDate - startDate;
            const dd = differenceInMillis / (1000 * 60 * 60 * 24);
            handleChange({ target: { name: "dueDay", value: dd } });
        }
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
            <div className="rounded-lg bg-popup shadow-md py-6 px-4">
                <div className="flex mb-8 justify-between items-center">
                    <h2 className="text-3xl font-bold font-heading text-blue tracking-wider">Input Card</h2>
                    <div className="cursor-pointer" onClick={() => setInputCard(false)}>
                        <FaTimes className="w-5 h-5 opacity-60" />
                    </div>
                </div>
                <div className="m-2 flex justify-between">
                    <div className="flex flex-col justify-between gap-y-2">
                        <div className="flex gap-x-2">
                            <h1 className="text-gray-600">Seller:</h1>
                            <input
                                className="px-3 py-1 rounded-md focus:outline-none"
                                type="text"
                                name="seller"
                                value={values.seller}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="flex gap-x-2">
                            <h1 className="text-gray-600">Buyer:</h1>
                            <input
                                className="px-3 py-1 rounded-md focus:outline-none"
                                type="text"
                                name="buyer"
                                value={values.buyer}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                </div>

                <div className="m-2 flex justify-between border-t-2 border-brown pt-3 gap-y-2 gap-x-10">
                    <div className="flex w-1/3 items-center">
                        <h1 className="text-gray-600 w-1/2">Selling Date:</h1>
                        <input
                            className="px-3 py-1 w-1/2 rounded-md focus:outline-none"
                            type="date"
                            name="sellingDate"
                            value={values.sellingDate}
                            max={values.dueDate}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="flex w-1/3 gap-x-2 items-center">
                        <h1 className="text-gray-600 w-1/2">Due Date:</h1>
                        <input
                            className="px-3 py-1 w-1/2 rounded-md focus:outline-none"
                            type="date"
                            name="dueDate"
                            value={values.dueDate}
                            min={values.sellingDate}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="flex w-1/3 gap-x-2 items-center">
                        <h1 className="text-gray-600 w-1/2">Due Day:</h1>
                        <input
                            className="px-3 py-1 w-1/2 rounded-md focus:outline-none"
                            type="number"
                            name="dueDay"
                            value={values.dueDay}
                            onChange={handleChange}
                            disabled
                        />
                    </div>
                </div>

                <div className="m-2 flex justify-between border-t-2 border-brown pt-3 gap-y-2 gap-x-10">
                    <div className="flex w-1/3 gap-x-2 items-center">
                        <h1 className="text-gray-600 w-1/2">Weight:</h1>
                        <div className="w-1/2 flex gap-x-2 items-center">
                            <input
                                className="px-3 py-1 w-full rounded-md focus:outline-none"
                                type="number"
                                name="weight"
                                value={values.weight}
                                onChange={handleChange}
                            />
                            <h1 className="text-gray-600">kg</h1>
                        </div>
                    </div>
                    <div className="flex w-1/3 gap-x-2 items-center">
                        <h1 className="text-gray-600 w-1/2">Out(%):</h1>
                        <div className="w-1/2 flex gap-x-2 items-center">
                            <input
                                className="px-3 py-1 w-full rounded-md focus:outline-none"
                                type="number"
                                name="outPercentage"
                                value={values.outPercentage}
                                onChange={handleChange}
                            />
                            <h1 className="text-gray-600">%</h1>
                        </div>
                    </div>
                    <div className="flex w-1/3 gap-x-2 items-center">
                        <h1 className="text-gray-600 w-1/2">Out Weight:</h1>
                        <div className="w-1/2 flex gap-x-2 items-center">
                            <input
                                className="px-3 py-1 w-full rounded-md focus:outline-none"
                                type="number"
                                name="outWeight"
                                value={values.outWeight}
                                onChange={handleChange}
                                disabled
                            />
                            <h1 className="text-gray-600">kg</h1>
                        </div>
                    </div>
                </div>

                <div className="m-2 border-t-2 border-brown pt-3 gap-y-2">
                    <div className="flex justify-between flex-row gap-x-10 mb-1">
                        <div className="flex w-1/3 gap-x-2  items-center">
                            <h1 className="text-gray-600 w-1/2">Net Weight:</h1>
                            <div className="w-1/2 flex gap-x-2 items-center">
                                <input
                                    className="px-3 py-1 w-full rounded-md focus:outline-none"
                                    type="number"
                                    name="netWeight"
                                    value={values.netWeight}
                                    onChange={handleChange}
                                    disabled
                                />
                                <h1 className="text-gray-600">kg</h1>
                            </div>
                        </div>
                        <div className="flex w-1/3 gap-x-2 items-center">
                            <h1 className="text-gray-600 w-1/2">Price:</h1>
                            <div className="w-1/2 flex gap-x-2 items-center">
                                <input
                                    className="px-3 py-1 w-full rounded-md focus:outline-none"
                                    type="number"
                                    name="price"
                                    value={values.price}
                                    onChange={handleChange}
                                    max={100}
                                    min={0}
                                />
                                <h1 className="text-gray-600">₹</h1>
                            </div>
                        </div>
                        <div className="flex w-1/3 gap-x-2 items-center">
                            <h1 className="text-gray-600 w-1/2">Less(%):</h1>
                            <div className="w-1/2 flex gap-x-2 items-center">
                                <input
                                    className="px-3 py-1 w-full rounded-md focus:outline-none"
                                    type="number"
                                    name="lessPercentage"
                                    value={values.lessPercentage}
                                    onChange={handleChange}
                                    max={100}
                                    min={0}
                                />
                                <h1 className="text-gray-600">%</h1>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-between flex-row gap-x-10 mb-1 pb-3">
                        <div className="flex w-1/3 gap-x-2 items-center">
                            <h1 className="text-gray-600 w-1/2">Total Amount:</h1>
                            <div className="w-1/2 flex gap-x-2 items-center">
                                <input
                                    className="px-3 py-1 w-full rounded-md focus:outline-none"
                                    type="number"
                                    name="totalAmount"
                                    value={values.totalAmount}
                                    onChange={handleChange}
                                    disabled
                                />
                                <h1 className="text-gray-600">₹</h1>
                            </div>
                        </div>
                        <div className="flex w-1/3 gap-x-2 items-center">
                            <h1 className="text-gray-600 w-1/2">Brokerage:</h1>
                            <div className="w-1/2 flex gap-x-2 items-center">
                                <input
                                    className="px-3 py-1 w-full rounded-md focus:outline-none"
                                    type="number"
                                    name="brokerage"
                                    value={values.brokerage}
                                    onChange={handleChange}
                                />
                                <h1 className="text-gray-600">%</h1>
                            </div>
                        </div>
                        <div className="flex w-1/3 gap-x-2 items-center">
                            <h1 className="text-gray-600 w-1/2">Brokerage Amt:</h1>
                            <div className="w-1/2 flex gap-x-2 items-center">
                                <input
                                    className="px-3 w-full py-1 rounded-md focus:outline-none"
                                    type="number"
                                    name="brokerageAmt"
                                    value={values.brokerageAmt}
                                    onChange={handleChange}
                                    disabled
                                />
                                <h1 className="text-gray-600">₹</h1>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="m-2 mt-4 flex gap-x-6 cursor-pointer">
                    <div className="px-2 py-2 rounded-lg text-common text-xl tracking-wider text-center bg-blue w-1/4" onClick={SaveEdit}>Save</div>
                    <div className="px-2 py-2 rounded-lg text-common text-xl tracking-wider text-center bg-blue w-1/4" onClick={() => setInputCard(false)}>Cancel</div>
                </div>
            </div>
        </div>
    );
};

export default InputCard;