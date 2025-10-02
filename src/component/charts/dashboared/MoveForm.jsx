import { useState } from "react";
import useAppContext from "../../../context/useAppContext";
import Modal from "../../modaloverlay/ModalPrice";

function MoveForm({ closeModal, onData }) {
  const {error,setError} = useAppContext()
  const [enterPrice, setPrice] = useState("");
  const [enterQauntity, setQauntity] = useState("");
  const [enterLowStock, setLowStock] = useState("");
  const [enterExpireDuration, setExpireDuration] = useState("");

  
  const submitHandler = (e) => {
    e.preventDefault();


    const data = {
      price: enterPrice,
      quantity: +enterQauntity,
      lowStockPh: +enterLowStock,
      expireDuration: +enterExpireDuration,
      totalAmount:Number(enterQauntity)* Number(enterPrice)
    };
    if(data.price&& data.quantity && data.lowStockPh,data.expireDuration){

      onData(data);

    }
    if(error){
      closeModal()

    }
  };
  return (
    <Modal onClose={closeModal}>
      <div className="px-3 pb-2">
        <div className="mb-6 text-center">
          <div className="flex justify-center mb-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="54"
              height="54"
              fill="#000000"
              viewBox="0 0 256 256"
              className="bg-cyan-300 p-3 rounded-full"
            >
              <path d="M216.42,39.6a53.26,53.26,0,0,0-75.32,0L39.6,141.09a53.26,53.26,0,0,0,75.32,75.31h0L216.43,114.91A53.31,53.31,0,0,0,216.42,39.6ZM103.61,205.09h0a37.26,37.26,0,0,1-52.7-52.69L96,107.31,148.7,160ZM205.11,103.6,160,148.69,107.32,96l45.1-45.09a37.26,37.26,0,0,1,52.69,52.69ZM189.68,82.34a8,8,0,0,1,0,11.32l-24,24a8,8,0,1,1-11.31-11.32l24-24A8,8,0,0,1,189.68,82.34Z"></path>
            </svg>
          </div>
          <h2 className="text-2xl font-semibold">Move Medicine</h2>
        </div>
        <form
          action=""
          className=" grid gap-3 gap-y-4  grid-cols-2"
          onSubmit={submitHandler}
        >
          <div className="">
            <label htmlFor="Price" className="font-semibold block">
              Price
            </label>
            <input
              type="number"
              id="Price"
              placeholder="Price"
              value={enterPrice}
              className=" py-1.5 outline-none w-full mt-1.5  px-3 border rounded  border-cyan-300"
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
          <div className="">
            <label htmlFor="Qauntity" className="font-semibold block">
              Qauntity
            </label>
            <input
              type="number"
              id="Qauntity"
              placeholder="Qauntity"
              value={enterQauntity}
              className=" py-1.5 outline-none w-full mt-1.5  px-3 border rounded  border-cyan-300"
              onChange={(e) => setQauntity(e.target.value)}
            />
          </div>
          <div className="">
            <label htmlFor="stock" className="font-semibold block">
             Min Level
            </label>
            <input
              type="number"
              id="stock"
              placeholder="Low Stock"
              value={enterLowStock}
              className=" py-1.5 outline-none w-full mt-1.5  px-3 border rounded  border-cyan-300"
              onChange={(e) => setLowStock(e.target.value)}
            />
          </div>
          <div className="">
            <label htmlFor="duration" className="font-semibold block">
            Expire Duration
            </label>
            <input
              type="number"
              id="duration"
              placeholder="Expire Duration"
              value={enterExpireDuration}
              className=" py-1.5 outline-none w-full mt-1.5  px-3 border rounded  border-cyan-300"
              onChange={(e) => setExpireDuration(e.target.value)}
            />
          </div>
         {error &&  <p className="text-red-500 col-start-1">Your Quantity is less </p>}
<div  className="col-start-2 mt-4 justify-self-end flex items-end">

          <button className="bg-cyan-400  py-1.5 px-6 rounded hover:bg-cyan-300 transition duration-200 cursor-pointer">
            Submit
          </button>
</div>
        </form>
      </div>
    </Modal>
  );
}

export default MoveForm;
