function Pagination({filtered,currPage,setFiltered,setCurrPage,numberPages,npages}) {
  
  console.log(numberPages);
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
  return (
    <div className="flex space-x-4 justify-end my-6 items-center ">
      <select
        onClick={selectHandler}
        className="py-1 outline-none text-lg  px-3 cursor-pointer  bg-cyan-300"
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
          <a className="p-1.5 px-3 bg-cyan-300" href="#" onClick={prePage}>
            Pre
          </a>
        </li>
        {numberPages.map((n, i) => {
          return (
            <li key={i}>
              <a
                className={`p-1.5 bg-cyan-300 ${
                  currPage === n ? "bg-cyan-400 " : ""
                }`}
                href="#"
                onClick={() => changeCPage(n)}
              >
                {n}
              </a>
            </li>
          );
        })}
        <li>
          <a className="p-1.5 bg-cyan-300" href="#" onClick={nextPage}>
            Next
          </a>
        </li>
      </ul>
    </div>
  );
}

export default Pagination;
