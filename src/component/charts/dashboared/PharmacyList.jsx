import React, { useState } from "react";
import Delete from "../Delete";
import EditSvg from "../EditSvg";

import useAppContext from "../../../context/useAppContext";

function PharmacyList({ items, searData,onEditHandler,onDeleteHandler }) {
  const { pharmacyState, setPharmacyState, setPharmacyModal } = useAppContext();
  const itemarra = items || [];

  const editHandler = (id) => {
    onEditHandler(id)
  };
  const deleteHandler = (id) => {
    onDeleteHandler(id)
  };

  return (
    <div
      className="overflow-scroll max-h-[28rem] shadow-md rounded-lg
  overflow-y-auto overflow-x-auto scrollbar scrollbar-thumb-cyan-900 scrollbar-track-cyan-100
  tabel
  "
    >
      <table className=" w-full bg-cyan-100 rounded-xl">
        <thead className="bg-cyan-300 text-left">
          <tr className="">
            <th className=" py-2 px-4 ">Name</th>
            <th className=" py-2 px-4 ">Quantity</th>
            <th className=" py-2 px-4 ">Min Level</th>
            <th className=" py-2 px-4 "> Expire Date</th>
            <th className=" py-2 px-4 "> Expire Duration</th>
            <th className=" py-2 px-4 ">Price</th>
            <th className=" py-2 px-4 "></th>
          </tr>
        </thead>
        <tbody className="">
          {itemarra.length > 0
            ? itemarra
                .filter((search) =>
                  !searData
                    ? search
                    : search.name.toLowerCase().includes(searData.toLowerCase())
                )
                .map((item, i) => {
                  return (
                    <tr className="tr" key={i}>
                      <td className=" py-2 px-4  ">{item.name}</td>
                      <td className=" py-2 px-4  ">{item.quantity}</td>
                      <td className=" py-2 px-4  ">{item.lowStock}</td>
                      <td className=" py-2 px-4  ">{item.date}</td>
                      <td className=" py-2 px-4  ">{item.expireDuration}</td>
                      <td className=" py-2 px-4  ">${item.price}</td>
                      <td className="flex space-x-2 py-2 px-4 justify-end">
                        <button
                          className="cursor-pointer"
                          onClick={editHandler.bind(null, item.id)}
                        >
                          <EditSvg />
                        </button>
                        <button
                          className="cursor-pointer"
                          onClick={deleteHandler.bind(null, item.id)}
                        >
                          <Delete />
                        </button>
                      </td>
                      {/* <td className=" flex justify-end  py-1 px-4  text-right ">

                      </td> */}
                    </tr>
                  );
                })
            : (
              <tr>
                <td colSpan="5" className="text-center py-4 text-gray-500 italic">
                  No Pahrmacy Medicine found
                </td>
              </tr>
            )}
        </tbody>
      </table>
    </div>
  );
}

export default PharmacyList;
