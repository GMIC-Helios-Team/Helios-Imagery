import React from "react";
import { Form, Row } from "react-bootstrap";  
import { InputProps } from "../types/models";

const EmailInput: React.FC<InputProps> = ({ formData,handleChange, handleBlur,isValid, errors, isLoading }) => (
  <Form.Group as={Row} className="mb-3" controlId="email">
  <Form.Control
    disabled={isLoading}
    type="text"
    placeholder="Email"
    size="sm"
    value={formData.email}
    onChange={(e) => handleChange(e as React.ChangeEvent<HTMLInputElement>)}
    onBlur={handleBlur}
    isValid={isValid.email}
    isInvalid={!!errors.email} />
  <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
  <Form.Control.Feedback type="valid" >
    <i className="bi bi-check-circle-fill"></i>
  </Form.Control.Feedback>
</Form.Group>

)
export default EmailInput;