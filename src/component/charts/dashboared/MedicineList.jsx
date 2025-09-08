import React from "react";
import Delete from "../Delete";
import EditSvg from "../EditSvg";
import useAppContext from "../../../context/useAppContext";
import "./Alltabels.css"
function MedicineList({ items, onRevomeHandler, onEditHandler, searData }) {
  const itemarra = items || [];
  const { editMedodalOpen } = useAppContext();
  const removeHandler = (id) => {
    onRevomeHandler(id);
  };

  const editHandler = (id) => {
    onEditHandler(id);
    editMedodalOpen();
  };

  return (
    <div
      className="overflow-scroll max-h-[32rem] shadow-md rounded-lg
    overflow-y-auto overflow-x-auto scrollbar scrollbar-thumb-cyan-900 scrollbar-track-cyan-100
    tabel
    "

    >
      <table className=" w-full bg-cyan-100 rounded-xl">
        <thead className="bg-cyan-300">
          <tr className="text-left">
            <th className=" py-2 px-4  border-cyan-200">Name</th>
            <th className=" py-2 px-4  border-cyan-200">Quantity</th>
            <th className=" py-2 px-4  border-cyan-200">Expire Date</th>
            <th className=" py-2 px-4  border-cyan-200">
              Manuefacture
            </th>
            <th className=" py-2 px-4  border-cyan-200"></th>
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
                      <td className=" py-2 px-4  border-cyan-200 ">
                        {item.name}
                      </td>
                      <td className=" py-2 px-4  border-cyan-200 ">
                        {item.qauntity}
                      </td>
                      <td className=" py-2 px-4  border-cyan-200 ">
                        {item.expireDate}
                      </td>
                      <td className=" py-2 px-4  border-cyan-200 ">
                        {item.manuefacture}
                      </td>
                      <td className=" flex justify-around  py-2 px-4  border-cyan-200 text-right ">
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
                      </td>
                    </tr>
                  );
                })
            : []}
        </tbody>
      </table>
    </div>
  );
}

export default MedicineList;
