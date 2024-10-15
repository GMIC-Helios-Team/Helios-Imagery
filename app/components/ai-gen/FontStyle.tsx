
import React from "react";
import { Form, Row } from "react-bootstrap";  
import { SelectProps } from "@/types/ai-gen";

const FontStyleInput: React.FC<SelectProps> = ({ formData,handleChange, handleBlur,isValid, isLoading }) => ( 
  <Form.Group as={Row} className="mb-3" controlId="fontStyle">
  <Form.Select
    disabled={isLoading}
    size="sm"
    value={formData.fontStyle}
    isValid={isValid.fontStyle}
    onChange={handleChange}
    onBlur={handleBlur}>
    <option value="sans-serif">Sans-Serif (e.g., Helvetica, Arial)</option>
    <option value="serif">Serif (e.g., Times New Roman, Garamond)</option>
    <option value="slab-serif">Slab Serif (e.g., Rockwell, Roboto Slab)</option>
    <option value="script">Script (e.g., Pacifico, Lobster)</option>
    <option value="futuristic/techno">Futuristic/Techno (e.g., Orbitron, Exo)</option>
  </Form.Select>
  <Form.Control.Feedback type="valid" >
    <i className="bi bi-check-circle-fill"></i>
  </Form.Control.Feedback>
</Form.Group>
)

export default FontStyleInput;