import { useEffect, useState } from "react";
import NoteForm from "./NoteForm";
import NoteList from "./NoteList";

const item = [];
const initialState = () => {
  const data = localStorage.getItem("Note");

  try {
    return data ? JSON.parse(data) : item;
  } catch (err) {
    console.error(err, "LocaleStorage");
    return item;
  }
};
function Note() {
  const [noteValue, setNoteValue] = useState(() => initialState());
  const [enterSearch, setSearch] = useState("");

  useEffect(() => {
    localStorage.setItem("Note", JSON.stringify(noteValue));
  }, [noteValue]);

  const dataHandler = (value) => {
    setNoteValue((pre) => [...pre, { ...value }]);
  };

  const deleteHandler = (id) => {
    console.log(id);
    setNoteValue((pre) => pre.filter((note) => +note.id !== +id));
  };
  return (
    <div className="max-w-[70rem] px-8 container m-auto my-4">
      <div className=" ">
      <div className="grid grid-cols-2 justify-between items-center my-6">
        <input
          type="text"
          className="py-1.5 px-3 lg:w-1/2 bg-cyan-300 rounded-lg text-lg outline-0"
          placeholder="Search"
          onChange={(e) => setSearch(e.target.value)}
        />
       
      </div>
        <div className="">
          {
            <ul className="grid xl:grid-cols-4 items-start lg:grid-cols-3 md:grid-cols-2 grid-cols-1  gap-2 ">
              {noteValue.filter(data=> enterSearch ? data.text.toLowerCase().includes(enterSearch.toLowerCase()):data).map((data) => {
                return (
                  <li
                    key={data.id}
                    className=" bg-cyan-300 p-4 rounded-xl flex flex-col "
                  >
                    <p className="flex-grow overflow-auto break-words mb-3">
                      {data.text}
                    </p>
                    <div className="mt-auto self-end flex justify-between w-full">
                      <p>{data.date}</p>
                      <button
                        className=" bg-cyan-500 px-3 py-1 rounded hover:bg-cyan-400 cursor-pointer animation duration-200"
                        onClick={deleteHandler.bind(null, data.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </li>
                );
              })}
              <li>
                <NoteForm onData={dataHandler} />
              </li>
            </ul>
          }
          {/* <NoteList noteData={noteValue} /> */}
        </div>
        <div className=""></div>
      </div>
    </div>
  );
}

export default Note;
