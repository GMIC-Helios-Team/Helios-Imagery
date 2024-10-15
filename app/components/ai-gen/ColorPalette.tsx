

import React from "react";
import { Form, Row } from "react-bootstrap";  
import { SelectProps } from "@/types/ai-gen";

const ColorPaletteSelect: React.FC<SelectProps> = ({ formData,handleChange, handleBlur,isValid, isLoading }) => ( 
  <Form.Group as={Row} className="mb-3" controlId="colorPalette">
  <Form.Select
    disabled={isLoading}
    size="sm"
    value={formData.colorPalette}
    isValid={isValid.colorPalette}
    onChange={handleChange}
    onBlur={handleBlur}>
    <option value="bright">Bright</option>
    <option value="warm">Warm</option>
    <option value="neutral">Neutral</option>
    <option value="cool">Cool</option>
    <option value="dark">Dark</option>
  </Form.Select>
  <Form.Control.Feedback type="valid" >
    <i className="bi bi-check-circle-fill"></i>
  </Form.Control.Feedback>
</Form.Group>
)

export default ColorPaletteSelect;