import React from "react";

import "./inputPequeno.css";

function InputPequeno(props) {
  const { state, setState, label, inputProps } = props;

  return (
    <div className="entire-input-pequeno">
      <label className="label-input-pequeno">{label}</label>
      <input
        {...inputProps}
        value={state ? state : ""}
        onChange={(event) =>
          setState ? setState(event.target.value.trimStart()) : null
        }
        className="input-pequeno"
        style={
          inputProps && inputProps.type === "date"
            ? { fontSize: "1.4rem", textAlign: "center", fontWeight: "600" }
            : {}
        }
      />
    </div>
  );
}

export default InputPequeno;
