import React from "react";
import { Form, Row } from "react-bootstrap";  
import { InputProps } from "@/types/ai-gen";

const VerbInput: React.FC<InputProps> = ({ formData,handleChange, handleBlur,isValid, errors, isLoading }) => ( 
  <Form.Group as={Row} className="mb-3" controlId="verb">
  <Form.Control
    disabled={isLoading}
    type="text"
    placeholder="Verb"
    size="sm"
    value={formData.verb}
    onChange={(e) => handleChange(e as React.ChangeEvent<HTMLInputElement>)}
    onBlur={handleBlur}
    isValid={isValid.verb}
    isInvalid={!!errors.verb} />
  <Form.Control.Feedback type="invalid">{errors.verb}</Form.Control.Feedback>
  <Form.Control.Feedback type="valid" >
    <i className="bi bi-check-circle-fill"></i>
  </Form.Control.Feedback>
</Form.Group>
)

export default VerbInput;