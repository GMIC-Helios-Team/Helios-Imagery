
import React from "react";
import { Form, Row } from "react-bootstrap";  
import { InputProps } from "../types/models";

const ThemeInput: React.FC<InputProps> = ({ formData,handleChange, handleBlur,isValid, errors, isLoading }) => (   
  <Form.Group as={Row} className="mb-3" controlId="theme">
  <Form.Control
    disabled={isLoading}
    type="text"
    placeholder="Theme"
    size="sm"
    value={formData.theme}
    onChange={(e) => handleChange(e as React.ChangeEvent<HTMLInputElement>)}
    onBlur={handleBlur}
    isValid={isValid.theme}
    isInvalid={!!errors.theme} />
  <Form.Control.Feedback type="invalid">{errors.theme}</Form.Control.Feedback>
  <Form.Control.Feedback type="valid" >
    <i className="bi bi-check-circle-fill"></i>
  </Form.Control.Feedback>
</Form.Group>

)

export default ThemeInput;