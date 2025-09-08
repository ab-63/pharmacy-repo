import React, { useContext } from "react";
import { Outlet, Navigate, useLocation, useNavigate } from "react-router-dom";
import { Context } from "../../context/ContextProvider";
import Loading from "../ui/Loading";

function Protected() {
  const { email, password, isLoading, error, messgage } = useContext(Context);
  const navigate = useNavigate();
  const location = useLocation();
  console.log("er");
  if (isLoading) {
    // messgage('ERROR')
    return (
      <>
        <div className="max-w-screen min-h-screen flex justify-center items-center">
          <Loading />;
        </div>
      </>
    );
  }
  // if (email && password) {
  //   navigate("/dashboard");
  // }
  return email && password ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
}

export default Protected;
