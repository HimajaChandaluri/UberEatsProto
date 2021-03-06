import React from "react";
import "../../App.css";

const Input = (props) => {
  return (
    <div className="form-group" style={{ paddingTop: "10px" }}>
      <label htmlFor={props.name}> {props.label}</label>
      <input
        disabled={props.isDisabled ? "disabled" : ""}
        value={props.value}
        onChange={props.onChange}
        name={props.name}
        id={props.name}
        type={props.type}
        className="form-control form-element"
        min={props.min ?? undefined}
        max={props.max ?? undefined}
      />
      {props.error && <div className="alert alert-danger">{props.error}</div>}
    </div>
  );
};

export default Input;
