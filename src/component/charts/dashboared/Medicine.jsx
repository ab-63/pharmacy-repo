import React, { use, useEffect, useState } from "react";
import PlusSvg from "../PlusSvg";
import FormMedicine from "./FormMedicine";

import MedicineList from "./MedicineList";
import useAppContext from "../../../context/useAppContext";
import EditMedicine from "./EditMedicine";
import Pagination from "./Pagination";
// const items = [];
// const initialState = () => {
//   const data = localStorage.getItem("Medicines");
//   try {
//     const parsed = data ? JSON.parse(data) : items;
//     return Array.isArray(parsed) ? parsed : items;
//   } catch (err) {
//     console.error(err, "localStorage parse error");
//     return items;
//   }
// };

function Medicine() {
  const {
    openModal,
    isEditModalOpen,
    modalOpen,
    setTotalAmount,
    setAlltypeAmount,
    setExpireMedicine,
    allMedicines,
    setAllMedicines,
  } = useAppContext();
  // const [allMedicines, setAllMedicines] = useState(() => initialState());
  const [id, setId] = useState(null);
  const [enterSearch, setSearch] = useState("");

  const [inputData, setInputData] = useState({
    name: "",
    qauntity: "",
    expireDate: "",
    manuefacture: "",
  });
  const [currPage, setCurrPage] = useState(1);
  const [filtered, setFiltered] = useState(5);
  
  const lastIndex = currPage * filtered;
  const firstIndex = lastIndex - filtered;
  const recordPages = allMedicines.slice(firstIndex, lastIndex);
  const npages = Math.ceil(allMedicines.length / filtered);
  const numberPages = [...Array(npages).keys()].map((i) => i + 1);
  const allMedicinesArray = allMedicines || [];
  const totalAmount = allMedicinesArray
    .map((item) => +item.qauntity)
    .reduce((a, b) => a + b, 0);

  const expiretime = new Intl.DateTimeFormat("en-CA", {
    year: "numeric",
    day: "2-digit",
    month: "2-digit",
  }).format(new Date());

  const expireMedicine = allMedicinesArray.filter(
    (item) => item.expireDate <= expiretime
  );

  useEffect(() => {
    setExpireMedicine(expireMedicine);
  }, [allMedicines]);

  useEffect(() => {
    // localStorage.setItem("Medicines", JSON.stringify(allMedicines));
    setTotalAmount(totalAmount);
    setAlltypeAmount(allMedicines.length);
  }, [allMedicines]);

  const dataHandler = (data) => {
    console.log(data);
    setAllMedicines((pre) => {
      return pre
        ? [...pre, { id: new Date().getTime().toString(), ...data }]
        : [{ id: new Date().getTime().toString(), ...data }];
    });
  };

  const editHandler = (id) => {
    setId(id);

    const findMedicine = allMedicines.find((item) => item.id === id);
    console.log(allMedicines);
    setInputData({
      name: findMedicine.name,
      qauntity: findMedicine.qauntity,
      expireDate: findMedicine.expireDate,
      manuefacture: findMedicine.manuefacture,
    });
    console.log(findMedicine);
  };
  const removeHandler = (id) => {
    setAllMedicines((preItem) => preItem.filter((item) => item.id !== id));
  };
  return (
    <div className=" max-w-[70rem] px-8 container m-auto">
      <div className="grid grid-cols-2 justify-between items-center my-6">
        <input
          type="text"
          className="py-1.5  px-3 lg:w-1/2 bg-cyan-300 rounded-lg text-lg outline-0"
          placeholder="search"
          onChange={(e) => setSearch(e.target.value)}
        />
        <button
          onClick={() => openModal()}
          className="justify-self-end bg-cyan-300 py-2 cursor-pointer hover:opacity-70 transition duration-200 font-semibold px-5 rounded-lg flex  justify-between space-x-1"
        >
          <PlusSvg /> <span>Add Medicine</span>
        </button>
      </div>
      <div className="">
        <MedicineList
          items={recordPages}
          onRevomeHandler={removeHandler}
          onEditHandler={editHandler}
          searData={enterSearch}
        />
        {modalOpen && <FormMedicine onDataHandler={dataHandler} />}
        {isEditModalOpen && (
          <EditMedicine
            id={id}
            inputData={inputData}
            data={allMedicines}
            setAllMedicines={setAllMedicines}
          />
        )}
      </div>
     <Pagination currPage={currPage} filtered={filtered} setFiltered ={setFiltered} setCurrPage={setCurrPage} numberPages={numberPages} npages={npages}/>
    </div>
  );
}

export default Medicine;
