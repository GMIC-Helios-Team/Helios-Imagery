import React, { useState, useEffect } from 'react';
import { GetServerSideProps } from 'next';
import { Container, Card, Row, Form, Col, Button, Image } from 'react-bootstrap';
//import { ApiResponse } from '../models/validate-response';
import { GenerationResponse } from '../models/generation-response';
import { promises as fs } from 'fs';
//import { json } from 'stream/consumers';

interface AiGenPageProps {
  email: string;
  data: string;
}

const AiGenPage: React.FC<AiGenPageProps> = ({ email, data }) => {

  const HeliosGalleryUrl: string | undefined = process.env.NEXT_PUBLIC_HELIOS_GALLERY;

  // Initial state with additional fields for tier 3 customization
  const [formData, setFormData] = useState({
    input1: '',
    input2: '',
    input3: '',
    fontStyle: '', // New tier 3 input
    colorPalette: '', // New tier 3 input
    theme: '', // New tier 3 input
    artStyle: '', // New tier 3 input
  });

  const [errors, setErrors] = useState({
    input1: '',
    input2: '',
    input3: '',
    fontStyle: '', // New error field
    colorPalette: '', // New error field
    theme: '', // New error field
    artStyle: '', // New error field
  });

  const [isClient, setIsClient] = useState<boolean>(false);
  const [imageUrl, setImageUrl] = useState<string>(''); // State variable for the image URL

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Updated handleChange function with proper event typing for FormControl
  const handleChange = (e: React.FormEvent<HTMLInputElement | HTMLSelectElement>) => {
    const target = e.target as HTMLInputElement | HTMLSelectElement; // Type assertion to resolve the error
    const { id, value } = target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const validate = async () => {
    const newErrors = {
      input1: '',
      input2: '',
      input3: '',
      fontStyle: '',
      colorPalette: '',
      theme: '',
      artStyle: '',
    };

    //const url = new URL('/api/validate-input', window.location.origin);

    // Validate each field similarly, including new fields for tier 3 customization
    if (!formData.input1) {
      newErrors.input1 = 'Name is required';
    }

    if (!formData.colorPalette) {
      newErrors.colorPalette = 'Color palette is required';
    }

    setErrors(newErrors);

    // Check if all fields are valid
    const isValid = !Object.values(newErrors).some((error) => error);

    console.log("made it through validation", {isValid});

    // If valid, generate the image
    if (isValid) {
      try { 
        console.log("starting generation");

        data = data
        .replace('{noun}', formData.input2)
        .replaceAll('{verb}', formData.input3)
        .replace('{fontStyle}', formData.fontStyle)
        .replaceAll('{colorPalette}', formData.colorPalette)
        .replaceAll('{theme}', formData.theme)
        .replace('{artStyle}', formData.artStyle);

        console.log(data);

        const generateImageResponse = await fetch('/api/generate-image', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({name:formData.input1, prompt: data}),
        });

        if (!generateImageResponse.ok) {
          throw new Error('Image generation request failed');
        }

        const generateImageResult: GenerationResponse = await generateImageResponse.json();
        setImageUrl(`${HeliosGalleryUrl}/${generateImageResult.imageThumbnailfilename}`);
        console.log('Generated Image:', generateImageResult);
      } catch (error) {
        console.error('Error generating image:', error);
      }
    }

    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (await validate()) {
      console.log('Form submitted:', formData);
    }
  };

  if (!isClient) {
    return null; // Render nothing on the server
  }

  return (
    <>
      <Row className="mb-4"></Row>
      <Container>
        <Row className="mb-4">
          <Col md={{ offset: 2, span: 8 }}>
            <Card>
              <Card.Header>AI Generator</Card.Header>
              <Card.Body>
                <Card.Text>
                  <Form onSubmit={handleSubmit}>
                    <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                      <Form.Label column sm="2">Email</Form.Label>
                      <Col sm="10">
                        <Form.Control plaintext readOnly defaultValue={email} />
                      </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3" controlId="input1">
                      <Form.Label column sm="2">Name</Form.Label>
                      <Col sm="10">
                        <Form.Control
                          type="text"
                          placeholder="Input 1"
                          value={formData.input1}
                          onChange={(e) => handleChange(e as React.ChangeEvent<HTMLInputElement>)}
                          isInvalid={!!errors.input1} />
                        <Form.Control.Feedback type="invalid">{errors.input1}</Form.Control.Feedback>
                      </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3" controlId="input2">
                      <Form.Label column sm="2">Noun</Form.Label>
                      <Col sm="10">
                        <Form.Control
                          type="text"
                          placeholder="Input 2"
                          value={formData.input2}
                          onChange={(e) => handleChange(e as React.ChangeEvent<HTMLInputElement>)}
                          isInvalid={!!errors.input2} />
                        <Form.Control.Feedback type="invalid">{errors.input2}</Form.Control.Feedback>
                      </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3" controlId="input3">
                      <Form.Label column sm="2">Verb</Form.Label>
                      <Col sm="10">
                        <Form.Control
                          type="text"
                          placeholder="Input 3"
                          value={formData.input3}
                          onChange={(e) => handleChange(e as React.ChangeEvent<HTMLInputElement>)}
                          isInvalid={!!errors.input3} />
                        <Form.Control.Feedback type="invalid">{errors.input3}</Form.Control.Feedback>
                      </Col>
                    </Form.Group>

                    {/* New Tier 3 customization inputs */}
                    <Form.Group as={Row} className="mb-3" controlId="fontStyle">
                      <Form.Label column sm="2">Font Style</Form.Label>
                      <Col sm="10">
                        <Form.Control
                          type="text"
                          placeholder="Font Style"
                          value={formData.fontStyle}
                          onChange={(e) => handleChange(e as React.ChangeEvent<HTMLInputElement>)}
                          isInvalid={!!errors.fontStyle} />
                        <Form.Control.Feedback type="invalid">{errors.fontStyle}</Form.Control.Feedback>
                      </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3" controlId="colorPalette">
                      <Form.Label column sm="2">Color Palette</Form.Label>
                      <Col sm="10">
                        <Form.Control
                          as="select"
                          value={formData.colorPalette}
                          onChange={(e) => handleChange(e as React.ChangeEvent<HTMLInputElement>)}>
                          <option value="">Select Palette</option>
                          <option value="warm">Warm</option>
                          <option value="cool">Cool</option>
                          <option value="neutral">Neutral</option>
                        </Form.Control>
                      </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3" controlId="theme">
                      <Form.Label column sm="2">Theme</Form.Label>
                      <Col sm="10">
                        <Form.Control
                          type="text"
                          placeholder="Theme"
                          value={formData.theme}
                          onChange={(e) => handleChange(e as React.ChangeEvent<HTMLInputElement>)}
                          isInvalid={!!errors.theme} />
                        <Form.Control.Feedback type="invalid">{errors.theme}</Form.Control.Feedback>
                      </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3" controlId="artStyle">
                      <Form.Label column sm="2">Art Style</Form.Label>
                      <Col sm="10">
                        <Form.Control
                          type="text"
                          placeholder="Art Style"
                          value={formData.artStyle}
                          onChange={(e) => handleChange(e as React.ChangeEvent<HTMLInputElement>)}
                          isInvalid={!!errors.artStyle} />
                        <Form.Control.Feedback type="invalid">{errors.artStyle}</Form.Control.Feedback>
                      </Col>
                    </Form.Group>

                    <Button type="button" onClick={handleSubmit}>Generate</Button>
                  </Form>
                </Card.Text>
                <Image
                  src={imageUrl || `${HeliosGalleryUrl}/Helios-Images/placeholder.png`}
                  fluid
                  style={{ width: '600px', height: 'auto' }}
                  alt="Generated Image"
                />
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  // Fetch data here. For example, you can fetch user data from an API.
  const email = 'email@example.com'; // Replace this with actual data fetching logic

  const file = await fs.readFile(process.cwd() + '/public/prompts.json', 'utf8');
  const dataFile = JSON.parse(file);
  let dataPrompt = dataFile.prompts.helios;
  const data = JSON.stringify(dataPrompt);
  return {
    props: {
      email,
      data
    },
  };
};

export default AiGenPage;
