import React from "react";

import "./inputVendas.css";

function InputVendas(props) {
  const { state, setState, label, inputProps } = props;

  return (
    <div className="entire-input-vendas">
      <label className="label-input-vendas">{label}</label>
      <input
        {...inputProps}
        value={state ? state : ""}
        onChange={(event) =>
          setState ? setState(event.target.value.trimStart()) : null
        }
        className="input-vendas"
        style={{ fontSize: "1.2rem", textAlign: "center", fontWeight: "600" }}
      />
    </div>
  );
}

export default InputVendas;
