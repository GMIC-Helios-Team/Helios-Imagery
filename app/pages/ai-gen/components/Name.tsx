import React from "react";
import { Form, Row } from "react-bootstrap";  
import { InputProps } from "../types/models";

const NameInput: React.FC<InputProps> = ({ formData,handleChange, handleBlur,isValid, errors, isLoading }) => (
  <Form.Group as={Row} className="mb-3" controlId="name">
  <Form.Control
    disabled={isLoading}
    type="text"
    placeholder="Name"
    required
    size="sm"
    value={formData.name}
    onChange={(e) => handleChange(e as React.ChangeEvent<HTMLInputElement>)}
    onBlur={handleBlur}
    isValid={isValid.name}
    isInvalid={!!errors.name} />
  <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
  <Form.Control.Feedback type="valid" >
    <i className="bi bi-check-circle-fill"></i>
  </Form.Control.Feedback>
</Form.Group>
)

export default NameInput;