import React, {useState} from 'react'
import {Form} from 'react-bootstrap';
import {validation} from '../../helpers/validation'


interface TextControlProps {
  controlId: string | number,
  label: string,
  value: string,
  validType: string,
  errMessage: string,
  changeHandler(value: string): void
}

const TextControl: React.FC<TextControlProps> = ({controlId, label, value, validType, errMessage, changeHandler}) => {

  const [isValid, setIsValid] = useState(true)

  return (
    <Form.Group controlId={controlId} className="mb-3">
    <Form.Label>{label}</Form.Label>
    <Form.Control type="text" placeholder="ФИО" value={value} onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
      changeHandler(e.target.value)
      let temp = validation(validType, e.target.value);
      setIsValid(temp)
    }}/>
    {isValid ? null: <p className="err"> {errMessage} </p>}
    </Form.Group>

  )
}


export default TextControl
