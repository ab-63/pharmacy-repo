import React, { useEffect, useState } from "react";

import useAppContext from "../../../../context/useAppContext";
import PurchaseOverlay from "./PurchaseOverlay";
import PurchaseList from "./PurchaseList";
import Pagination from "../Pagination";

// const item = [];
// const initialState = () => {
//   const data = localStorage.getItem("Medicines");

//   try {
//     return data ? JSON.parse(data) : item;
//   } catch (err) {
//     console.error(err, "LocaleStorage");
//     return item;
//   }
// };

const purchaseItem = [];
const purchaseInitialState = () => {
  const data = localStorage.getItem("Purchase");

  try {
    return data ? JSON.parse(data) : purchaseItem;
  } catch (err) {
    console.error(err, "LocaleStorage");
    return purchaseItem;
  }
};

function Purchase() {
  // const [items, setItems] = useState(() => initialState());
  const [enterSearch, setSearch] = useState("");
  const [purchaseData, setPurchaseData] = useState(() =>
    purchaseInitialState()
  );
  const [isModal, setModal] = useState(false);
  const { setToalPurchase } = useAppContext();
  const purchaseDataarray = purchaseData || [];
  const totalPurchase = purchaseDataarray
    .map((purchase) => purchase?.totalAmount)
    .reduce((a, b) => a + b, 0);
  useEffect(() => {
    localStorage.setItem("Purchase", JSON.stringify(purchaseData));
    setToalPurchase(totalPurchase);
  }, [purchaseData]);

  const [currPage, setCurrPage] = useState(1);
  const [filtered, setFiltered] = useState(5);
  
  const lastIndex = currPage * filtered;
  const firstIndex = lastIndex - filtered;
  const recordPages = purchaseData.slice(firstIndex, lastIndex);
  const npages = Math.ceil(purchaseData.length / filtered);
  const numberPages = [...Array(npages).keys()].map((i) => i + 1);
  // useEffect(()=>{

  // })

  const allData = (data) => {
    // const items= data || []
    setPurchaseData((pre) => {
      return pre
        ? [...pre, { ...data }].map((total) => ({
            ...total,
            totalAmount: total.price * total.quantity,
          }))
        : [{ ...data }].map((total) => ({
            ...total,
            totalAmount: total.price * total.quantity,
            
          }));
    });
    // setPurchaseData(data);
  };

  const salesHandler = (id) => {
    const findMedicine = items.find((item) => item.id === id);
  };
  const openModal = () => {
    setModal(true);
  };
  const closeModal = () => {
    setModal(false);
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
          onClick={openModal}
          className="justify-self-end items-center space-x-2 bg-cyan-300
           py-2 cursor-pointer hover:opacity-70 transition
           duration-200 font-semibold px-5 rounded-lg flex  justify-between"
        >
          {/* <span className="bg-cyan-600 px-3 py-1 rounded-full">3</span> */}
          <span className="">Purchase Medicine</span>
        </button>
      </div>

      <div className="">
        {isModal && (
          <PurchaseOverlay
            onClose={closeModal}
            onData={allData}
            setModal={setModal}
            setPurchaseData={setPurchaseData}
            purchaseData={purchaseData}
          />
        )}
        <PurchaseList
          items={recordPages}
          searData={enterSearch}
          onSaleHandler={salesHandler}
        />
      </div>
      
     <Pagination currPage={currPage} filtered={filtered} setFiltered ={setFiltered} setCurrPage={setCurrPage} numberPages={numberPages} npages={npages}/>

    </div>
  );
}

export default Purchase;
