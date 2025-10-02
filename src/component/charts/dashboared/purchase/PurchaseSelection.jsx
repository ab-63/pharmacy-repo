import React, { useState, useEffect, useRef } from "react";

function PurchaseSelection({ data = [], optionHandler, setId, placeholder = "Search medicine..." }) {
  const [query, setQuery] = useState("");
  const [filtered, setFiltered] = useState([]);
  const [isOpen, setIsOpen] = useState(false); // ✅ dropdown open state
  const listRef = useRef(null);

  useEffect(() => {
    if (!query) {
      setFiltered(data); // ✅ show full list when empty
    } else {
      const matches = data.filter((d) =>
        (d.name || "").toLowerCase().includes(query.toLowerCase())
      );
      setFiltered(matches);
    }
  }, [query, data]);

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);

    const match = data.find((d) => d.name.toLowerCase() === value.toLowerCase());
    setId(match ? match.id : undefined);

    optionHandler(value);
  };

  const handleSelect = (name, id) => {
    setQuery(name);
    setFiltered([]); // hide list
    setIsOpen(false);
    setId(Number(id));
    optionHandler(name);
  };

  const handleFocus = () => {
    setIsOpen(true); // ✅ open list on focus
    setFiltered(data); // show all by default
  };

  const handleBlur = () => {
    setTimeout(() => setIsOpen(false), 100); // ✅ close after click delay
  };

  return (
    <div className="relative">
      <input
        type="text"
        value={query}
        onChange={handleChange}
        onFocus={handleFocus} // ✅ open when focus
        onBlur={handleBlur}  // ✅ close on blur
        placeholder={placeholder}
        className="w-full border-2 border-cyan-400 rounded p-2 outline-none"
      />
      {isOpen && filtered.length > 0 && (
        <ul
          ref={listRef}
          className="absolute w-full bg-cyan-100 border rounded shadow-md max-h-40 overflow-auto z-10"
        >
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

export default PurchaseSelection;
