import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import SideBar from "./SideBar";
import Stocks from "./Stocks";
import useAppContext from "../../../context/useAppContext";
import profileImg from "../../../profile/jon.png";

function Dashboared(props) {
  const {fullName ,expireMedicine, emailHanderl, passwordHanderl } = useAppContext();
  const navigate = useNavigate();
  const onLogout = () => {
    emailHanderl("EMAIL");
    passwordHanderl("PASSWORD");
    navigate("/login");
  };
  return (
    <div className="bg-cyan-200 min-h-screen">
      <div className="bg-cyan-200  min-h-screen">
        <div className="min-h-screen  grid grid-cols-[220px_auto_auto_auto_auto]  grid-rows-[100px_1fr_1fr_1fr]  bg-cyan-200 rounded-2xl">
          <div className=" col-span-6  space-x-2 row-start-1 mb-2 rounded-lg bg-cyan-200 shadow-lg  p-4 flex items-center rounded-tr-2xl  ">
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold ">
              Welcome to Pharmacy
            </h1>
            <div className="ml-auto flex space-x-6 items-center">
              <div className="flex items-center space-x-1">
                <img src={profileImg} alt="" className="w-14 rounded-full border-2 border-cyan-300" />
                <h5 className="font-semibold">{fullName}</h5>
              </div>
              <button
                className="font-semibold bg-cyan-300 px-5 py-1.5 rounded-lg hover:bg-cyan-400 cursor-pointer transition duration-200 "
                onClick={onLogout}
              >
                Log out
              </button>
            </div>
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

}

export default Dashboared;
