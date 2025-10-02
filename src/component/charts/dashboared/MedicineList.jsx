import React, { useState } from "react";
import Delete from "../Delete";
import EditSvg from "../EditSvg";
import useAppContext from "../../../context/useAppContext";
import "./Alltabels.css";
import MoveForm from "./MoveForm";

function MedicineList({
  items = [],
  onRevomeHandler,
  onEditHandler,
  searData,
}) {
  const {
    editMedodalOpen,
    setAllMedicines,
    setPharmacyState,
    setError,
    error,
  } = useAppContext();

  const [selectedMedicine, setSelectedMedicine] = useState(null);
  const [isModal, setModal] = useState(false);

  const openModal = () => setModal(true);
  const closeModal = () => setModal(false);

  const removeHandler = (id) => onRevomeHandler(id);

  const editHandler = (id) => {
    onEditHandler(id);
    editMedodalOpen();
  };

  const moveHandler = (id) => {
    const medicine = items.find((item) => +item.id === +id);
    if (!medicine) return;

    setSelectedMedicine(medicine);
    openModal();
    setError(false);
  };

  const dataHandler = (data) => {
    if (!selectedMedicine) return;

    const entry = {
      name: selectedMedicine.name,
      id: +new Date().getTime().toString(),
      date: selectedMedicine.expireDate,
      price: +data.price,
      quantity: +data.quantity,
      lowStock: +data.lowStockPh,
      expireDuration: +data.expireDuration,
      totalAmount: Number(data.totalAmount),
    };

    if (
      +selectedMedicine.qauntity >= entry.quantity &&
      +selectedMedicine.qauntity > 0 &&
      entry.price &&
      entry.quantity &&
      entry.expireDuration
    ) {
      // Update pharmacy
      setPharmacyState((prev) => [...prev, { ...entry }]);

      // Update medicine stock
      setAllMedicines((prev) =>
        prev.map((item) =>
          +item.id === +selectedMedicine.id
            ? { ...item, qauntity: +item.qauntity - entry.quantity }
            : item
        )
      );

      closeModal();
    } else {
      console.log(error);
      setError(true);
    }
  };

  return (
    <div className="overflow-scroll max-h-[28rem] shadow-md rounded-lg overflow-y-auto overflow-x-auto scrollbar scrollbar-thumb-cyan-900 scrollbar-track-cyan-100 tabel">
      {isModal && <MoveForm closeModal={closeModal} onData={dataHandler} />}
      <table className="w-full bg-cyan-100 rounded-xl">
        <thead className="bg-cyan-300">
          <tr className="text-left">
            <th className="py-2 px-4 border-cyan-200">Name</th>
            <th className="py-2 px-4 border-cyan-200">Quantity</th>
            <th className="py-2 px-4 border-cyan-200">Min Level</th>
            <th className="py-2 px-4 border-cyan-200">Expire Date</th>
            <th className="py-2 px-4 border-cyan-200">Expire Duration</th>
            <th className="py-2 px-4 border-cyan-200">Manuefacture</th>
            <th className="py-2 px-4 border-cyan-200"></th>
          </tr>
        </thead>
        <tbody>
          {items
            .filter((item) =>
              !searData
                ? true
                : item.name.toLowerCase().includes(searData.toLowerCase())
            )
            .map((item) => (
              <tr className="tr" key={item.id}>
                <td className="py-2 px-4 border-cyan-200">{item.name}</td>
                <td className="py-2 px-4 border-cyan-200">{item.qauntity}</td>
                <td>{item.lowStock}</td>
                <td className="py-2 px-4 border-cyan-200">{item.expireDate}</td>
                <td className="py-2 px-4 border-cyan-200">
                  {item.expireDuration}
                </td>
                <td className="py-2 px-4 border-cyan-200">
                  {item.manuefacture}
                </td>
                <td className="flex justify-around py-2 px-4 border-cyan-200 text-right">
                  <button
                    className="cursor-pointer"
                    onClick={() => editHandler(item.id)}
                  >
                    <EditSvg />
                  </button>
                  <button
                    className="cursor-pointer"
                    onClick={() => removeHandler(item.id)}
                  >
                    <Delete />
                  </button>
                  <button
                    className="cursor-pointer"
                    onClick={() => moveHandler(item.id)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="#000000"
                      viewBox="0 0 256 256"
                    >
                      <path d="M90.34,61.66a8,8,0,0,1,0-11.32l32-32a8,8,0,0,1,11.32,0l32,32a8,8,0,0,1-11.32,11.32L136,43.31V96a8,8,0,0,1-16,0V43.31L101.66,61.66A8,8,0,0,1,90.34,61.66Zm64,132.68L136,212.69V160a8,8,0,0,0-16,0v52.69l-18.34-18.35a8,8,0,0,0-11.32,11.32l32,32a8,8,0,0,0,11.32,0l32-32a8,8,0,0,0-11.32-11.32Zm83.32-72-32-32a8,8,0,0,0-11.32,11.32L212.69,120H160a8,8,0,0,0,0,16h52.69l-18.35,18.34a8,8,0,0,0,11.32,11.32l32-32A8,8,0,0,0,237.66,122.34ZM43.31,136H96a8,8,0,0,0,0-16H43.31l18.35-18.34A8,8,0,0,0,50.34,90.34l-32,32a8,8,0,0,0,0,11.32l32,32a8,8,0,0,0,11.32-11.32Z"></path>
                    </svg>
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default MedicineList;
