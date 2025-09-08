import React, { useEffect, useState } from "react";
import ReportChart from "./ReportChart";
import ReportFilter from "./ReportFilter";
import useAppContext from "../../../../context/useAppContext";
import { getDate } from "date-fns";

const Report = () => {
  const [filter, setFilter] = useState("day");
  const [value, setValue] = useState("Week");
  const { saleData, setSaleData } = useAppContext();

  // Function to get filtered data based on selected value (Day, Week, Month, Year)
  function getFiltered() {
    switch (value) {
      case "Day":
        return filterbyDay();
      case "Week":
        console.log('week')
        return filterbyWeek();
      case "Month":
        return filterbyMonth();
      case "Year":
        return filterByYear();
      default:
        return [];
    }
  }

  // Filter sales by the current day
  function filterbyDay() {
    const today = new Date();
    return saleData.filter((sale) => {
      const saleDate = new Date(sale.date);
      return (
        today.getDate() === saleDate.getDate() &&
        today.getFullYear() === saleDate.getFullYear() &&
        today.getMonth() === saleDate.getMonth()
      );
    });
  }

  // Filter sales by the current week
  function filterbyWeek() {
    const today = new Date();
    const startWeek = today.getDate() - today.getDay();
    const endweek = startWeek + 6;
    const start = new Date(today.setDate(startWeek));
    const end = new Date(today.setDate(endweek));

    return saleData.filter((sale) => {
      const saleDate = new Date(sale.date);
      return saleDate >= start && saleDate <= end;
    });
  }function filterbyWeek() {
    const today = new Date();
    const dayOfWeek = today.getDay(); // 0 = Sunday, 6 = Saturday
  
    // Start of this week (Sunday)
    const start = new Date(today);
    start.setDate(today.getDate() - dayOfWeek);
    start.setHours(0, 0, 0, 0);
  
    // End of this week (Saturday)
    const end = new Date(today);
    end.setDate(today.getDate() + (6 - dayOfWeek));
    end.setHours(23, 59, 59, 999);
  
    return saleData.filter((sale) => {
      const saleDate = new Date(sale.date);
      return saleDate >= start && saleDate <= end;
    });
  }
  

  // Filter sales by the current month
  function filterbyMonth() {
    const today = new Date();
    return saleData.filter((sale) => {
      const saleDate = new Date(sale.date);
      return (
        saleDate.getMonth() === today.getMonth() &&
        saleDate.getFullYear() === today.getFullYear()
      );
    });
  }

  // Filter sales by the current year
  function filterByYear() {
    const today = new Date();
    return saleData.filter((sale) => {
      const saleDate = new Date(sale.date);
      return saleDate.getFullYear() === today.getFullYear();
    });
  }

  // Handle filter change from the ReportFilter component
  const onFilter = (value) => {
    setValue(value);
  };

  return (
      <div className="max-w-[70rem] px-8 m-auto mt-6">
        <ReportFilter filterHandler={onFilter} />
        <ReportChart getFiltered={getFiltered} value={value} />
      </div>
  );
};

export default Report;
