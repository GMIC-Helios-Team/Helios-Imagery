import React from "react";
import { Form, Row } from "react-bootstrap";  
import { InputProps } from "../types/models";

const NounInput: React.FC<InputProps> = ({ formData,handleChange, handleBlur,isValid, errors, isLoading }) => ( 
  <Form.Group as={Row} className="mb-3" controlId="noun">
  <Form.Control
    disabled={isLoading}
    type="text"
    placeholder="Noun"
    size="sm"
    value={formData.noun}
    onChange={(e) => handleChange(e as React.ChangeEvent<HTMLInputElement>)}
    onBlur={handleBlur}
    isValid={isValid.noun}
    isInvalid={!!errors.noun} />
  <Form.Control.Feedback type="invalid">{errors.noun}</Form.Control.Feedback>
  <Form.Control.Feedback type="valid" >
    <i className="bi bi-check-circle-fill"></i>
  </Form.Control.Feedback>
</Form.Group>
)

export default NounInput;