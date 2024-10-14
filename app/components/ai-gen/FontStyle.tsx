
import React from "react";
import { Form, Row } from "react-bootstrap";  
import { InputProps } from "@/types/ai-gen";

const FontStyleInput: React.FC<InputProps> = ({ formData,handleChange, handleBlur,isValid, errors, isLoading }) => ( 
  <Form.Group as={Row} className="mb-3" controlId="fontStyle">
  <Form.Control
    disabled={isLoading}
    type="text"
    placeholder="Font Style"
    size="sm"
    value={formData.fontStyle}
    onChange={(e) => handleChange(e as React.ChangeEvent<HTMLInputElement>)}
    onBlur={handleBlur}
    isValid={isValid.fontStyle}
    isInvalid={!!errors.fontStyle} />
  <Form.Control.Feedback type="invalid">{errors.fontStyle}</Form.Control.Feedback>
  <Form.Control.Feedback type="valid" >
    <i className="bi bi-check-circle-fill"></i>
  </Form.Control.Feedback>
</Form.Group>
)

export default FontStyleInput;