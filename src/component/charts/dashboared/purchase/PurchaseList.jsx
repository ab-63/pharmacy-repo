import React from "react";
import useAppContext from "../../../../context/useAppContext";

function PurchaseList({ items = [], searData = "" }) {
  const { editMedodalOpen } = useAppContext();

  // Filter items by search term (case-insensitive)
  const filteredItems = items.filter((item) =>
    searData ? item.name.toLowerCase().includes(searData.toLowerCase()) : true
  );

  return (
    <div
      className="overflow-scroll max-h-[28rem] shadow-md rounded-lg
      overflow-y-auto overflow-x-auto scrollbar scrollbar-thumb-cyan-900 scrollbar-track-cyan-100
      tabel"
    >
      <table className="w-full bg-cyan-100 rounded-xl">
        <thead className="bg-cyan-300 text-left">
          <tr>
            <th className="py-2 px-4">Name</th>
            <th className="py-2 px-4">Quantity</th>
            <th className="py-2 px-4">Date</th>
            <th className="py-2 px-4">Price</th>
            <th className="py-2 px-4">Total Price</th>
          </tr>
        </thead>
        <tbody>
          {filteredItems.length > 0 ? (
            filteredItems.map((item,i) => (
              <tr key={i} className="tr">
                <td className="py-2 px-4">{item.name}</td>
                <td className="py-2 px-4">{item.quantity}</td>
                <td className="py-2 px-4">{item.date}</td>
                <td className="py-2 px-4">${item.price}</td>
                <td className="py-2 px-4">
                  ${item.totalAmount ?? item.price * item.quantity}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan="5"
                className="text-center py-4 text-gray-500 italic"
              >
                No purchases found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default PurchaseList;
