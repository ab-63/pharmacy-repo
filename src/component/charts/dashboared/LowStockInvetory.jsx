import React, { useEffect, useState } from "react";
import useAppContext from "../../../context/useAppContext";
import Pagination from "./Pagination";

function LowStockInventory({ searData }) {
  const { allMedicines } = useAppContext();

  const [currPage, setCurrPage] = useState(1);
  const [filtered, setFiltered] = useState(5);

  const lowstock = allMedicines.filter(
    (amount) => amount.qauntity <= amount.lowStock
  );
  console.log(lowstock);
  const lastIndex = currPage * filtered;
  const firstIndex = lastIndex - filtered;
  const recordPages = lowstock.slice(firstIndex, lastIndex);
  const npages = Math.ceil(lowstock.length / filtered);
  const numberPages = [...Array(npages).keys()].map((i) => i + 1);

  const itemarra = recordPages || [];

  return (
    <div className="h-78 flex flex-col">
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
              <th className=" py-2 px-4 ">Min Level</th>
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
                      : search.name
                          .toLowerCase()
                          .includes(searData.toLowerCase())
                  )
                  .map((item) => {
                    return (
                      <tr className="tr" key={item.id}>
                        <td className=" py-2 px-4  ">{item.name}</td>
                        <td className=" py-2 px-4  ">{item.qauntity}</td>
                        <td className=" py-2 px-4  ">{item.lowStock}</td>
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
              : (
                <tr>
                  <td colSpan="5" className="text-center py-4 text-gray-500 italic">
                    No purchases found
                  </td>
                </tr>
              )}
          </tbody>
        </table>
      </div>
      <div className="flex justify-between items-center">
        <p className="text-md">
          You see <span className="font-semibold"> {firstIndex + 1} </span> to{" "}
          <span className="font-semibold">{lastIndex}</span> result of{" "}
          <span className="font-semibold"> {filtered}</span>
        </p>
        <Pagination
          currPage={currPage}
          filtered={filtered}
          setFiltered={setFiltered}
          setCurrPage={setCurrPage}
          numberPages={numberPages}
          npages={npages}
        />
      </div>
    </div>
  );
}

export default LowStockInventory;
