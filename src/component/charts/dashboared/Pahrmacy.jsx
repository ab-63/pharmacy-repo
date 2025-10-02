import { useEffect, useState } from "react";
import useAppContext from "../../../context/useAppContext";
import Pagination from "./Pagination";
import PharmacyCard from "./PharmacyCard";
import PharmacyEdit from "./PharmacyEdit";
import PharmacyList from "./PharmacyList";

const item = [];
const initialState = () => {
  const data = localStorage.getItem("TotalAssetPharmacy");

  try {
    return data ? JSON.parse(data) : item;
  } catch (err) {
    console.error(err, "LocaleStorage");
    return item;
  }
};
function Pahrmacy() {
  const [search, setSearch] = useState("");
  const {
    pharmacyState,
    setPharmacyState,
    allMedicines,
    isPharmacyModal,
    setPharmacyModal,
  } = useAppContext();
  const [totalAsset, setTotalAsset] = useState(() => initialState());

  const [id, setId] = useState(null);
  const [currPage, setCurrPage] = useState(1);
  const [filtered, setFiltered] = useState(5);
  const [findMedicine, setFindMedicine] = useState(null);
  const [inputData, setInputData] = useState({
    name: "",
    quantity: "",
    expireDuration: "",
    date: "",
    price: "",
    lowStock: "",
  });

  const editHandler = (id) => {
    const findMedicine = pharmacyState.find((med) => med.id === id);
    setId(id);
    setPharmacyModal(true);
    setFindMedicine(findMedicine);

    setInputData({
      name: findMedicine.name,
      quantity: findMedicine.quantity,
      expireDuration: findMedicine.expireDuration,
      date: findMedicine.date,
      price: findMedicine.price,
      lowStock: findMedicine.lowStock,
    });
  };

  const deleteHandler = (id) => {
    setPharmacyState((pre) => pre.filter((item) => item.id !== id));
  };
  const totalAmount = pharmacyState
    .map((item) => item.totalAmount)
    .reduce((a, b) => {
      return a + b;
    }, 0);

  useEffect(() => {
    setTotalAsset(totalAmount);
    localStorage.setItem("TotalAssetPharmacy", JSON.stringify(totalAsset));
  }, [pharmacyState, allMedicines, totalAsset]);
  const lastIndex = currPage * filtered;
  const firstIndex = lastIndex - filtered;
  const recordPages = pharmacyState.slice(firstIndex, lastIndex);
  const npages = Math.ceil(pharmacyState.length / filtered);
  const numberPages = [...Array(npages).keys()].map((i) => i + 1);
  return (
    <div className=" max-w-[70rem] px-8 container m-auto">
      <div className="grid grid-cols-2 justify-between items-center my-6 ">
        <input
          type="text"
          className="py-1.5  px-3 lg:w-1/2 bg-cyan-300 rounded-lg text-lg outline-0"
          placeholder="search"
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className=" flex justify-end">
          <PharmacyCard totalAsset={totalAsset} />
        </div>
      </div>

      <PharmacyList
        items={recordPages}
        searData={search}
        onEditHandler={editHandler}
        onDeleteHandler={deleteHandler}
      />
      {isPharmacyModal && (
        <PharmacyEdit
          inputData={inputData}
          id={id}
          findMedicine={findMedicine}
          setPharmacyState={setPharmacyState}
        />
      )}
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

export default Pahrmacy;
