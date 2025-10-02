import React, { useEffect, useState } from "react";
import PlusSvg from "../PlusSvg";
import FormMedicine from "./FormMedicine";
import MedicineList from "./MedicineList";
import useAppContext from "../../../context/useAppContext";
import EditMedicine from "./EditMedicine";
import Pagination from "./Pagination";
import { getDate } from "date-fns";

function Medicine() {
  const {
    openModal,
    isEditModalOpen,
    modalOpen,
    setTotalAmount,
    setAlltypeAmount,
    setExpireMedicine,
    setExpiredMedicines,
    allMedicines,
    setAllMedicines,
  } = useAppContext();

  const [id, setId] = useState(null);
  const [enterSearch, setSearch] = useState("");
  const [inputData, setInputData] = useState({
    name: "",
    qauntity: "",
    lowStock: "",
    expireDate: "",
    expireDuration: "",
    manuefacture: "",
  });

  const [currPage, setCurrPage] = useState(1);
  const [filtered, setFiltered] = useState(5);

  // Pagination
  const lastIndex = currPage * filtered;
  const firstIndex = lastIndex - filtered;
  const recordPages = allMedicines.slice(firstIndex, lastIndex);
  const npages = Math.ceil(allMedicines.length / filtered);
  const numberPages = [...Array(npages).keys()].map((i) => i + 1);

  // Total quantity
  const totalAmount = allMedicines
    .map((item) => +item.qauntity)
    .reduce((a, b) => a + b, 0);

  // Expiry logic
  useEffect(() => {
    // const today = new Date();
    // const tenDaysLater = new Date();
    // tenDaysLater.setDate(today.getDate() + 10);

    // const expired = allMedicines.filter(
    //   (item) => new Date(item.expireDate) < today
    // );

    // const expiringSoon = allMedicines.filter((item) => {
    //   const medDate = new Date(item.expireDate);
    //   return medDate >= today && medDate <= tenDaysLater;
    // });

    // const allExpireData = [...expired, ...allMedicines.filter(
    //   (item) => new Date(item.expireDate) >= today
    // )];

    // setExpiredMedicines(expired);       // Already expired
    // setExpireMedicine(allExpireData);   // All including future

    const expired = allMedicines.filter((date) => {
      // const itemDate = new Date(date.expireDate);
      // const today = new Date();
      // const expireDuration = new Date();
      // expireDuration.setDate(today.getDate() + +date.expireDuration);

      // console.log(
      //   itemDate.getMonth() <=expireDuration.getMonth() &&  itemDate.getDate() <=expireDuration.getDate()
      //   );
      // return (
      //   itemDate.getFullYear() <= expireDuration.getFullYear() &&
      //   itemDate.getMonth() <= expireDuration.getMonth() &&
      //   itemDate.getDate() < expireDuration.getDate()
      // );
      const today = new Date();
     

      return (
        new Intl.DateTimeFormat("en-CA", {
          year: "numeric",
          month: "numeric",
          day: "numeric",
        }).format(new Date(date.expireDate)) <=
        new Intl.DateTimeFormat("en-CA", {
          year: "numeric",
          month: "numeric",
          day: "numeric",
        }).format(new Date().setDate(today.getDate() + +date.expireDuration))
      );
    });

    setExpiredMedicines(expired);
  }, [allMedicines, setExpireMedicine, setExpiredMedicines]);

  // Set totals
  useEffect(() => {
    setTotalAmount(totalAmount);
    setAlltypeAmount(allMedicines.length);
  }, [allMedicines, setTotalAmount, setAlltypeAmount]);

  // Add new medicine
  const dataHandler = (data) => {
    setAllMedicines((prev) => [
      ...prev,
      { id: new Date().getTime().toString(), ...data },
    ]);
  };

  // Edit medicine
  const editHandler = (id) => {
    setId(id);
    const findMedicine = allMedicines.find((item) => item.id === id);
    if (!findMedicine) return;

    setInputData({
      name: findMedicine.name,
      qauntity: findMedicine.qauntity,
      lowStock: findMedicine.lowStock,
      expireDate: findMedicine.expireDate,
      expireDuration: findMedicine.expireDuration,
      manuefacture: findMedicine.manuefacture,
    });
  };

  // Remove medicine
  const removeHandler = (id) => {
    setAllMedicines((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="max-w-[70rem] px-8 container m-auto">
      {/* Search and Add */}
      <div className="grid grid-cols-2 justify-between items-center my-6">
        <input
          type="text"
          className="py-1.5 px-3 lg:w-1/2 bg-cyan-300 rounded-lg text-lg outline-0"
          placeholder="Search"
          onChange={(e) => setSearch(e.target.value)}
        />
        <button
          onClick={openModal}
          className="justify-self-end bg-cyan-300 py-2 cursor-pointer hover:opacity-70 transition duration-200 font-semibold px-5 rounded-lg flex justify-between space-x-1"
        >
          <PlusSvg /> <span>Add Medicine</span>
        </button>
      </div>

      {/* Medicine List */}
      <MedicineList
        items={recordPages}
        onRevomeHandler={removeHandler}
        onEditHandler={editHandler}
        searData={enterSearch}
        setAllMedicines={setAllMedicines}
      />

      {/* Add/Edit Modals */}
      {modalOpen && <FormMedicine onDataHandler={dataHandler} />}
      {isEditModalOpen && (
        <EditMedicine
          id={id}
          inputData={inputData}
          data={allMedicines}
          setAllMedicines={setAllMedicines}
        />
      )}

      {/* Pagination */}
      <div className="flex justify-between items-center">
  <p className="text-md">You see <span className="font-semibold">  {firstIndex+1} </span> to <span className="font-semibold"> 
  {lastIndex}</span> result of <span className="font-semibold"> {filtered}</span></p>
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

export default Medicine;
