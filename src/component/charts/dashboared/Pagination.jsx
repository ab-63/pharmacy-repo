import { useEffect, useState } from "react";

function Pagination({
  filtered,
  currPage,
  setFiltered,
  setCurrPage,
  numberPages,
  npages,
}) {
  const [isNextDisabed, setNextDisabled] = useState(false);
  const [isPreDisabed, setPreDisabled] = useState(false);
  const [enterInputValue, setInputValue] = useState(currPage);
  useEffect(() => {
    setNextDisabled(currPage === npages);
    setPreDisabled(currPage === 1);
    setInputValue(currPage);
  }, [currPage, npages]);
  const selectHandler = (e) => {
    const num = +e.target.value;
    setFiltered(num);
    setCurrPage(1);
  };

  const changeCPage = (numPage) => {
    setCurrPage(numPage);
  };
  const prePage = () => {
    if (currPage !== 1) {
      setCurrPage(currPage - 1);
    }
  };
  const nextPage = () => {
    if (currPage !== npages) {
      setCurrPage(currPage + 1);
    }
  };
  const onEnterHandler = (e) => {
    const value = +enterInputValue;
    if (e.key === "Enter") {
      if (value >= 1 && value <= npages) {
        setCurrPage(value );
      }
      else{
        setCurrPage(1)
      }
      console.log(value);
    }
  };
  return (
    <div className="flex space-x-4 justify-end my-6 ">
      <select
        onClick={selectHandler}
        className=" py-0.5 outline-none text-lg  px-3 cursor-pointer  bg-cyan-300"
      >
        <option value="5">5</option>
        <option value="10">10</option>
        <option value="15">15</option>
        <option value="20">20</option>
        <option value="30">30</option>
        <option value="40">40</option>
        <option value="50">50</option>
        <option value="100">100</option>
      </select>
      <ul className="flex">
        <li>
          <button
            className={`p-1 px-3 bg-cyan-300 cursor-pointer ${
              isPreDisabed ? "cursor-not-allowed bg-cyan-500" : ""
            }`}
            onClick={prePage}
            disabled={isPreDisabed}
          >
            Pre
          </button>
        </li>
        {/* {numberPages.map((n, i) => {
          return (
            <li key={i}>
              <button
                className={`p-1.5 bg-cyan-300 cursor-pointer ${currPage === n ? 'bg-cyan-400':''}`}
                onClick={() => changeCPage(n)}
              >
                {n}
              </button>
            </li>
          );
        })} */}
        <input
          type="number"
          className="max-w-16 bg-cyan-100 
        outline-none px-2 "
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={onEnterHandler}
          placeholder="Page"
          value={enterInputValue}
          max={npages}
          min="1"
          required
        />
          <div className="bg-cyan-100 w-[3rem] flex justify-center items-center"> of
           <span className="font-semibold ml-2"> { npages}</span></div>
        <li>
          <button
            className={`p-1 bg-cyan-300 cursor-pointer ${
              isNextDisabed ? "cursor-not-allowed bg-cyan-500" : ""
            }`}
            onClick={nextPage}
            disabled={isNextDisabed}
          >
            Next
          </button>
        </li>
      </ul>
    </div>
  );
}

export default Pagination;
