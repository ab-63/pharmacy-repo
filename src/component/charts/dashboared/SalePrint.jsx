import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import useAppContext from "../../../context/useAppContext";
import ModalPrice from "../../modaloverlay/ModalPrice";

function SalePrint() {
  const { printBill, setIsPrint } = useAppContext();
  const componentRef = useRef(); // ref must always exist
  const date = new Date().toISOString().split("T")[0];
  console.log(printBill);

  const closeModal = () => setIsPrint(false);

  const handlePrint = useReactToPrint({
    contentRef: componentRef, // must return the DOM node
    documentTitle: "Pharmacy Bill",
    removeAfterPrint: true,
  });

  const totalOfBill = printBill.reduce((a, b) => a + b.totalAmount, 0);

  return (
    <ModalPrice onClose={closeModal}>
      <div className=" max-h-[32rem] rounded-lg m-2 overflow-y-auto">
        {/* Always render the printable section */}
        <div
          ref={componentRef}
          className="   overflow-y-auto max-h-[25rem] rounded-lg m-2 p-2
    print:overflow-visible print:max-h-none tabel"
        >
          <h1 className="text-lg font-bold my-3 text-left">
            Luilala Pharmacy
          </h1>
          <p className="font-semibold my-1.5 text-right">Date : {date}</p>
          <table className="w-full">
            <thead className="text-left border-b-2 border-black">
              <tr>
                <th className="py-2 px-4">Name</th>
                <th className="py-2 px-4">Quantity</th>
                <th className="py-2 px-4">Price</th>
                <th className="py-2 px-4">TotalAmount</th>
              </tr>
            </thead>
            <tbody>
              {printBill.map((item, i) => (
                <tr className="border-b border-black" key={i}>
                  <td className="py-2 px-4">{item.name}</td>
                  <td className="py-2 px-4">{item.quantity}</td>
                  <td className="py-2 px-4">${item.price}</td>
                  <td className="py-2 px-4">${item.totalAmount}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="my-4 font-semibold">Total:${totalOfBill}</div>
        </div>

        {/* Buttons */}
        <div className="flex space-x-2 justify-end mt-6 w-full">
          <button
            className="bg-cyan-400 py-1 px-6 border-2 cursor-pointer border-cyan-400 hover:bg-cyan-300 rounded"
            onClick={handlePrint} // call directly
          >
            Print
          </button>

          <button
            className="bg-cyan-400 py-1 px-4 border-2 cursor-pointer border-cyan-400 hover:bg-cyan-300 rounded"
            onClick={closeModal}
          >
            Cancel
          </button>
        </div>
      </div>
    </ModalPrice>
  );
}

export default SalePrint;
