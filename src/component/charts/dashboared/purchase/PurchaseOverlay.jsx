import React, { useState } from "react";
import ModalPrice from "../../../modaloverlay/ModalPrice";
import PurchaseSelection from "./PurchaseSelection";
import useAppContext from "../../../../context/useAppContext";

function PurchaseOverlay({ onClose, onData, setModal }) {
  const [enterValue, setValue] = useState("");
  const [enterQuantity, setQuantity] = useState("");
  const [enterDate, setDate] = useState("");
  const [enterPrice, setPrice] = useState("");
  const [id, setId] = useState();

  const { allMedicines, setAllMedicines } = useAppContext();

  const closeModal = () => setModal(false);

  const submitHandler = (e) => {
    e.preventDefault();

    const data = {
      id: +id,
      name: enterValue,
      quantity: Number(enterQuantity),
      date: enterDate,
      price: Number(enterPrice),
    };

    // ✅ validate
    if (!data.id || !data.name || !data.quantity || !data.date || !data.price) {
      alert("Please select a valid medicine and fill all fields");
      return;
    }

    // send to parent
    onData(data);

    // update stock

    setAllMedicines(prev =>
      prev.map(item =>{
        console.log(+item.id,data.id)

       return +item.id === data.id
        ? { ...item, qauntity: Number(item.qauntity || 0) + data.quantity }
        : item
      }
        )
    );

    // reset form
    setValue("");
    setQuantity("");
    setDate("");
    setPrice("");
    setId(undefined);
setModal(false)
    
  };

  const onSelect = (value) => setValue(value);

  return (
    <ModalPrice onClose={onClose}>
      <h2 className="text-center font-semibold mb-10 text-lg">Purchase Medicine</h2>
      <div className="flex space-x-4 items-start">
        <form className="flex flex-col w-full" onSubmit={submitHandler}>
          <div className="grid grid-cols-2 gap-2 gap-y-4">
            <PurchaseSelection
              data={allMedicines}
              optionHandler={onSelect}
              setId={setId}
            />
            <input
              type="number"
              placeholder="Quantity"
              value={enterQuantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="outline-none py-1.5 px-3 w-full border-2 border-cyan-400 rounded"
            />
            <input
              type="date"
              placeholder="Date"
              value={enterDate}
              onChange={(e) => setDate(e.target.value)}
              className="outline-none py-1.5 px-3 w-full border-2 border-cyan-400 rounded"
            />
            <input
              type="number"
              placeholder="Price"
              value={enterPrice}
              onChange={(e) => setPrice(e.target.value)}
              className="outline-none py-1.5 px-3 w-full border-2 border-cyan-400 rounded"
            />
          </div>

          <div className="self-end space-x-3 mt-6 w-full grid grid-cols-[2fr_1fr]">
            <div></div>
            <div className="space-x-4 flex items-center justify-self-end">
              <button
                type="submit"
                className="bg-cyan-400 py-1 px-8 border-2 border-cyan-400 hover:bg-cyan-300 transition duration-200 cursor-pointer rounded"
              >
                Purchase
              </button>
              <button
                type="button"
                className="border-2 border-cyan-400 py-1 px-4 hover:bg-cyan-300 transition duration-200 cursor-pointer rounded"
                onClick={closeModal}
              >
                Cancel
              </button>
            </div>
          </div>
        </form>
      </div>
    </ModalPrice>
  );
}

export default PurchaseOverlay;
