import React from "react";

function CharSvg() {
  return (
    <div>
      <svg
        width="40%"
        height="40%"
        style={{
          color: "black",
          opacity: "0.3",
          width: "90px",
          height: "80px",
        }}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M18 20V10M12 20V4M6 20V14"
          stroke="currentColor"
          stroke-width="4"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </div>
  );
}

export default CharSvg;
