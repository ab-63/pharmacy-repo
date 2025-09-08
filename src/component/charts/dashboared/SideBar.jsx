import React from "react";
import { Link, useLocation } from "react-router-dom";
import DashboardSvg from "../DashboardSvg";
import MedicineIcon from "../MedicineIcon";
import PrescriptionIcon from "../PrescriptionIcon";
import PurchaseSvg from "../PurchaseSvg";
import ReportSvg from "../ReportSvg";
import SaleSvg from "../SaleSvg";
import Svg from "../Svg";
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
      </div>
    </div>
  );
}

export default SideBar;
