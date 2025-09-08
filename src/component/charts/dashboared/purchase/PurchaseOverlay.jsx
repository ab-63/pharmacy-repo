import React, { useState } from "react";
// import Modal from "../../../modaloverlay/Modal";
import ModalPrice from "../../../modaloverlay/ModalPrice"
import PuchaseSelection from "./PurchaseSelection";
import useAppContext from "../../../../context/useAppContext";

function PurchaseOverlay({ onClose, onData, setModal, setSaleData, saleData }) {
  const [enterValue, setValue] = useState("");
  const [enterQauntity, setQauntity] = useState("");
  const [enterDate, setDate] = useState("");
  const [enterPrice, setPrice] = useState("");
  const [id, setId] = useState();
  const { allMedicines, setAllMedicines } = useAppContext();
  const onSelect = (value) => {
    setValue(value);
  };
  const [findQuan, setfindQuant] = useState(null);
  const [isQuantity, setIsQuantity] = useState(false);

  const closeModal = () => {
    setModal(false);
  };

  const submitHandler = (e) => {
    e.preventDefault();

    const data = {
      id: id,
      name: enterValue,
      quantity: +enterQauntity,
      date: enterDate,
      price: enterPrice,
    };

    // const findSale = saleData.find((item) => item.id === data.id);
    // const findMedicine = allMedicines.find((item) => item.id === data.id);
    // setfindQuant(findMedicine.qauntity);
    // if (
    //   findMedicine.qauntity > 0 &&
    //   findMedicine.qauntity >= enterQauntity &&
    //   enterQauntity > 0
    // ) {
    setIsQuantity(false);
    if (enterValue && enterQauntity && enterDate && enterPrice) {
      onData(data);
      // let updateItems;
      // const existanceItem = allMedicines[findNum];
      // const updateItem = {
      //   ...existanceItem,
      //   qauntity: existanceItem.qauntity - data.quantity,
      // };
      // updateItems = allMedicines;
      // (updateItems[findNum] = updateItem);

      // setAllMedicines(updateItems)
      // console.log(setAllMedicines(pre => pre[2]));
      setAllMedicines((pre) =>
        pre.map((item) => {
          return item.id === data.id
            ? { ...item, qauntity: +item.qauntity + +data.quantity }
            : item;
        })
      );
    } else {
      return;
    }
    // } else {
    //   setIsQuantity(true);
    //   console.log("not");
    // }
  };

  return (
    <ModalPrice onClose={onClose}>
      <h2 className="text-center font-semibold mb-10 text-lg">
        Purchase Medicine
      </h2>
      <div className="flex space-x-4 items-start ">
       
        <form className="flex flex-col w-full" onSubmit={submitHandler}>
          <div className="grid grid-cols-2 gap-2 gap-y-4">
          <PuchaseSelection
          data={allMedicines}
          optionHandler={onSelect}
          setId={setId}
        />
            <input
              type="text"
              placeholder="Quantity"
              value={enterQauntity}
              onChange={(e) => setQauntity(e.target.value)}
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
              type="num"
              placeholder="Price"
              value={enterPrice}
              onChange={(e) => setPrice(e.target.value)}
              className="outline-none py-1.5 px-3 w-full border-2 border-cyan-400 rounded"
            />
          </div>
          <div className="self-end space-x-3 mt-6 w-full grid grid-cols-[2fr_1fr] ">
            <div className="">
              {isQuantity && (
                <p className="  text-red-600 ">
                  The Quantity of Medicine is ({findQuan}) but you sell (
                  {enterQauntity})
                </p>
              )}
            </div>
            <div className=" space-x-4 flex items-center  justify-self-end">
              <button
                type="submit"
                className="bg-cyan-400 py-1 px-8 border-2 border-cyan-400 hover:bg-cyan-300 transition duration-200 cursor-pointer rounded"
              >
                Sell
              </button>
              <button
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
