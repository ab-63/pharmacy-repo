import { useEffect, useState } from "react";
import useAppContext from "../../../context/useAppContext";
import Modal from "../../modaloverlay/Modal";
import { AdminSvg } from "../AdminSvg";
import ProfileImg from "../../../profile/jon.png";
const initialItem = [];

const EmailInitialState = () => {
  const data = localStorage.getItem("Email");

  try {
    return data ? data : initialItem;
  } catch (error) {
    console.error(error);
    return initialItem;
  }
};
function AdminPanel() {
  const { fullName, setFullName } = useAppContext();
  const [editData, setEditData] = useState({
    name: "",
    email: "",
    password: "",
  });
  // const [enterPassword, setPassword] = useState();
  // const [enterFullName, setEnterfullName] = useState();
  const [showModal, setisShowModal] = useState(false);
  const [emailSate, setEmailState] = useState(() => EmailInitialState());

  const openModal = () => {
    setisShowModal(true);
  };
  const closeModal = () => {
    setisShowModal(false);
  };
  const submitHandler = (e) => {
    e.preventDefault();

    localStorage.setItem("Email", editData.email);
    localStorage.setItem("Password", editData.password);
    localStorage.setItem("FullName", JSON.stringify(editData.name));
    setEmailState(editData.email);
    setFullName(editData.name);
    closeModal();
  };

  return (
    // <div className="max-w-3xl rounded-lg shadow-xl m-auto w-4/5 p-5 mt-16">
    <>
      <div className=" max-w-[70rem] px-8 mt-8   container m-auto flex">
        <div className=" max-w-xl w-2/3 overflow-hidden bg-cyan-100 rounded-xl shadow-2xl">
          <table className=" w-full bg-cyan-100 rounded-xl">
            <thead className="bg-cyan-300 text-left">
              <tr className="">
                <th className=" py-2 px-4 ">Image</th>
                <th className=" py-2 px-4 ">Name</th>
                <th className=" py-2 px-4 ">Email</th>
                <th className=" py-2 px-4 "></th>
              </tr>
            </thead>
            <tbody className="">
              <tr className="tr">
                <td className=" py-2 px-4  ">
                  <img
                    src={ProfileImg}
                    alt=""
                    className="w-14 rounded-full border-2 border-cyan-300"
                  />
                </td>
                <td className=" py-2 px-4  ">{fullName}</td>
                <td className=" py-2 px-4  ">{emailSate}</td>
                <td className=" py-2 px-4  ">
                  <button className="cursor-pointer" onClick={openModal}>

                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6"
                    >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                    />
                  </svg>
                      </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="ml-auto">
          {/* <button
            onClick={() => openModal()}
            className="  bg-cyan-300 py-1.5 cursor-pointer hover:opacity-70 transition duration-200 font-semibold px-8 rounded-lg flex  justify-between space-x-1"
          >
            Add User
          </button> */}
        </div>
      </div>
      {showModal && (
        <Modal onClose={closeModal}>
          <div className="">
            <h3 className="flex flex-col items-center justify-center mb-4 space-y-2 text-2xl font-semibold">
              <div className="bg-cyan-300 p-3 rounded-full w-16 flex justify-center items-center h-16">
                <AdminSvg />
              </div>
              <span>Add New User</span>
            </h3>
            <form className=" grid grid-cols-2  gap-4" onSubmit={submitHandler}>
              <div className="">
                <label className="block mb-2 ">Name</label>
                <input
                  type="text"
                  placeholder="Enter Your Name"
                  // ref={passwordlHandler}
                  value={editData.name}
                  onChange={(e) =>
                    setEditData((pre) => ({ ...pre, name: e.target.value }))
                  }
                  className={` w-full py-2 px-2 border border-cyan-400 rounded outline-none`}
                />
              </div>
              <div className="">
                <label className="block mb-2 ">Email</label>
                <input
                  type="email"
                  placeholder="user@gmail.com"
                  // ref={emailHandler}
                  value={editData.email}
                  onChange={(e) =>
                    setEditData((pre) => ({ ...pre, email: e.target.value }))
                  }
                  className={` w-full py-2 px-2 border border-cyan-400 rounded outline-none`}
                />
              </div>
              <div className="">
                <label className="block mb-2 ">Password</label>
                <input
                  type="password"
                  placeholder="Enter Your Password"
                  // ref={passwordlHandler}
                  value={editData.password}
                  onChange={(e) =>
                    setEditData((pre) => ({ ...pre, password: e.target.value }))
                  }
                  min="3"
                  max="6"
                  className={` w-full py-2 px-2 border border-cyan-400 rounded outline-none`}
                />
              </div>
              <div className="">
                <label className="block mb-2 ">Image</label>
                <input
                  type="text"
                  placeholder=" Your Image"
                  className={` w-full py-2 px-2 border border-cyan-400 rounded outline-none`}
                />
              </div>
              <div className="flex justify-end col-span-2">
                <button
                  className={`bg-cyan-400 py-2 px-8  rounded text-black hover:bg-cyan-500 transition duration-200 cursor-pointer`}
                >
                  Add User
                </button>
              </div>
            </form>
          </div>
        </Modal>
      )}
    </>
    // </div>
  );
}

export default AdminPanel;
