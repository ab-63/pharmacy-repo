import React from "react";
import { Link, useLocation } from "react-router-dom";
import { AdminSvg } from "../AdminSvg";
import DashboardSvg from "../DashboardSvg";
import MedicineIcon from "../MedicineIcon";
import PrescriptionIcon from "../PrescriptionIcon";
import PurchaseSvg from "../PurchaseSvg";
import ReportSvg from "../ReportSvg";
import SaleSvg from "../SaleSvg";
import Svg from "../Svg";
import AdminPanel from "./AdminPanel";
function SideBar(props) {
  const { pathname } = useLocation();
  let subPage = pathname.split("/")[1];
  const isActiveButton = (type = "") => {
    const base =
      "flex items-center space-x-2 hover:text-cyan-700 transition duration-150";
    const active = "font-bold bg-cyan-300 rounded-lg";
    return type === subPage ? `${base} ${active}` : base;
  };

  console.log(subPage);
  return (
    <div className="">
      <div className="flex items-center mb-12 justify-center space-x-2">
        <Svg />
        <h2 className="text-xl font-semibold">Pharmacy</h2>
      </div>
      <div className=" space-y-2">
        <Link to="/" className={isActiveButton("")}>
          <div className="bg-cyan-300 p-3 rounded-full">
            <DashboardSvg />
          </div>
          <span> Dashbored</span>
        </Link>
        <Link to="medicine" className={isActiveButton("medicine")}>
          <div className="bg-cyan-300 p-3 rounded-full">
            <MedicineIcon />
          </div>
          <span> Inventory</span>
        </Link>
        <Link to="pharmacy" className={isActiveButton("pharmacy")}>
          <div className="bg-cyan-300 p-3 rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              fill="#000000"
              viewBox="0 0 256 256"
            >
              <path d="M216.42,39.6a53.26,53.26,0,0,0-75.32,0L39.6,141.09a53.26,53.26,0,0,0,75.32,75.31h0L216.43,114.91A53.31,53.31,0,0,0,216.42,39.6ZM103.61,205.09h0a37.26,37.26,0,0,1-52.7-52.69L96,107.31,148.7,160ZM205.11,103.6,160,148.69,107.32,96l45.1-45.09a37.26,37.26,0,0,1,52.69,52.69ZM189.68,82.34a8,8,0,0,1,0,11.32l-24,24a8,8,0,1,1-11.31-11.32l24-24A8,8,0,0,1,189.68,82.34Z"></path>
            </svg>
          </div>
          <span> Pharmacy</span>
        </Link>
        <Link to="sale" className={isActiveButton("sale")}>
          <div className="bg-cyan-300 p-3 rounded-full">
            <SaleSvg />
          </div>
          <span> Sale</span>
        </Link>
        <Link to="purchase" className={isActiveButton("purchase")}>
          <div className="bg-cyan-300 p-3 rounded-full">
            <PurchaseSvg />
          </div>
          <span> Purchase</span>
        </Link>
        <Link to="prescription" className={isActiveButton("prescription")}>
          <div className="bg-cyan-300 p-3 rounded-full">
            <PrescriptionIcon />
          </div>
          <span> Prescription</span>
        </Link>
        <Link to="report" className={isActiveButton("report")}>
          <div className="bg-cyan-300 p-3 rounded-full">
            <ReportSvg />
          </div>
          <span> Report</span>
        </Link>
        <Link to="admin" className={isActiveButton("admin")}>
          <div className="bg-cyan-300 p-3 rounded-full">
            <AdminSvg wi={5} />
          </div>
          <span> Admin</span>
        </Link>
        <Link to="note" className={isActiveButton("note")}>
          <div className="bg-cyan-300 p-3 rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
              />
            </svg>
          </div>
          <span> Note</span>
        </Link>
      </div>
    </div>
  );
}

export default SideBar;
