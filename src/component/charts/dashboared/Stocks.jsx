import React, { useState } from "react";
import BoxSvg from "../BoxSvg";
import CharSvg from "../CharSvg";
import MacroChart from "../MacroChart";
// import { Chart } from "../charts/Chart";
import PolarBarChart from "../PolarChart";
import ExpireList from "./ExpireList";
import useAppContext from "../../../context/useAppContext";
import Pagination from "./Pagination";
import LowStockInvetory from "./LowStockInvetory";
import LowStockPharmacy from "./LowStockPharmacy";
import PharmacyExpireList from "./PharmacyExpireList";

const item = [];
const initialState = () => {
  const data = localStorage.getItem("InventoryLowStock");

  try {
    return data ? JSON.parse(data) : item;
  } catch (err) {
    console.error(err, "InventoryLowStock");
    return item;
  }
};

function Stocks(props) {
  const [inventoryLowStock, setInventoryLowStock] = useState(()=>initialState());

  const {
    totalAmount,
    allTypesAmount,
    totalSale,
    totalPurchase,
    saleData,
    setIsExpire,
    expireMedicine,
    expiredMedicines
  } = useAppContext();
  const [currPage, setCurrPage] = useState(1);
  const [filtered, setFiltered] = useState(5);

  const lastIndex = currPage * filtered;
  const firstIndex = lastIndex - filtered;
  const recordPages = expiredMedicines.slice(firstIndex, lastIndex);
  const npages = Math.ceil(expiredMedicines.length / filtered);
  const numberPages = [...Array(npages).keys()].map((i) => i + 1);
  const onExpireHandler = () => {
    setIsExpire(false);
  };
  return (
    <div className="grid grid-cols-1  lg:grid-cols-5 gap-y-2 pb-6">
      <div className="bg-cyan-200 p-6 rounded-2xl col-span-5 shadow-xl">
        <h3 className="mb-6 text-2xl font-semibold ">Pharmacy Sales Results</h3>
        <div
          className="grid md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4
         gap-2 "
        >
          <div className="bg-lime-200 p-6 rounded-lg">
            <div className="">
              <BoxSvg />
              <p className="text-lg text-lime-600">Total Amount</p>
            </div>
            <div className="flex justify-between space-x-4 items-center">
              <div className="text-4xl font-semibold">{totalAmount||0}</div>
              <CharSvg />
            </div>
            <p className="text-lime-600">
              <span className="text-lime-950 ">+2.5%</span> This Month
            </p>
          </div>
          <div className="bg-cyan-300 p-6 rounded-lg">
            <div className="">
              <BoxSvg />
              <p className="text-lg text-cyan-600">All Types</p>
            </div>
            <div className="flex justify-between space-x-4 items-center">
              <div className="text-4xl font-semibold">{allTypesAmount||0}</div>
              <CharSvg />
            </div>
            <p className="text-cyan-600">
              <span className="text-cyan-950 ">+2.5%</span> This Month
            </p>
          </div>
          <div className="bg-rose-200 p-6 rounded-lg">
            <div className="">
              <BoxSvg />
              <p className="text-lg text-rose-600">Total Sales</p>
            </div>
            <div className="flex justify-between space-x-4 items-center">
              <div className="text-4xl font-semibold">${totalSale||0}</div>
              <CharSvg />
            </div>
            <p className="text-rose-600">
              <span className="text-rose-950 ">+2.5%</span> This Month
            </p>
          </div>
          <div className="bg-blue-200 p-6 rounded-lg">
            <div className="">
              <BoxSvg />
              <p className="text-lg text-blue-600">Today Purchase</p>
            </div>
            <div className="flex justify-between space-x-4 items-center">
              <div className="text-4xl font-semibold">${totalPurchase||0}</div>
              <CharSvg />
            </div>
            <p className="text-blue-600">
              <span className="text-blue-950 ">+2.5%</span> This Month
            </p>
          </div>
        </div>
      </div>
      {/* <div className="bg-cyan-200 shadow-xl p-4 col-start-1 lg:col-start-1 mr-2   lg:col-span-2 rounded-2xl">
        <h3 className="text-2xl font-semibold">Graph Overview</h3>
        <PolarBarChart saleData={saleData} />
      </div> */}

      <div className="bg-cyan-200 shadow-xl p-4 col-start-1 lg:col-start-1 mr-2   lg:col-span-2 rounded-2xl flex flex-col h-96">
        <div className="">
          <h3 className="text-2xl font-semibold mb-6 =">
            Total Expire Medicine
          </h3>

          <ExpireList recordPages={recordPages} />
        </div>
        <div className="flex justify-between items-center">
  <p className="text-md">You see <span className="font-semibold">  {firstIndex+1} </span> to <span className="font-semibold"> 
  {lastIndex}</span> result of <span className="font-semibold"> {filtered}</span></p>          <Pagination
            currPage={currPage}
            filtered={filtered}
            setFiltered={setFiltered}
            setCurrPage={setCurrPage}
            numberPages={numberPages}
            npages={npages}
          />
        </div>
      </div>
      <div className="bg-cyan-200 shadow-xl p-4 col-start-1  lg:col-start-3 lg:col-span-5   rounded-2xl">
        <h3 className="text-2xl font-semibold">Total Sales Overview</h3>

        <MacroChart saleData={saleData} />
      </div>
      <div className="bg-cyan-200 shadow-xl
       p-4 col-start-1 lg:col-start-1 mr-2  
        lg:col-span-2 rounded-2xl flex flex-col
        ">
        <div className="">
          <h3 className="text-2xl font-semibold mb-6 =">
            Low Stock Pharmacy
          </h3>

          <LowStockPharmacy/>
        </div>
       
      </div>
      <div className="bg-cyan-200 shadow-xl
       p-4 col-start-1 lg:col-start-3 mr-2  
        lg:col-span-4 rounded-2xl flex flex-col
        ">
        <div className="">
          <h3 className="text-2xl font-semibold mb-6 =">
            Low Stock Inventory
          </h3>

          <LowStockInvetory />
        </div>
       
      </div>
      <div className="bg-cyan-200 shadow-xl
       p-4 col-start-1 lg:col-start-3 mr-2  
        lg:col-span-4 rounded-2xl flex flex-col
        ">
        <div className="">
          <h3 className="text-2xl font-semibold mb-6 =">
        Pharmacy Expire List
          </h3>

        <PharmacyExpireList/>
        </div>
       
      </div>
      
    </div>
  );
}

export default Stocks;
