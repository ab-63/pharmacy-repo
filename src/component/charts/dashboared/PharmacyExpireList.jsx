import { useEffect,useState } from "react";
import useAppContext from "../../../context/useAppContext";
import Pagination from "./Pagination";

function PharmacyExpireList() {
  const {
    pharmacyState,
    setPharmacyState,
    pharmacyExpire,
    setPharmacyExpired,
  } = useAppContext();

  useEffect(() => {
    const expired = pharmacyState.filter((pharmacy) => {
      const today = new Date();
      const pharmacyExpireDate = new Intl.DateTimeFormat("en-CA", {
        year: "numeric",
        month: "numeric",
        day: "numeric",
      }).format(new Date(pharmacy.date));
      const pharmacyExpireDuration = new Intl.DateTimeFormat("en-CA", {
        year: "numeric",
        month: "numeric",
        day: "numeric",
      }).format(new Date().setDate(today.getDate() + +pharmacy.expireDuration));

      console.log(
        new Intl.DateTimeFormat("en-CA", {
          year: "numeric",
          month: "numeric",
          day: "numeric",
        }).format(
          new Date().setDate(today.getDate() + +pharmacy.expireDuration)
        )
      );
      return pharmacyExpireDate <= pharmacyExpireDuration;
    });

    setPharmacyExpired(expired);
  }, [pharmacyState, setPharmacyExpired]);

  const [currPage, setCurrPage] = useState(1);
  const [filtered, setFiltered] = useState(5);

  const lastIndex = currPage * filtered;
  const firstIndex = lastIndex - filtered;
  const recordPages = pharmacyExpire.slice(firstIndex, lastIndex);
  const npages = Math.ceil(pharmacyExpire.length / filtered);
  const numberPages = [...Array(npages).keys()].map((i) => i + 1);

  const itemarra =  recordPages|| [];

  return (
    <div className="h-78 flex flex-col">

    <div

      className="tabel shadow-lg  max-h-[20rem] rounded-lg
    overflow-y-auto overflow-x-auto scrollbar scrollbar-thumb-cyan-900 scrollbar-track-cyan-200
    
    "
    >
      <table className="  w-full bg-cyan-200 rounded-xl text-left">
        <thead className="bg-cyan-300">
          <tr className="">
            <th className=" py-2 px-4 ">Name</th>
            <th className=" py-2 px-4 ">Quantity</th>
            <th className=" py-2 px-4 ">Expire Date</th>
            {/* <th className=" py-2 px-4 ">ExpireDuration</th> */}
            {/* <th className=" py-2 px-4 "></th> */}
          </tr>
        </thead>
        <tbody className="">
          {itemarra.length > 0
            ? itemarra.map((item) => {
                  return (
                    <tr className="tr" key={item.id}>
                      <td className=" py-2 px-4  ">{item.name}</td>
                      <td className=" py-2 px-4  ">{item.quantity}</td>
                      <td className=" py-2 px-4  ">{item.date}</td>
                      {/* <td className=" py-2 px-4  ">{item.expireDuration}</td> */}
                      {/* <td className=" flex justify-around  py-2 px-4  text-right ">
                        <button
                          className="cursor-pointer "
                          onClick={editHandler.bind(null, item.id)}
                        >
                          <EditSvg />
                        </button>
                        <button
                          className="cursor-pointer"
                          onClick={removeHandler.bind(null, item.id)}
                        >
                          <Delete />
                        </button>
                      </td> */}
                    </tr>
                  );
                })
            : []}
        </tbody>
      </table>
    </div>
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

export default PharmacyExpireList;
