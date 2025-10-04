import React, { useState } from "react";
import useAppContext from "../../../context/useAppContext";

function ExpireList({ items, onRevomeHandler, onEditHandler, searData,recordPages }) {
  const { editMedodalOpen, expireMedicine } = useAppContext();
 
  const itemarra = recordPages || [];
  
  return (
    <div
      className="tabel shadow-lg  max-h-[20rem] rounded-lg
    overflow-y-auto overflow-x-auto scrollbar scrollbar-thumb-cyan-900 scrollbar-track-cyan-200
    
    "
    >
      <table className="  w-full bg-cyan-200 rounded-xl text-left">
        <thead className="bg-cyan-300">
          <tr className="">
            <th className=" py-2 px-4 ">Name</th>
            <th className=" py-2 px-4 ">Quantity</th>
            <th className=" py-2 px-4 ">Expire Date</th>
            <th className=" py-2 px-4 ">Manuefacture</th>
            {/* <th className=" py-2 px-4 "></th> */}
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
                .map((item) => {
                  return (
                    <tr className="tr" key={item.id}>
                      <td className=" py-2 px-4  ">{item.name}</td>
                      <td className=" py-2 px-4  ">{item.qauntity}</td>
                      <td className=" py-2 px-4  ">{item.expireDate}</td>
                      <td className=" py-2 px-4  ">{item.manuefacture}</td>
                      {/* <td className=" flex justify-around  py-2 px-4  text-right ">
                        <button
                          className="cursor-pointer "
                          onClick={editHandler.bind(null, item.id)}
                        >
                          <EditSvg />
                        </button>
                        <button
                          className="cursor-pointer"
                          onClick={removeHandler.bind(null, item.id)}
                        >
                          <Delete />
                        </button>
                      </td> */}
                    </tr>
                  );
                })
            :(
              <tr>
                <td colSpan="5" className="text-center py-4 text-gray-500 italic">
                  No Expire found
                </td>
              </tr>
            )}
        </tbody>
      </table>
    
     
    </div>
  );
}

export default ExpireList;
