import React from "react";
import BoxSvg from "../BoxSvg";
import CharSvg from "../CharSvg";
import MacroChart from "../MacroChart";
// import { Chart } from "../charts/Chart";
import PolarBarChart from "../PolarChart";
import ExpireList from "./ExpireList";
import useAppContext from "../../../context/useAppContext";

function Stocks(props) {
  const {
    totalAmount,
    allTypesAmount,
    totalSale,
    totalPurchase,
    saleData,
    setIsExpire,
  } = useAppContext();

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
              <div className="text-4xl font-semibold">{totalAmount}</div>
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
              <div className="text-4xl font-semibold">{allTypesAmount}</div>
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
              <div className="text-4xl font-semibold">${totalSale}</div>
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
              <div className="text-4xl font-semibold">${totalPurchase}</div>
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
     
     <div className="bg-cyan-200 shadow-xl p-4 col-start-1 lg:col-start-1 mr-2   lg:col-span-2 rounded-2xl">
        <h3 className="text-2xl font-semibold mb-6 =">Total Expire Medicine</h3>

        <ExpireList />
      </div> 
      <div className="bg-cyan-200 shadow-xl p-4 col-start-1  lg:col-start-3 lg:col-span-5   rounded-2xl">
        <h3 className="text-2xl font-semibold">Total Sales Overview</h3>

        <MacroChart saleData={saleData} />
      </div>

    </div>
  );
}

export default Stocks;
