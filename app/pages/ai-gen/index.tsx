import React, { useState, useEffect } from 'react';
import { GetServerSideProps } from 'next';
import { Alert, Spinner, Container, Card, Row, Form, Col, Button, Image } from 'react-bootstrap';
import { ApiResponse } from '@/models/validate-response';
import { GenerationResponse } from '@/models/generation-response';
import EmailInput from './components/Email';
import { InputFields } from './types/models';
import NameInput from './components/Name';
import NounInput from './components/Noun';
import VerbInput from './components/Verb';
import FontStyleInput from './components/FontStyle';
import ColorPaletteSelect from './components/ColorPalette';
import ThemeInput from './components/Theme';
import ArtStyleInput from './components/ArtStyle';
import { validateWithAPI } from './helpers/ValidateWithApi';
import { initialErrors, initialFormData, initialIsValid } from './helpers/Reset';

interface AiGenPageProps {
  prompt: string;
}

const AiGenPage: React.FC<AiGenPageProps> = ({ prompt }) => {

  const HeliosGalleryUrl: string | undefined = process.env.NEXT_PUBLIC_HELIOS_GALLERY;

  const [formData, setFormData] = useState<InputFields>(initialFormData);
  const [errors, setErrors] = useState<InputFields>(initialErrors);
  const [isValid, setIsValid] = useState<Record<keyof InputFields, boolean>>(initialIsValid);
  const [submissionError, setSubmissionError] = useState<string>('');
  const [isClient, setIsClient] = useState<boolean>(false);
  const [imageUrl, setImageUrl] = useState<string>('');
  const [isFormValid, setIsFormValid] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    // Check form validity whenever formData changes
    const isFormValid = Object.values(formData).every(value => value.trim() !== '');
      //  && Object.values(isValid).every(value => value === true);
    setIsFormValid(isFormValid);
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
        body: JSON.stringify({ name: formData.name, email: formData.email, prompt: data }),
      });

      if (!generateImageResponse.ok) {
        throw new Error('Image generation request failed');
      }

      const generateImageResult: GenerationResponse = await generateImageResponse.json();
      setImageUrl(`${HeliosGalleryUrl}/${generateImageResult.imagefilename}`);
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

  const capitalizeFirstLetter = (string: string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const validateField = async (name: string, value: string) => {
    const singleWordRegex = /^[a-zA-Z]+$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const capitalizedFieldName = capitalizeFirstLetter(name);
    const regex = name === 'email' ? emailRegex : singleWordRegex;
    const regexError = name === 'email'
      ? 'Email must be a valid email address'
      : `${capitalizedFieldName} must be a single word with no spaces or special characters`;

    setIsValid({ ...isValid, [name]: false });
    if (value.trim() === '') {
      setErrors({ ...errors, [name]: `${capitalizedFieldName} is required` });
    } else if (!regex.test(value)) {
      setErrors({ ...errors, [name]: regexError });
    } else {
      try {
        const result: ApiResponse = await validateWithAPI(name, value);
        if (!result.isValid) {
          setErrors({ ...errors, [name]: result.message });
        } else {
          setErrors({ ...errors, [name]: '' });
          setIsValid({ ...isValid, [name]: true });
        }
      } catch (error) {
        setErrors({ ...errors, [name]: 'Validation request failed' });
      }
    }

  }

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    validateField(id, value);
  };

  const resetFields = () => {
    setFormData(initialFormData);
    setErrors(initialErrors);
    setIsValid(initialIsValid);
    setSubmissionError('');
    // reset(setFormData, setErrors, setIsValid, setSubmissionError);
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
                  <Form noValidate style={{ marginLeft: '15px', marginRight: '15px' }}>
                    <EmailInput
                      formData={formData}
                      handleChange={handleChange}
                      handleBlur={handleBlur}
                      isValid={isValid}
                      errors={errors}
                      isLoading={isLoading}
                    />
                    <NameInput
                      formData={formData}
                      handleChange={handleChange}
                      handleBlur={handleBlur}
                      isValid={isValid}
                      errors={errors}
                      isLoading={isLoading}
                    />
                    <NounInput
                      formData={formData}
                      handleChange={handleChange}
                      handleBlur={handleBlur}
                      isValid={isValid}
                      errors={errors}
                      isLoading={isLoading}
                    />
                    <VerbInput
                      formData={formData}
                      handleChange={handleChange}
                      handleBlur={handleBlur}
                      isValid={isValid}
                      errors={errors}
                      isLoading={isLoading}
                    />
                    <FontStyleInput
                      formData={formData}
                      handleChange={handleChange}
                      handleBlur={handleBlur}
                      isValid={isValid}
                      errors={errors}
                      isLoading={isLoading}
                    />
                    <ColorPaletteSelect
                      formData={formData}
                      handleChange={handleChange}
                      handleBlur={handleBlur}
                      isValid={isValid}
                      isLoading={isLoading}
                    />
                    <ThemeInput
                      formData={formData}
                      handleChange={handleChange}
                      handleBlur={handleBlur}
                      isValid={isValid}
                      errors={errors}
                      isLoading={isLoading}
                    />
                    <ArtStyleInput
                      formData={formData}
                      handleChange={handleChange}
                      handleBlur={handleBlur}
                      isValid={isValid}
                      errors={errors}
                      isLoading={isLoading}
                    />

                    <Button type="button" variant="primary" onClick={handleSubmit} disabled={!isFormValid}>
                      {isLoading ? <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" /> : 'Generate'}
                    </Button>
                    <Button type="button" variant="link" disabled={isLoading} onClick={resetFields} style={{ float: 'right' }}>Reset Input</Button>

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
