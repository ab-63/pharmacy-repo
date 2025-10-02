import React, { useEffect, useState } from "react";
import ModalPrice from "../../modaloverlay/ModalPrice";
import SalesSelection from "./SalesSelection";
import useAppContext from "../../../context/useAppContext";

function SalesOverlay({ onClose, onData, setModal }) {
  const {
    pharmacyState,
    setPharmacyState,
    setBillPrint,
    printBill,
    setIsPrint,
  } = useAppContext();
  const [selectedMedicine, setSelectedMedicine] = useState(null);
  const [quantity, setQuantity] = useState("");
  const [enterDate, setEnterDate] = useState("");
  const [putAllFindMedicine, setPutAllFindMedicine] = useState([]);
  const [isQuantityError, setIsQuantityError] = useState(false);

  // useEffect(()=>{
  //   if(printBill.length>0){

  //   }
  // },[printBill])

  const closeModal = () => setModal(false);

  // 🛒 Add to cart
  const cartHandler = () => {
    if (!selectedMedicine) {
      alert("Please select a medicine");
      return;
    }

    const qty = Number(quantity);

    if (qty <= 0 || qty > selectedMedicine.quantity) {
      setIsQuantityError(true);
      return; // Prevent adding
    }

    // Add to cart
    setPutAllFindMedicine((prev) => [
      ...prev,
      { ...selectedMedicine, quantity: qty },
    ]);

    // Reset input
    setQuantity("");
    setSelectedMedicine(null);
    setIsQuantityError(false);
  };

  // ✅ Final submit: process all cart items
  const submitHandler = (e) => {
    e.preventDefault();
  
    const qty = Number(quantity);
  
    // Validation
    if (!selectedMedicine) {
      alert("Please select a medicine");
      return;
    }
  
    if (qty <= 0 || qty > selectedMedicine.quantity) {
      setIsQuantityError(true);
      return; // stop selling
    }
  
    setIsQuantityError(false);
  
    // Add current medicine to cart
    const updatedCart = [
      ...putAllFindMedicine,
      { ...selectedMedicine, quantity: qty },
    ];
    setPutAllFindMedicine(updatedCart);
  
    // Update print data
    setBillPrint(
      updatedCart.map((med) => ({
        ...med,
        totalAmount: Number(med.price) * Number(med.quantity),
      }))
    );
  
    // Update pharmacy stock
    setPharmacyState((prev) =>
      prev.map((m) => {
        const soldMedicine = updatedCart.find((pm) => pm.id === m.id);
        return soldMedicine
          ? { ...m, quantity: m.quantity - soldMedicine.quantity }
          : m;
      })
    );
  
    // Send sales data to parent
    const salesData = updatedCart.map((med) => ({
      id: +med.id,
      name: med.name,
      quantity: +med.quantity,
      date: enterDate || new Date().toISOString().split("T")[0],
      price: +med.price,
      totalAmount: Number(med.quantity) * Number(med.price),
    }));
  
    onData(salesData);
    setIsPrint(true);
    setModal(false);
  
    // Reset input
    setQuantity("");
    setSelectedMedicine(null);
    setPutAllFindMedicine([]);
  };
  

  return (
    <ModalPrice onClose={onClose}>

      <h2 className="text-center font-semibold mb-10 text-lg">Sell Medicine</h2>
      <input
        type="date"
        placeholder="Enter Date"
        value={enterDate}
        onChange={(e) => setEnterDate(e.target.value)}
        className="outline-none py-1.5 px-3 border-2 w-full border-cyan-400 rounded mb-5"
      />
      {/* 🛒 Cart Preview */}
      {/* <div className=""> */}
      <div className="max-h-[13rem] overflow-y-auto tabel" >
        <div className="flex flex-col">
          {putAllFindMedicine.map((med, i) => (
            <div key={i} className="grid grid-cols-2 gap-3 gap-y-4 mb-4">
              <input
                type="text"
                value={med.name}
                onChange={(e) => {
                  const item = putAllFindMedicine.map((item, index) =>
                    index === i ? { ...item, name: e.target.value } : item
                  );
                  setPutAllFindMedicine(item);
                }}
                className="outline-none py-1.5 px-3 border-2 border-cyan-400 rounded"
              />
              <input
                type="number"
                value={+med.quantity}
                onChange={(e) => {
                  const item = putAllFindMedicine.map((item, index) =>
                    index === i ? { ...item, quantity: e.target.value } : item
                  );
                  setPutAllFindMedicine(item);
                }}
                className="outline-none py-1.5 px-3 border-2 border-cyan-400 rounded"
              />
            </div>
          ))}
        </div>
        </div>

      {/* Form */}
      <form onSubmit={submitHandler}>
        <div className="grid grid-cols-2 gap-3 gap-y-4">
          <SalesSelection
            key={selectedMedicine ? selectedMedicine.id : "new"}
            data={pharmacyState}
            setId={(id) => {
              const med = pharmacyState.find((m) => +m.id === +id);
              setSelectedMedicine(med || null);
            }}
            onChange={(val) => {
              // if (selectedMedicine) {
              setSelectedMedicine({ ...selectedMedicine, name: val });
              // }
            }}
            value={selectedMedicine ? selectedMedicine.name : ""}
          />

          <input
            type="number"
            placeholder="Quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className="outline-none py-1.5 px-3 border-2 border-cyan-400 rounded"
            onKeyDown={(e) => {
              if (e.key === " ") {
                e.preventDefault();
                cartHandler();
              }
            }}
          />
        </div>

        {isQuantityError && selectedMedicine && (
          <p className="text-red-600 mt-3">
            Stock is ({selectedMedicine.quantity}), but you tried to sell (
            {quantity})
          </p>
        )}

        {/* Buttons */}
        {/* <button
          type="button"
          onClick={cartHandler}
          className="bg-cyan-400 py-1 cursor-pointer px-8 border-2 border-cyan-400 hover:bg-cyan-300 rounded mt-4"
        >
          Add Medicine
        </button> */}
        <div className="mt-6 flex justify-end space-x-4">
          <button
            type="submit"
            className="bg-cyan-400 py-1 px-8 border-2 cursor-pointer border-cyan-400 hover:bg-cyan-300 rounded"
          >
            Sell
          </button>
          <button
            type="button"
            onClick={closeModal}
            className="border-2 border-cyan-400 cursor-pointer py-1 px-4 hover:bg-cyan-300 rounded"
          >
            Cancel
          </button>
        </div>
      </form>

    </ModalPrice>
  );
}

export default SalesOverlay;
