import React from "react";

const ReportFilter = ({ filterHandler }) => {
  const onFilter = (e) => {
    filterHandler(e.target.value);
  };
  return (
    <div className="flex gap-x-3 items-center font-semibold">
      <h2 className="text-lg">Fillter By</h2>
      <select
        className="bg-cyan-100 py-1 px-4 cursor-pointer outline-none rounded"
        onChange={onFilter}
      >
        <option value="Day">Day</option>
        <option value="Week">Week</option>
        <option value="Month">Month</option>
        <option value="Year">Year</option>
      </select>
    </div>
  );
};

export default ReportFilter;
