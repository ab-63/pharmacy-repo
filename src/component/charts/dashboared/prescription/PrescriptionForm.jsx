import React, { Fragment, useState } from "react";
import Modal from "../../../modaloverlay/Modal";
import useAppContext from "../../../../context/useAppContext";
import { all } from "axios";
function PrescriptionForm({ closeModal, onData }) {
  //   const { modalOpen, closeModal } = useAppContext();
  const [enterPantientName, setPatientName] = useState("");
  const [docotorName, setDocotorName] = useState("");
  const [enterDate, setDate] = useState("");
  const [enterMedicines, setMedicines] = useState("");
  const submitHandler = (e) => {
    e.preventDefault();

    const allData = {
      id: new Date().getTime().toString(),
      patientName: enterPantientName,
      medicine: enterMedicines,
      doctorName: docotorName,
      date: enterDate,
    };
    if (enterPantientName && enterMedicines && docotorName && enterDate) {
      onData(allData);
      closeModal()
    }
  };
  return (
    <Fragment>
      <Modal onClose={closeModal}>
        <div className="px-3 pb-2">
          <div className="mb-6 text-center">
            <div className="flex justify-center mb-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="bg-cyan-400 py-4.5 rounded-full"
                height="64"
                width="64"
                viewBox="0 0 384 512"
              >
                {" "}
                <path
                  d="M0 32C0 14.3 14.3 0 32 0L352 0c17.7 0 32 14.3 32 32l0 
                32c0 17.7-14.3 32-32 32L32 96C14.3 96 0 81.7 0 64L0 32zM32 144l320 0 0
                 304c0 35.3-28.7 64-64 64L96 512c-35.3 0-64-28.7-64-64l0-304zM160 248l0
                  40-40 0c-8.8 0-16 7.2-16 16l0 32c0 8.8 7.2 16 16 16l40 0 0 40c0 8.8 7.2 16
                   16 16l32 0c8.8 0 16-7.2 16-16l0-40 40 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-40 0 0-40c0-8.8-7.2-16-16-16l-32 0c-8.8 0-16 7.2-16 16z"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-semibold">Prescription</h2>
          </div>
          <form
            action=""
            className=" grid gap-3 gap-y-4  grid-cols-2"
            onSubmit={submitHandler}
          >
            <div className="">
              <label htmlFor="Patient " className="font-semibold block">
                Patient Name
              </label>
              <input
                type="text"
                id="Patient"
                placeholder="Patient Name"
                value={enterPantientName}
                className=" py-1.5 outline-none w-full mt-1.5  px-3 border rounded  border-cyan-300"
                onChange={(e) => setPatientName(e.target.value)}
              />
            </div>
            <div className="">
              <label htmlFor=" Medicine" className="font-semibold block">
                Medicine
              </label>
              <input
                type="text"
                id=" Medicine"
                placeholder="Medicine"
                value={enterMedicines}
                className=" py-1.5 outline-none w-full mt-1.5  px-3 border rounded  border-cyan-300"
                onChange={(e) => setMedicines(e.target.value)}
              />
            </div>
            <div className="">
              <label htmlFor="Doctor Name" className="font-semibold block">
                Doctor Name
              </label>
              <input
                type="text"
                id="Doctor Name"
                placeholder="Doctor Name"
                value={docotorName}
                className=" py-1.5 outline-none w-full mt-1.5  px-3 border rounded  border-cyan-300"
                onChange={(e) => setDocotorName(e.target.value)}
              />
            </div>
            <div className="">
              <label htmlFor="Date" className="font-semibold block">
                Date
              </label>
              <input
                type="date"
                id="Date"
                placeholder="Date"
                value={enterDate}
                className=" py-1.5 outline-none w-full mt-1.5  px-3 border rounded  border-cyan-300"
                onChange={(e) => setDate(e.target.value)}
              />
            </div>

            <div className="col-start-2 flex justify-end space-x-4">
              <button
                type="submit"
                className="bg-cyan-400  py-1.5 px-9 rounded hover:bg-cyan-300 transition duration-200 cursor-pointer mt-4 justify-self-end"
              >
                OK
              </button>
              <button
                type="button"
                onClick={closeModal}
                className="border-2 border-cyan-400  py-1.5 px-6 rounded hover:bg-cyan-300 transition duration-200 cursor-pointer mt-4 justify-self-end"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </Fragment>
  );
}

export default PrescriptionForm;
