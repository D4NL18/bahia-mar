import React from "react";

import "./inputGrande.css";

function InputGrande(props) {
  return (
    <div className="entire-input-grande">
      <label className="label-input-grande">{props.label}</label>
      <input type={props.type} className="input-grande" />
    </div>
  );
}

export default InputGrande;
