import React, { useState, useEffect } from "react";

function SalesSelection({ data = [], setId, value, onChange }) {
  const [filtered, setFiltered] = useState([]);
  const [isOpen, setIsOpen] = useState(false); // controls dropdown visibility

  // Update filtered list whenever value or data changes
  useEffect(() => {
    if (!value && !isOpen) {
      setFiltered([]);
      return;
    }

    const matches = data.filter(
      (d) =>
        d.quantity > 0 &&
        d.name.toLowerCase().includes(value?.toLowerCase() || "")
    );
    setFiltered(matches);
  }, [value, data, isOpen]);

  const handleSelect = (medicine) => {
    onChange(medicine.name); // update input in parent
    setId(medicine.id);      // set selected medicine id
    setFiltered([]);         // hide dropdown
    setIsOpen(false);        // close dropdown
  };

  const handleInputClick = () => {
    // Show all available medicines on input click
    const matches = data.filter((d) => d.quantity > 0);
    setFiltered(matches);
    setIsOpen(true);
  };

  return (
    <div className="relative">
      <input
        type="text"
        value={value || ""}
        onChange={(e) => {
          onChange(e.target.value);
          setIsOpen(true); // show dropdown while typing
        }}
        onClick={handleInputClick} // show dropdown on click
        placeholder="Search medicine..."
        className="w-full border-2 border-cyan-400 rounded p-2 outline-none"
        autoComplete="off"
      />

      {isOpen && filtered.length > 0 && (
        <ul className="absolute w-full bg-cyan-100 border rounded shadow-md max-h-40 overflow-auto z-10">
          {filtered.map((d) => (
            <li
              key={d.id}
              onClick={() => handleSelect(d)}
              className="p-2 cursor-pointer hover:bg-cyan-200"
            >
              {d.name} —{" "}
              <span className="text-sm text-gray-600">{d.quantity} left</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default SalesSelection;
