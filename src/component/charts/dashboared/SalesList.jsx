import React from "react";

// import useAppContext from "../../../context/useAppContext";

function SalesList({ items, onSaleHandler, searData }) {
  const itemarra = items || [];
 

  return (
    <div
    className="overflow-scroll max-h-[28rem] shadow-md rounded-lg
  overflow-y-auto overflow-x-auto scrollbar scrollbar-thumb-cyan-900 scrollbar-track-cyan-100
  tabel
  ">
      <table className=" w-full bg-cyan-100 rounded-xl">
        <thead className="bg-cyan-300 text-left">
          <tr className="">
            <th className=" py-2 px-4 ">Name</th>
            <th className=" py-2 px-4 ">Quantity</th>
            <th className=" py-2 px-4 "> Date</th>
            <th className=" py-2 px-4 ">Price</th>
            <th className=" py-2 px-4 ">
              Total Prrice
            </th>
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
                .map((item,i) => {
                  return (
                    <tr className="tr" key={i}>
                      <td className=" py-2 px-4  ">
                        {item.name}
                      </td>
                      <td className=" py-2 px-4  ">
                        {item.quantity}
                      </td>
                      <td className=" py-2 px-4  ">
                        {item.date}
                      </td>
                      <td className=" py-2 px-4  ">
                        ${item.price}
                      </td>
                      <td className=" py-2 px-4  ">
                        ${item.totalAmount}
                      </td>
                      {/* <td className=" flex justify-end  py-1 px-4  text-right ">

                      </td> */}
                    </tr>
                  );
                })
            : (
              <tr>
                <td colSpan="5" className="text-center py-4 text-gray-500 italic">
                  No Sales found
                </td>
              </tr>
            )}
        </tbody>
      </table>
    </div>
  );
}

export default SalesList;
