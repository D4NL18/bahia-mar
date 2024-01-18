import React from "react";

import "./inputGrande.css";

function InputGrande(props) {
  const { state, setState, label, inputProps } = props;

  return (
    <div className="entire-input-grande">
      <label className="label-input-grande">{label}</label>
      <input
        {...inputProps}
        value={state}
        onChange={(event) => setState(event.target.value.trimStart())}
        className="input-grande"
      />
    </div>
  );
}

export default InputGrande;
