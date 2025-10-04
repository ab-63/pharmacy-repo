import React, { useContext, useEffect, useRef, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import context from "../../context/useAppContext";
import { Context } from "../../context/ContextProvider";
import Loading from "../ui/Loading";

function Autenticate() {
  const navigate = useNavigate();
  const ctx = useContext(Context);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const emailRef= useRef()
  // const passwordRef= useRef()

  const emailHandler = (e) => {
    const value = e.target.value;
    setEmail(value);
  };

  // useEffect(() => {
  //   localStorage.setItem("Email", JSON.stringify(email));
  //   localStorage.setItem("Password", JSON.stringify(password));
  // }, [email, password]);
  // useEffect(() => {
  //   ctx.isEmail = true;
  //   ctx.isPassword = true;
  // }, [email, password]);

  const passwordlHandler = (e) => {
    const value = e.target.value;
    setPassword(value);
  };

  // useEffect(()=>{

  //   if (ctx.isEmail && ctx.isPassword) {
  //     navigate("/dashboard");
  //   }
  // },[])
  // useEffect(() => {
  //   if (ctx.isEmail && ctx.isPassword) {
  //     // navigate('/dashboard');
  //   }
  // }, [ctx.isEmail, ctx.isPassword, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();
    ctx.loadData("LOADING");
    ctx.emailHanderl("EMAIL", email);
    ctx.passwordHanderl("PASSWORD", +password);
    //  <Navigate to="/dashboard"/>;
    navigate("/");
    ctx.loadData("CLOSEL");
  };
  return (
    <div className=" relative flex items-center bg-gray-100 min-h-screen min-w-screen p-2">
      {/* <div className="absolute left-1/2 transform -translate-x-1/2">{ctx.isLoading && <Loading />}</div> */}
      <div className="max-w-130 w-4/3 mx-auto bg-white rounded-md shadow-2xl h-full p-8 ">
        <div className="flex  justify-center mb-8">
          <svg
            className="w-16 h-16"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
            />
          </svg>
        </div>
        <h2 className="text-3xl font-bold  mb-2">Welcome back</h2>
        <p className="text-lg mb-6 text-gray-500">
          Enter your Email and Password and login to your user account{" "}
        </p>
        <form className=" space-y-4" onSubmit={submitHandler}>
          <div className="">
            <label className="flex  mb-2 space-x-14 "><p>Email</p> <span>This is the Email (m@gmail.com)</span></label>
            <input
              type="email"
              placeholder="user@gmail.com"
              onChange={emailHandler}
              value={email}
              // ref={emailHandler}
              className={` w-full py-2 px-2 border border-gray-400 rounded outline-none ${
                ctx.isEmail ? "border-gray-400" : "border-red-500"
              }`}
            />
            {!ctx.isEmail && <p className="text-red-500 "> Invalid Email</p>}
          </div>
          <div className="mb-7">
            <label className=" mb-2 w-full flex space-x-8"><p>Password</p> <span className="">This is the password (1234)</span></label>
            <input
              type="password"
              placeholder="Enter Your Password"
              value={password}
              onChange={passwordlHandler}
              // ref={passwordlHandler}
              min="3"
              max="6"
              className={` w-full py-2 px-2 border border-gray-400 rounded outline-none ${
                ctx.isPassword ? "border-gray-400" : "border-red-500"
              }`}
            />
            {!ctx.isPassword && (
              <p className="text-red-500 "> Invalid Password</p>
            )}
          </div>
          <div>
            <button
              className={`bg-blue-500 py-2 w-full rounded text-blue-50 hover:bg-blue-600 transition duration-200 cursor-pointer`}
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Autenticate;
