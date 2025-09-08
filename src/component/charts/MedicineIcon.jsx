import React from 'react';

const MedicineIcon = ({ width = 16, height = 16, fill = "#141414", className, ...props }) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 128 128"
    className={className}
    fill={fill}
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g id="row3_1_">
      <path
        id="medical_case_1_"
        d="M70.5 52h-8.7v13h-13v8.7h13v13h8.7v-13h13V65h-13V52zm47.1-30.3H10.4c-5.1 0-9.3 4.2-9.3 9.3v78.8c0 5.1 4.2 9.3 9.3 9.3h9.3v9h18.6v-9h51.3v9h18.6v-9h9.3c5.1 0 9.3-4.1 9.3-9.3V30.9c.1-5.1-4.1-9.2-9.2-9.2zM66.2 97.8C50.6 97.8 38 85.2 38 69.7c0-15.5 12.6-28.1 28.2-28.1s28.2 12.6 28.2 28.1c0 15.5-12.7 28.1-28.2 28.1zm-13-89.1h26v10.8h6.5V0H46.6v19.5h6.5V8.7z"
      />
    </g>
  </svg>
);

export default MedicineIcon;
