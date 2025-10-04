import React from "react";
import useAppContext from "../../../../context/useAppContext";
function PrescriptionList({ items, searData }) {
  const itemarra = items || [];
  // const { editMedodalOpen } = useAppContext();

  return (
    <div
      className="overflow-scroll max-h-[28rem] shadow-md rounded-lg
  overflow-y-auto overflow-x-auto scrollbar scrollbar-thumb-cyan-900 scrollbar-track-cyan-100
  tabel
  "
    >
      <table className=" w-full bg-cyan-100 rounded-xl">
        <thead className="bg-cyan-300 text-left">
          <tr className="">
            <th className=" py-2 px-4 ">PatientName</th>
            <th className=" py-2 px-4 ">Medicine</th>
            <th className=" py-2 px-4 "> DoctorName</th>
            <th className=" py-2 px-4 ">Date</th>
          </tr>
        </thead>
        <tbody className="">
          {itemarra.length > 0 ? (
            itemarra
              .filter((search) =>
                searData === ""
                  ? search
                  : search.patientName
                      .toLowerCase()
                      .includes(searData.toLowerCase())
              )
              .map((item) => {
                return (
                  <tr className="tr" key={item.id}>
                    <td className=" py-2 px-4  ">{item.patientName}</td>
                    <td className=" py-2 px-4  ">{item.medicine}</td>
                    <td className=" py-2 px-4  ">{item.doctorName}</td>
                    <td className=" py-2 px-4  ">{item.date}</td>

                    {/* <td className=" flex justify-end  py-1 px-4  text-right ">

                      </td> */}
                  </tr>
                );
              })
          ) : (
            <tr>
              <td colSpan="5" className="text-center py-4 text-gray-500 italic">
                No purchases found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default PrescriptionList;
