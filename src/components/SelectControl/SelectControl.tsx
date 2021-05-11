/* eslint-disable max-len */
/* eslint-disable react/prop-types */
import React from 'react';
import {Form} from 'react-bootstrap';


interface SelectControlProps {
  controlId: string,
  label: string,
  options: Array<string>,
  value: string,
  changeHandler(value: string): void,
  disabled: boolean | never
}

const SelectControl: React.FC<SelectControlProps> =
({controlId, label, options, value, changeHandler, disabled=false}) => {
  return (
    <Form.Group controlId={controlId} className="mb-3">
      <Form.Label>{label}</Form.Label>
      <Form.Control as="select" value={value} onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
        changeHandler(e.target.value);
      }} disabled={disabled}>
        {options.map((option) => {
          return <option key={option}>{option}</option>;
        })}
      </Form.Control>
    </Form.Group>

  );
};


export default SelectControl;
