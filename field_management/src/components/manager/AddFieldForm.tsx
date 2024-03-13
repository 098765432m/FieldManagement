"use client";

import React, { useState, FormEvent } from "react";
import fieldServices from "@/services/field.services";
import { sports, formSport } from "@/types/interfaces/sport";

const AddFieldForm = () => {
  const [fieldName, setFieldName] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [duong, setDuong] = useState<string>("");
  const [phuong, setPhuong] = useState<string>("");
  const [quan, setQuan] = useState<string>("");
  const [sport, setSport] = useState<string>(sports.soccer.id);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();

      const formDataObject: formSport = {
        fieldName: fieldName,
        duong: duong,
        phoneNumber: phoneNumber,
        email: email,
        phuong: phuong,
        quan: quan,
        sport: sport,
      };

      await fieldServices.addField(formDataObject);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex h-screen items-center justify-center">
      <form
        className="w-120 rounded-lg bg-gray-100 p-6"
        onSubmit={handleSubmit}
      >
        <h2 className="mb-6 text-2xl font-semibold">Sân </h2>
        <div className="mb-4">
          <label htmlFor="fieldName" className="block text-gray-700">
            fieldName
          </label>
          <input
            type="text"
            id="fieldName"
            className="mt-1 w-full rounded-md bg-gray-200 px-3 py-2 text-gray-700 focus:outline-none focus:ring focus:ring-blue-200"
            placeholder="Enter your Field name"
            value={fieldName}
            onChange={(e) => setFieldName(e.target.value)}
            required
          />
        </div>
        <div className="mb-4 flex space-x-4">
          <select
            onChange={(e) => setPhuong(e.target.value)}
            className="w-36 rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
          >
            <option value="0">Phường</option>
            <option value="option2">Option 2</option>
            <option value="option3">Option 3</option>
          </select>
          <select
            onChange={(e) => setQuan(e.target.value)}
            className="w-36 rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
          >
            <option value="0">Quận</option>
            <option value="option2">Option 2</option>
            <option value="option3">Option 3</option>
          </select>
          <input
            type="text"
            className="w-60 rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
            placeholder="Đường"
            value={duong}
            onChange={(e) => setDuong(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="phoneNumber" className="block text-gray-700">
            PhoneNumber
          </label>
          <input
            type="text"
            id="phoneNumber"
            className="mt-1 w-full rounded-md bg-gray-200 px-3 py-2 text-gray-700 focus:outline-none focus:ring focus:ring-blue-200"
            placeholder="Enter your phoneNumber"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700">
            Email
          </label>
          <input
            type="text"
            id="email"
            className="mt-1 w-full rounded-md bg-gray-200 px-3 py-2 text-gray-700 focus:outline-none focus:ring focus:ring-blue-200"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="mb-2 block">Chọn môn thể thao</label>
          {Object.entries(sports).map(([sportName, sportInfo], index) => (
            <div key={index}>
              <input
                type="radio"
                id="sport"
                name="sport"
                value={sportInfo.id}
                onChange={(e) => setSport(e.target.value)}
                defaultChecked={sportName === "soccer"}
              />
              <label htmlFor={sportName}>{sportInfo.name}</label>
            </div>
          ))}
        </div>
        <button
          type="submit"
          className="w-full rounded-md bg-blue-500 py-2 text-white hover:bg-blue-600 focus:bg-blue-600 focus:outline-none"
        >
          submit
        </button>
      </form>
      <h1>{sport}</h1>
    </div>
  );
};

export default AddFieldForm;
