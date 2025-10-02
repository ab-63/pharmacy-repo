import React, { useEffect, useState } from "react";
import Modal from "../../../modaloverlay/Modal";
import PrescriptionIcon from "../../PrescriptionIcon";
import Pagination from "../Pagination";
import PrescriptionForm from "./PrescriptionForm";
import PrescriptionList from "./PrescriptionList";

const prescriptionseItem = [];
const prescriptionInitialState = () => {
  const data = localStorage.getItem("Patient");

  try {
    return data ? JSON.parse(data) : prescriptionseItem;
  } catch (err) {
    console.error(err, "LocaleStorage");
    return prescriptionseItem;
  }
};
function Prescription() {
  const [patientData, setPatientData] = useState(() =>
    prescriptionInitialState()
  );
  const [enterSearch, setSearch] = useState("");
  const [isModal, setModal] = useState(false);
  useEffect(() => {
    localStorage.setItem("Patient", JSON.stringify(patientData));
  }, [patientData]);
  const openModal = () => {
    setModal(true);
  };
  const [currPage, setCurrPage] = useState(1);
  const [filtered, setFiltered] = useState(5);
  
  const lastIndex = currPage * filtered;
  const firstIndex = lastIndex - filtered;
  const recordPages = patientData.slice(firstIndex, lastIndex);
  const npages = Math.ceil(patientData.length / filtered);
  const numberPages = [...Array(npages).keys()].map((i) => i + 1);
  
  const closeModal = () => {
    setModal(false);
  };
  const dataHandler = (data) => {
    setPatientData((pre) => {
      return [...pre, { ...data }];
    });
  };
  return (
  
    <div className=" max-w-[70rem] px-8 container m-auto">
<div className="">

      <div className="grid grid-cols-2 justify-between items-center my-6">
        <input
          type="text"
          className="py-1.5  px-3 lg:w-1/2 bg-cyan-300 rounded-lg text-lg outline-0"
          placeholder="search"
          onChange={(e) => setSearch(e.target.value)}
        />
        <button
          onClick={() => openModal()}
          className="justify-self-end  bg-cyan-300 py-2 cursor-pointer
           hover:opacity-70 transition duration-200 font-semibold px-5 
           rounded-lg flex items-center  justify-between space-x-1"
        >
          <PrescriptionIcon />
          <span>Prescription</span>
        </button>
      </div>
      {isModal && (
        <PrescriptionForm onData={dataHandler} closeModal={closeModal} />
      )}
      <PrescriptionList items={recordPages} searData={enterSearch} />
      </div>
      <div className="flex justify-between items-center">
  <p className="text-md">You see <span className="font-semibold">  {firstIndex+1} </span> to <span className="font-semibold"> 
  {lastIndex}</span> result of <span className="font-semibold"> {filtered}</span></p>
      <Pagination currPage={currPage} filtered={filtered} setFiltered ={setFiltered} setCurrPage={setCurrPage} numberPages={numberPages} npages={npages}/>
</div>
    </div>
  );
}

export default Prescription;
