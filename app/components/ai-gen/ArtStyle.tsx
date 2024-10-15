import React from "react";
import { Form, Row } from "react-bootstrap";  
import { InputProps } from "@/types/ai-gen";

const ArtStyleInput: React.FC<InputProps> = ({ formData,handleChange, handleBlur,isValid, errors, isLoading }) => ( 

  <Form.Group as={Row} className="mb-3" controlId="artStyle">
  <Form.Control
    disabled={isLoading}
    type="text"
    placeholder="Choose the artistic influence (e.g., watercolor, abstract, sci-fi)."
    size="sm"
    value={formData.artStyle}
    onChange={(e) => handleChange(e as React.ChangeEvent<HTMLInputElement>)}
    onBlur={handleBlur}
    isValid={isValid.artStyle}
    isInvalid={!!errors.artStyle} />
  <Form.Control.Feedback type="invalid">{errors.artStyle}</Form.Control.Feedback>
  <Form.Control.Feedback type="valid" >
    <i className="bi bi-check-circle-fill"></i>
  </Form.Control.Feedback>
</Form.Group>
)

export default ArtStyleInput; 