"use client"
import React, { useState } from 'react';

const UpdateCard = () => {
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    seller: 'John Doe',
    buyer: 'Jane Smisssssssss',
    sellingDate: 'June 18, 2023',
    dueDate: 'June 23, 2023',
    dueDay: '5',
    weight: '10 kg',
    outPercentage: '5%',
    outWeight: '0.5 kg',
    netWeight: '9.5 kg',
    price: '$10/kg',
    lessPercentage: '2%',
    totalAmount: '$95',
    brokerage: '2%',
    brokerageAmt: '$1.9',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleToggleEditMode = () => {
    setEditMode(!editMode);
  };

  return (
    <div className="rounded-lg shadow-md py-3 px-4 bg-common form-input">
      <div className="m-2 flex flex-col justify-between">
        <div className="flex gap-x-2">
          <h1 className="text-gray-600">Seller:</h1>
          <input
            type="text"
            name="seller"
            value={formData.seller}
            onChange={handleInputChange}
          />
        </div>
        <div className="flex gap-x-2">
          <h1 className="text-gray-600">Buyer:</h1>
          <input
            type="text"
            name="buyer"
            value={formData.buyer}
            onChange={handleInputChange}
          />
        </div>
      </div>

      <div className="m-2 border-t-2 border-brown pt-3">
        <div className="flex justify-between flex-row mb-1">
          <div className="flex w-1/3 gap-x-2">
            <h1 className="text-gray-600">Net Weight:</h1>
            <input
              type="text"
              name="netWeight"
              value={formData.netWeight}
              onChange={handleInputChange}
            />
          </div>
          <div className="flex w-1/3 gap-x-2">
            <h1 className="text-gray-600">Price:</h1>
            <input
              type="text"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
            />
          </div>
          <div className="flex w-1/3 gap-x-2">
            <h1 className="text-gray-600">Less(%):</h1>
            <input
              type="text"
              name="lessPercentage"
              value={formData.lessPercentage}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="flex justify-between flex-row">
          <div className="flex w-1/3 gap-x-2">
            <h1 className="text-gray-600">Total Amount:</h1>
            <input
              type="text"
              name="totalAmount"
              value={formData.totalAmount}
              onChange={handleInputChange}
            />
          </div>
          <div className="flex w-1/3 gap-x-2">
            <h1 className="text-gray-600">Brokerage:</h1>
            <input
              type="text"
              name="brokerage"
              value={formData.brokerage}
              onChange={handleInputChange}
            />
          </div>
          <div className="flex w-1/3 gap-x-2">
            <h1 className="text-gray-600">Brokerage Amt:</h1>
            <input
              type="text"
              name="brokerageAmt"
              value={formData.brokerageAmt}
              onChange={handleInputChange}
            />
          </div>
        </div>
      </div>
      <button
        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 mt-4"
        onClick={handleToggleEditMode}
      >
        {editMode ? 'Save' : 'Edit'}
      </button>
    </div>
  );
};

export default UpdateCard;
