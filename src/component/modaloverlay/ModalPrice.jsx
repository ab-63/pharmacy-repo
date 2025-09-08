import React, { Fragment } from "react";

import ReactDOM from "react-dom";
const Overlay = (props) => {
  return (
    <div
      className="min-w-screen min-h-screen fixed
       top-0 left-0 bg-black opacity-56 "
      onClick={props.onClose}
    ></div>
  );
};

const ModalOverlay = (props) => {
  return (
    <div
      className="max-w-2xl lg:w-1/3 md:w-1/2 w-4/5
     bg-cyan-100 absolute top-1/2 left-1/2 
     transform  -translate-y-1/2 -translate-x-1/2 p-3 rounded "
    >
      <div className="flex ">
        <button
          className="cursor-pointer ml-auto hover:text-cyan-500 transition duration-200"
          onClick={props.onClose}
        >
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
              d="M6 18 18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
      {props.children}
    </div>
  );
};

function Modal(props) {
  return (
    <Fragment>
      {ReactDOM.createPortal(
        <Overlay onClose={props.onClose} />,
        document.getElementById("overlay")
      )}
      {ReactDOM.createPortal(
        <ModalOverlay onClose={props.onClose}>{props.children}</ModalOverlay>,
        document.getElementById("overlay")
      )}
    </Fragment>
  );
}

export default Modal;
