import React from "react";

import "./selectMedio.css";

function Select(props) {
  const { state, setState, label, options } = props;

  return (
    <div className="entire-select-medio">
      <label className="label-select-medio">{label}</label>
      <select
        value={state}
        onChange={(event) => setState(event.target.value)}
        className="select-medio"
      >
        {options.map((op, key) => (
          <option key={key}>{op}</option>
        ))}
      </select>
    </div>
  );
}

export default Select;
