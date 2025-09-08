import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import SideBar from "./SideBar";
import Stocks from "./Stocks";
import useAppContext from "../../../context/useAppContext";

function Dashboared(props) {
  const { expireMedicine } = useAppContext();
  return (
    <div className="bg-cyan-200 min-h-screen">
      <div className="bg-cyan-200  min-h-screen">
        <div className="min-h-screen  grid grid-cols-[220px_auto_auto_auto_auto]  grid-rows-[100px_1fr_1fr_1fr]  bg-cyan-200 rounded-2xl">
          <div className=" col-span-6 row-start-1 mb-2 rounded-lg bg-cyan-200 shadow-lg  p-4 flex items-center rounded-tr-2xl ">
            <h1 className="text-4xl font-bold z-50">Welcome to Pharmacy</h1>
          </div>
          <div
            className="rounded-tl-2xl p-4 rounded-bl-2xl  
          row-start-1 row-span-4 col-start-1 pt-4  border-r
           border-cyan-300 shadow-lg "
          >
            <SideBar />
          </div>
          <div className="rounded-br-2xl  row-start-2 row-span-3   col-span-6 ">
            {/* <Stocks /> */}

            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
  x;
}

export default Dashboared;
