import React from "react";

import "./inputPequeno.css";

function InputPequeno(props) {
  return (
    <div className="entire-input-pequeno">
      <label className="label-input-pequeno">{props.label}</label>
      <input type={props.type} className="input-pequeno" style={(props.type === "date") ? { fontSize: '1.4rem' , textAlign: 'center', fontWeight: '600'}: {}} />
    </div>
  );
}

export default InputPequeno;
