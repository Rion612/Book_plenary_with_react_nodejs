import React from "react";
import './Input.scss';

const Input = (props) => {
  return (
    <div>
      <label>
        {props.label}
      </label>
      <input
        type={props.type}
        placeholder={props.placeholder}
        name={props.name}
        value={props.value}
        onChange={props.onChange}
        onBlur={props.onBlur}
      ></input>
    </div>
  );
};

export default Input;
