/* eslint-disable max-len */
/* eslint-disable react/prop-types */
import React, {useState} from 'react';
import {Form} from 'react-bootstrap';
import InputMask from 'react-input-mask';
import {validation} from '../../helpers/validation';

interface DateControlProps {
  controlId: string | undefined,
  label: string,
  mask: string,
  value: string,
  errMessage: string,
  changeHandler(value: string): void
}

const DateControl: React.FC<DateControlProps> = (
    {controlId, label, mask, value, errMessage, changeHandler}) => {
  const [isValid, setIsValid] = useState<boolean>(true);

  return (
    <Form.Group controlId={controlId} className="mb-3">
      <Form.Label>{label}</Form.Label>
      <InputMask mask={mask} className="form-control" value={value} onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
        changeHandler( e.target.value);
        const temp = validation('date', e.target.value);
        setIsValid(temp);
      }}/>
      {isValid ? null: <p className="err"> {errMessage} </p>}
    </Form.Group>
  );
};


export default DateControl;
