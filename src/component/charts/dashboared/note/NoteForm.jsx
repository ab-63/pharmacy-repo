import { useRef } from "react";

function NoteForm({ onData }) {
  const inputValue = useRef();

  const submithHandler = (e) => {
    e.preventDefault();
    const value = inputValue.current.value;
    // console.log(value)

    const allValue = {
      id: Date.now().toString(),
      date: new Intl.DateTimeFormat("en-CA", {
        year: "numeric",
        month: "numeric",
        day: "numeric",
      }).format(new Date()),
      text: value,
    };

    if (allValue.text) {
      onData(allValue);
    }

    inputValue.current.value = "";
  };
  return (
    <div className="bg-cyan-300 rounded-xl p-4 h-[280px] ">
      <form
        className="flex flex-col justify-between h-full"
        onSubmit={submithHandler}
      >
        <textarea
          placeholder="Write Your Note"
          rows={6}
          ref={inputValue}
          className="rounded-xl w-full resize-none bg-cyan-300 outline-none"
        ></textarea>
        <div className="flex justify-between">
          <div className="div">
            {new Intl.DateTimeFormat("en-CA", {
              year: "numeric",
              month: "numeric",
              day: "numeric",
            }).format(new Date())}
          </div>
          <button className="bg-cyan-500 px-5.5 py-1 hover:bg-cyan-400 cursor-pointer animation duration-200 rounded">
            Save
          </button>
        </div>
    
      </form>
    </div>
  );
}

export default NoteForm;
