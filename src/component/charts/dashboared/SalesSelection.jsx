import React, { useState } from "react";

function SalesSelection({ data, optionHandler, setId }) {
  const [query, setQuery] = useState("");
  const [filtered, setFiltered] = useState([]);

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);

    // filter medicines by text
    const matches = data.filter(
      (d) =>
        d.qauntity > 0 &&
        d.name.toLowerCase().includes(value.toLowerCase())
    );
    setFiltered(matches);

    // if exact match found → set ID
    const match = data.find((d) => d.name === value);
    setId(match ? match.id : undefined);
    optionHandler(value);
  };

  const handleSelect = (name, id) => {
    setQuery(name);
    setFiltered([]); // close dropdown
    setId(id);
    optionHandler(name);
  };

  return (
    <div className="relative">
      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder="Search medicine..."
        className="w-full border-2
         border-cyan-400 rounded p-2 
         outline-none"
      />

      {filtered.length > 0 && (
        <ul className="absolute w-full bg-cyan-100 border rounded shadow-md max-h-40 overflow-auto z-10 tabel">
          {filtered.map((d) => (
            <li
              key={d.id}
              onClick={() => handleSelect(d.name, d.id)}
              className="p-2 cursor-pointer hover:bg-cyan-200"
            >
              {d.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default SalesSelection;
