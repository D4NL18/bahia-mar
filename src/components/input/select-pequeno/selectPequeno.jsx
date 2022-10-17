import React from "react";

import "./selectPequeno.css";

function Select(props) {

    return (
        <div className="entire-select-pequeno">
            <label className="label-select-pequeno">{props.label}</label>
            <select className="select-pequeno">{
                props.options.map((op, key) =>
                    <option key={key}>{op}</option>)
            }</select>
        </div>
    );
}

export default Select;
