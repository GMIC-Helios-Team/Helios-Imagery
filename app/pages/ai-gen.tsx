import React, { useState, useEffect } from 'react';
import { GetServerSideProps } from 'next';
import { Container, Card, Row, Form, Col, Button, Image } from 'react-bootstrap';
import { ApiResponse } from '../models/validate-response';
import { GenerationResponse } from '../models/generation-response';

interface AiGenPageProps {
  email: string;
}
const AiGenPage: React.FC<AiGenPageProps> = ({ email }) => {

  const HeliosGalleryUrl: string = process.env.NEXT_PUBLIC_HELIOS_GALLERY;

  const [formData, setFormData] = useState({
    input1: '',
    input2: '',
    input3: '',
  });

  const [errors, setErrors] = useState({
    input1: '',
    input2: '',
    input3: '',
  });

  const [isClient, setIsClient] = useState<boolean>(false);
  const [imageUrl, setImageUrl] = useState<string>(''); // State variable for the image URL

  useEffect(() => {
    setIsClient(true);
  }, []);


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
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
    };

    const url = new URL('/api/validate-input', window.location.origin);
    if (!formData.input1) {
      newErrors.input1 = 'Name is required';
    } else {
      try {
        url.search = '';
        url.searchParams.append('classification', 'name');
        url.searchParams.append('word', formData.input1);

        const response = await fetch(url.toString(), {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        const result: ApiResponse = await response.json();

        if (!result.isValid) {
          newErrors.input1 = result.message;
        }
      } catch (error) {
        newErrors.input1 = 'Validation request failed';
      }
    }

    if (!formData.input2) {
      newErrors.input2 = 'Noun is required';
    } else {
      try {
        url.search = '';
        url.searchParams.append('classification', 'noun');
        url.searchParams.append('word', formData.input2);

        const response = await fetch(url.toString(), {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        const result: ApiResponse = await response.json();

        if (!result.isValid) {
          newErrors.input2 = result.message;
        }
      } catch (error) {
        newErrors.input2 = 'Validation request failed';
      }
    }

    if (!formData.input3) {
      newErrors.input3 = 'Verb is required';
    } else {
      try {
        url.search = '';
        url.searchParams.append('classification', 'verb');
        url.searchParams.append('word', formData.input3);

        const response = await fetch(url.toString(), {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        const result: ApiResponse = await response.json();

        if (!result.isValid) {
          newErrors.input3 = result.message;
        }
      } catch (error) {
        newErrors.input3 = 'Validation request failed';
      }
    }

    setErrors(newErrors);

    // Check for Input validation errors
    const isValid = !Object.values(newErrors).some((error) => error);

    // Generate Image
    if (isValid) {
      // If validation is successful, make the generate-image API call
      try {
        const generateImageResponse = await fetch('/api/generate-image', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: formData.input1,
            noun: formData.input2,
            verb: formData.input3,
          }),
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
      // Perform form submission logic here
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
                      <Form.Label column sm="2">
                        Email
                      </Form.Label>
                      <Col sm="10">
                        <Form.Control plaintext readOnly defaultValue={email} />
                      </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3" controlId="input1">
                      <Form.Label column sm="2">
                        Name
                      </Form.Label>
                      <Col sm="10">
                        <Form.Control
                          type="text"
                          placeholder="Input 1"
                          value={formData.input1}
                          onChange={handleChange}
                          isInvalid={!!errors.input1} />
                        <Form.Control.Feedback type="invalid">
                          {errors.input1}
                        </Form.Control.Feedback>

                      </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3" controlId="input2">
                      <Form.Label column sm="2">
                        Noun
                      </Form.Label>
                      <Col sm="10">
                        <Form.Control
                          type="text"
                          placeholder="Input 2"
                          value={formData.input2}
                          onChange={handleChange}
                          isInvalid={!!errors.input2} />
                        <Form.Control.Feedback type="invalid">
                          {errors.input2}
                        </Form.Control.Feedback>
                      </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3" controlId="input3">
                      <Form.Label column sm="2">
                        Verb
                      </Form.Label>
                      <Col sm="10">
                        <Form.Control
                          type="text"
                          placeholder="Input 3"
                          value={formData.input3}
                          onChange={handleChange}
                          isInvalid={!!errors.input3} />
                        <Form.Control.Feedback type="invalid">
                          {errors.input3}
                        </Form.Control.Feedback>
                      </Col>
                    </Form.Group>
                    <Button type="button" onClick={handleSubmit}>Generate</Button>
                  </Form>
                </Card.Text>
                <Image
                  src={imageUrl || `${HeliosGalleryUrl}/Helios-Images/2024-09-20-12-47-56.gilbert.png`}
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

  return {
    props: {
      email,
    },
  };
};

export default AiGenPage;