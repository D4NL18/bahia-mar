import React from "react";

import "./select.css";

function Select(props) {

    return (
        <div className="entire-input-grande">
            <label className="label-input-grande">{props.label}</label>
            <select className="input-grande">{
                props.options.map((op, key) =>
                    <option key={key}>{op}</option>)
            }</select>
        </div>
    );
}

export default Select;
