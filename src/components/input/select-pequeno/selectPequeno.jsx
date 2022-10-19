import React from "react";

import "./selectPequeno.css";

function Select(props) {
  const { state, setState, label, options } = props;

  return (
    <div className="entire-select-pequeno">
      <label className="label-select-pequeno">{label}</label>
      <select
        value={state}
        onChange={(event) => setState(event.target.value)}
        className="select-pequeno"
      >
        {options.map((op, key) => (
          <option key={key}>{op}</option>
        ))}
      </select>
    </div>
  );
}

export default Select;
