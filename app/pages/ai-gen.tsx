import React, { useState, useEffect } from 'react';
import { GetServerSideProps } from 'next';
import {Alert, Spinner, Container, Card, Row, Form, Col, Button, Image } from 'react-bootstrap';
import { ApiResponse } from '../models/validate-response';
import { GenerationResponse } from '../models/generation-response';

interface AiGenPageProps {
  prompt: string;
}

const AiGenPage: React.FC<AiGenPageProps> = ({ prompt }) => {

  const HeliosGalleryUrl: string | undefined = process.env.NEXT_PUBLIC_HELIOS_GALLERY;

  // Initial state with additional fields for tier 3 customization
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    noun: '',
    verb: '',
    fontStyle: '',
    colorPalette: 'neutral',
    theme: '',
    artStyle: '',
  });

  const [errors, setErrors] = useState({
    email: '',
    name: '',
    noun: '',
    verb: '',
    fontStyle: '',
    colorPalette: '',
    theme: '',
    artStyle: '',
  });

  const [isValid, setIsValid] = useState({
    email: false,
    name: false,
    noun: false,
    verb: false,
    fontStyle: false,
    colorPalette: true,
    theme: false,
    artStyle: false,
  });

  const [submissionError, setSubmissionError] = useState<string>(''); // State for submission error


  const [isClient, setIsClient] = useState<boolean>(false);
  const [imageUrl, setImageUrl] = useState<string>('');
  const [isFormValid, setIsFormValid] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(false);


  useEffect(() => {
    // Check form validity whenever formData changes
    const isValid = Object.values(formData).every(value => value.trim() !== '');
    setIsFormValid(isValid);
  }, [formData]);


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

  const generateImage = async () => {

    try {
      setIsLoading(true);
      setSubmissionError(''); 

      console.log("starting generation");

      const data = prompt
        .replace('{noun}', formData.noun)
        .replaceAll('{verb}', formData.verb)
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
        body: JSON.stringify({ name: formData.name, prompt: data }),
      });

      if (!generateImageResponse.ok) {
        throw new Error('Image generation request failed');
      }

      const generateImageResult: GenerationResponse = await generateImageResponse.json();
      setImageUrl(`${HeliosGalleryUrl}/${generateImageResult.imageThumbnailfilename}`);
      console.log('Generated Image:', generateImageResult);

      return true;
    }
    catch (error) {
      console.error('Error generating image:', error);
      setSubmissionError('Error generating image');
      return false;
    }
    finally {
      setIsLoading(false);
    }

  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    if (await generateImage()) {
      console.log('Form submitted:', formData);
    }
  };

  const validateField = async (name: string, value: string) => {
    const newErrors = { ...errors };
    console.log("validating field", { name, value });

    const singleWordRegex = /^[a-zA-Z]+$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const url = new URL('/api/validate-input', window.location.origin);

    if (name === 'email') {
      setIsValid({ ...isValid, ['email']: false });
      if (value.trim() === '') {
        newErrors.email = 'Email is required';
      } else if (!emailRegex.test(value)) {
        newErrors.email = 'Email must be a valid email address';
      } else {
        try {
          url.search = '';
          url.searchParams.append('classification', 'email');
          url.searchParams.append('word', formData.email);
          const response = await fetch(url.toString(), {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          });
          const result: ApiResponse = await response.json();
          if (!result.isValid) {
            newErrors.email = result.message;
          } else {
            newErrors.email = '';
            setIsValid({ ...isValid, ['email']: true });
          }
        } catch (error) {
          newErrors.email = 'Validation request failed';
        }
      }
    }

    if (name === 'name') {
      setIsValid({ ...isValid, ['name']: false });
      if (value.trim() === '') {
        newErrors.name = 'Name is required';
      } else if (!singleWordRegex.test(value)) {
        newErrors.name = 'Name must be a single word with no spaces or special characters';
      } else {
        try {
          url.search = '';
          url.searchParams.append('classification', 'name');
          url.searchParams.append('word', formData.name);
          const response = await fetch(url.toString(), {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          });
          const result: ApiResponse = await response.json();
          if (!result.isValid) {
            newErrors.name = result.message;
          } else {
            newErrors.name = '';
            setIsValid({ ...isValid, ['name']: true });
          }
        } catch (error) {
          newErrors.name = 'Validation request failed';
        }
      }
    }

    if (name === 'noun') {
      setIsValid({ ...isValid, ['noun']: false });
      if (value.trim() === '') {
        newErrors.noun = 'Noun is required';
      } else if (!singleWordRegex.test(value)) {
        newErrors.noun = 'Noun must be a single word with no spaces or special characters';
      } else {


        try {
          url.search = '';
          url.searchParams.append('classification', 'noun');
          url.searchParams.append('word', formData.noun);
          const response = await fetch(url.toString(), {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          });
          const result: ApiResponse = await response.json();
          if (!result.isValid) {
            newErrors.noun = result.message;
          } else {
            newErrors.noun = '';
            setIsValid({ ...isValid, ['noun']: true });
          }
        } catch (error) {
          newErrors.noun = 'Validation request failed';
        }

      }
    }

    if (name === 'verb') {
      setIsValid({ ...isValid, ['verb']: false });
      if (value.trim() === '') {
        newErrors.verb = 'Verb is required';
      } else if (!singleWordRegex.test(value)) {
        newErrors.verb = 'Verb must be a single word with no spaces or special characters';
      } else {
        try {
          url.search = '';
          url.searchParams.append('classification', 'verb');
          url.searchParams.append('word', formData.verb);
          const response = await fetch(url.toString(), {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          });
          const result: ApiResponse = await response.json();
          if (!result.isValid) {
            newErrors.verb = result.message;
          } else {
            newErrors.verb = '';
            setIsValid({ ...isValid, ['verb']: true });
          }
        } catch (error) {
          newErrors.verb = 'Validation request failed';
        }
      }
    }

    if (name === 'fontStyle') {
      setIsValid({ ...isValid, ['fontStyle']: false });
      if (value.trim() === '') {
        newErrors.fontStyle = 'Font Style is required';
      } else if (!singleWordRegex.test(value)) {
        newErrors.fontStyle = 'Font Style must be a single word with no spaces or special characters';
      } else {
        try {
          url.search = '';
          url.searchParams.append('classification', 'fontStyle');
          url.searchParams.append('word', formData.fontStyle);
          const response = await fetch(url.toString(), {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          });
          const result: ApiResponse = await response.json();
          if (!result.isValid) {
            newErrors.fontStyle = result.message;
          } else {
            newErrors.fontStyle = '';
            setIsValid({ ...isValid, ['fontStyle']: true });
          }
        } catch (error) {
          newErrors.fontStyle = 'Validation request failed';
        }
      }
    }

    if (name === 'theme') {
      setIsValid({ ...isValid, ['theme']: false });
      if (value.trim() === '') {
        newErrors.theme = 'Theme is required';
      } else if (!singleWordRegex.test(value)) {
        newErrors.theme = 'Theme must be a single word with no spaces or special characters';
      } else {
        try {
          url.search = '';
          url.searchParams.append('classification', 'theme');
          url.searchParams.append('word', formData.theme);
          const response = await fetch(url.toString(), {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          });
          const result: ApiResponse = await response.json();
          if (!result.isValid) {
            newErrors.theme = result.message;
          } else {
            newErrors.theme = '';
            setIsValid({ ...isValid, ['theme']: true });
          }
        } catch (error) {
          newErrors.theme = 'Validation request failed';
        }
      }
    }

    if (name === 'artStyle') {
      setIsValid({ ...isValid, ['artStyle']: false });
      if (value.trim() === '') {
        newErrors.artStyle = 'ArtStyle is required';
      } else if (!singleWordRegex.test(value)) {
        newErrors.artStyle = 'ArtStyle must be a single word with no spaces or special characters';
      } else {
        try {
          url.search = '';
          url.searchParams.append('classification', 'artStyle');
          url.searchParams.append('word', formData.artStyle);
          const response = await fetch(url.toString(), {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          });
          const result: ApiResponse = await response.json();
          if (!result.isValid) {
            newErrors.artStyle = result.message;
          } else {
            newErrors.artStyle = '';
            setIsValid({ ...isValid, ['artStyle']: true });
          }
        } catch (error) {
          newErrors.artStyle = 'Validation request failed';
        }
      }
    }


    setErrors(newErrors);

    // Check if there are any errors
    const hasErrors = Object.values(newErrors).some(error => error !== '');
    setIsFormValid(!hasErrors);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    validateField(id, value);
  };

  const reset = () => {
    setFormData({
      email: '',
      name: '',
      noun: '',
      verb: '',
      fontStyle: '',
      colorPalette: 'neutral',
      theme: '',
      artStyle: '',
    });

    setErrors({
      email: '',
      name: '',
      noun: '',
      verb: '',
      fontStyle: '',
      colorPalette: '',
      theme: '',
      artStyle: '',
    });

    setIsValid({
      email: false,
      name: false,
      noun: false,
      verb: false,
      fontStyle: false,
      colorPalette: true,
      theme: false,
      artStyle: false,
    });

    setSubmissionError(''); 
 
  }

  if (!isClient) {
    return null; // Render nothing on the server
  }

  return (
    <>
      <Row className="mb-4"></Row>
      <Container>
        <Row className="mb-4">
          <Col md={{ offset: 3, span: 6 }}>
            <Card>
              <Card.Header>AI Generator</Card.Header>
              <Card.Body>
                <Card.Text>
                {submissionError && <Alert variant="danger">{submissionError}</Alert>} {/* Render error message */}
                <Form noValidate>
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
                    <Form.Group as={Row} className="mb-3" controlId="noun">
                      <Form.Control
                        disabled={isLoading}
                        type="text"
                        placeholder="Noun"
                        size="sm"
                        value={formData.noun}
                        onChange={(e) => handleChange(e as React.ChangeEvent<HTMLInputElement>)}
                        onBlur={handleBlur}
                        isValid={isValid.noun}
                        isInvalid={!!errors.noun} />
                      <Form.Control.Feedback type="invalid">{errors.noun}</Form.Control.Feedback>
                      <Form.Control.Feedback type="valid" >
                        <i className="bi bi-check-circle-fill"></i>
                      </Form.Control.Feedback>
                    </Form.Group>
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
                    <Form.Group as={Row} className="mb-3" controlId="colorPalette">
                      <Form.Select
                        disabled={isLoading}
                        size="sm"
                        value={formData.colorPalette}
                        isValid={isValid.colorPalette}
                        onChange={handleChange}
                        onBlur={handleBlur}>
                        <option value="warm">Warm</option>
                        <option value="cool">Cool</option>
                        <option value="neutral">Neutral</option>
                      </Form.Select>
                      <Form.Control.Feedback type="valid" >
                        <i className="bi bi-check-circle-fill"></i>
                      </Form.Control.Feedback>
                    </Form.Group>
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
                    <Form.Group as={Row} className="mb-3" controlId="artStyle">
                      <Form.Control
                        disabled={isLoading}
                        type="text"
                        placeholder="Art Style"
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

                    <Button type="button" variant="primary" onClick={handleSubmit} disabled={!isFormValid}>
                      {isLoading ? <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" /> : 'Generate'}
                    </Button>
                    <Button type="button" variant="link" onClick={reset} style={{ float: 'right' }}>Reset Input</Button>

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
  const prompt = "An illustration for GM Insurance's Digital Enablement Platform group, known as Helios. The design should incorporate a {theme} theme. Use the Helios team logo prominently on the front with a sunburst pattern in {colorPalette} {verb} from it. Position the GM Insurance logo at the top center and depict a stylized {noun} with rays {verb} outward, each representing Cloud Engineering, API Development, and Site Reliability Engineering with appropriate icons (cloud, code brackets, gears). Use a {fontStyle}, {theme} font for the text 'Digital Enablement Platform' below the central illustration. The color palette should be limited to {colorPalette} for easy screen printing. The entire image should be heavily influenced by {artStyle}"
  return {
    props: {
      prompt
    },
  };
};

export default AiGenPage;
