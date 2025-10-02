import React, { useState } from "react";
import Modal from "../../modaloverlay/Modal";
import useAppContext from "../../../context/useAppContext";

function PharmacyEdit({
  id,
  data,
  inputData,
  findMedicine,
  setPharmacyState,
}) {
  //   const [editData, setEditData] = useState(data);
  const [editInputData, setInputData] = useState({
    name: inputData.name || "",
    quantity: inputData.quantity || "",
    expireDuration: inputData.expireDuration || "",
    lowStock: inputData.lowStock || "",
    date: inputData.date || "",
    price: inputData.price || "",
  });
  const { setPharmacyModal } = useAppContext();

  const closePharmacyEdit = () => {
    setPharmacyModal(false);
  };
  const submitHandler = (e) => {
    e.preventDefault();
    setPharmacyState((pre) =>
      pre.map((medicine) => {
        console.log(editInputData);
        return medicine.id === id
          ? {
              ...medicine,
              ...editInputData,
              totalAmount: Number(editInputData.price) * Number(editInputData.quantity),
            }
          : medicine;
      })
    );

    closePharmacyEdit();
  };

  return (
    <Modal onClose={closePharmacyEdit}>
      <div className="px-3 pb-2">
        <div className="mb-6 text-center">
          <div className="flex justify-center mb-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="60"
              height="60"
              fill="#000000"
              viewBox="0 0 256 256"
              className="bg-cyan-400 p-3 rounded-full"
            >
              <path d="M216,56H176V48a24,24,0,0,0-24-24H104A24,24,0,0,0,80,48v8H40A16,16,0,0,0,24,72V200a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V72A16,16,0,0,0,216,56ZM96,48a8,8,0,0,1,8-8h48a8,8,0,0,1,8,8v8H96ZM216,200H40V72H216V200Zm-56-64a8,8,0,0,1-8,8H136v16a8,8,0,0,1-16,0V144H104a8,8,0,0,1,0-16h16V112a8,8,0,0,1,16,0v16h16A8,8,0,0,1,160,136Z"></path>
            </svg>
          </div>
          <h2 className="text-2xl font-semibold">Edit Medicine</h2>
        </div>
        <form
          action=""
          className=" grid gap-3 gap-y-4  grid-cols-2"
          onSubmit={submitHandler}
        >
          <div className="">
            <label htmlFor="Name" className="font-semibold block">
              Name
            </label>
            <input
              type="text"
              id="name"
              placeholder="Name"
              value={editInputData.name}
              className=" py-1.5 outline-none w-full mt-1.5  px-3 border rounded  border-cyan-300"
              onChange={(e) =>
                setInputData((pre) => ({ ...pre, name: e.target.value }))
              }
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
              value={editInputData.quantity}
              className=" py-1.5 outline-none w-full mt-1.5  px-3 border rounded  border-cyan-400"
              onChange={(e) =>
                setInputData((pre) => ({ ...pre, quantity: +e.target.value }))
              }
            />
          </div>

          <div className="">
            <label htmlFor="low-Stock" className="font-semibold block">
              Low Stock
            </label>
            <input
              type="number"
              id="low-Stock"
              placeholder="Low Stock"
              value={editInputData.lowStock}
              className=" py-1.5 outline-none w-full mt-1.5  px-3 border rounded  border-cyan-400"
              onChange={(e) =>
                setInputData((pre) => ({ ...pre, lowStock: +e.target.value }))
              }
            />
          </div>

          <div className="">
            <label htmlFor="Expire Date" className="font-semibold block">
              Expire Date
            </label>
            <input
              type="date"
              id="Expire Date"
              placeholder="Expire Date"
              value={editInputData.date}
              className=" py-1.5 outline-none w-full mt-1.5  px-3 border rounded  border-cyan-400"
              onChange={(e) =>
                setInputData((pre) => ({ ...pre, date: e.target.value }))
              }
            />
          </div>
          <div className="">
            <label htmlFor="Expire Date" className="font-semibold block">
              Price
            </label>
            <input
              type="number"
              id="Expire "
              placeholder="Price"
              value={editInputData.price}
              className=" py-1.5 outline-none w-full mt-1.5  px-3 border rounded  border-cyan-400"
              onChange={(e) =>
                setInputData((pre) => ({ ...pre, price: +e.target.value }))
              }
            />
          </div>
          <div className="">
            <label htmlFor="duration" className="font-semibold block">
              Expire Duration
            </label>
            <input
              type="number"
              id="duration "
              placeholder="Price"
              value={editInputData.expireDuration}
              className=" py-1.5 outline-none w-full mt-1.5  px-3 border rounded  border-cyan-400"
              onChange={(e) =>
                setInputData((pre) => ({
                  ...pre,
                  expireDuration: +e.target.value,
                }))
              }
            />
          </div>

          <div className="col-start-2 mt-4 justify-self-end">
            <button className="bg-cyan-400  py-1.5 px-9 mr-4 rounded hover:bg-cyan-300 transition duration-200 cursor-pointer ">
              Edit
            </button>
            <button
              className="border border-cyan-400  py-1.5 px-6 rounded hover:bg-cyan-300 transition duration-200 cursor-pointer "
              onClick={closePharmacyEdit}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
}

export default PharmacyEdit;
