import React from 'react';

const Input = (props) => {
    return (
        <div className="mb-3">

            <label className="form-label">{props.label}</label>

            <input
                className={props.error ? "form-control is-invalid" : "form-control"}
                type={props.type}
                name={props.name}
                onChange={props.onChangeVeriables}
                defaultValue={props.defaultValue}
                placeholder = {props.placeholder}
                value={props.value}>
            </input>
            
            <div className="invalid-feedback">
                {props.error}
            </div>
            
        </div>
    );
};

export default Input;