import React from "react";

import "./select.css";

function Select(props) {
  const { state, setState, label, options } = props;
  return (
    <div className="entire-input-grande">
      <label className="label-input-grande">{label}</label>
      <select
        value={state}
        onChange={(event) => setState(event.target.value)}
        className="input-grande"
      >
        {options.map((op, key) => (
          <option key={key}>{op}</option>
        ))}
      </select>
    </div>
  );
}

export default Select;
