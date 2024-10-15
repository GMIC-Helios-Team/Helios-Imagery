import React, { useState, useEffect } from 'react';
import { GetServerSideProps } from 'next';
import { Alert, Spinner, Container, Card, Row, Form, Col, Button } from 'react-bootstrap';
import { ApiResponse } from '@/types/validate-response';
import { GenerationResponse } from '@/types/generation-response';
import EmailInput from '@/components/ai-gen/Email';
import { InputFields } from '@/types/ai-gen';
import NameInput from '@/components/ai-gen/Name';
import NounInput from '@/components/ai-gen/Noun';
import VerbInput from '@/components/ai-gen/Verb';
import FontStyleInput from '@/components/ai-gen/FontStyle';
import ColorPaletteSelect from '@/components/ai-gen/ColorPalette';
import ThemeInput from '@/components/ai-gen/Theme';
import ArtStyleInput from '@/components/ai-gen/ArtStyle';
import { validateWithAPI } from '@/helpers/ValidateWithApi';
import { initialErrors, initialFormData, initialIsValid } from '@/helpers/Reset';
import aigen from '@/styles/ai-gen.module.css';
// import { useTheme } from '@/contexts/theme-context';

import { useRouter } from 'next/router';
interface AiGenPageProps {
  prompt: string;
}

const AiGenPage: React.FC<AiGenPageProps> = ({ prompt }) => {
  // const { isDarkTheme } = useTheme();

  const [formData, setFormData] = useState<InputFields>(initialFormData);
  const [errors, setErrors] = useState<InputFields>(initialErrors);
  const [isValid, setIsValid] = useState<Record<keyof InputFields, boolean>>(initialIsValid);
  const [submissionError, setSubmissionError] = useState<string>('');
  const [isClient, setIsClient] = useState<boolean>(false);
  const [isFormValid, setIsFormValid] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const isFormValid = Object.values(formData).every(value => value.trim() !== '');
    //  && Object.values(isValid).every(value => value === true);
    setIsFormValid(isFormValid);
  }, [formData]);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const router = useRouter();

  // Updated handleChange function with proper event typing for FormControl
  const handleChange = (e: React.FormEvent<HTMLInputElement | HTMLSelectElement>) => {
    const target = e.target as HTMLInputElement | HTMLSelectElement;
    const { id, value } = target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };


  const routeToWait = (hid: string) => {
    router.push(`/ai-gen/wait/${hid}`);
  };

  const generateImage = async (): Promise<string | null> => {

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
        if (generateImageResponse.status === 500) {
          const errorData = await generateImageResponse.json();
          throw new Error(errorData.message);
        } else {
          throw new Error('Image generation request failed');
        }
      }

      const generateImageResult: GenerationResponse = await generateImageResponse.json();
      return generateImageResult.HID

    }
    catch (error) {
      if (error instanceof Error) {
        setSubmissionError(error.message);
      } else {
        setSubmissionError('An unknown error occurred');
      }
      return null;
    }
    finally {
      setIsLoading(false);
    }

  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    const hid = await generateImage();
    if (hid) {
      routeToWait(hid);
    }
  };


  const capitalizeFirstLetter = (string: string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const validateField = async (name: string, value: string) => {
    const singleWordRegex = /^[a-zA-Z\s'-]+$/;

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
  }

  if (!isClient) {
    return null; // Render nothing on the server
  }

  return (
    <Container style={{ marginTop: '50px' }}>
      <Row className="mb-4">
        <Col md={{ offset: 3, span: 6 }}>
          <Card>
            <Card.Header>
                AI Generator
              </Card.Header>
            <Card.Body>
              <Card.Text>
                {submissionError && <Alert variant="danger">{submissionError}</Alert>}
                <Form noValidate className={aigen.marginLeftRight}>
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
                  <Button type="button" variant="link" onClick={handleSubmit} disabled={!isFormValid}>
                    {isLoading ? <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" /> : 'Generate'}
                  </Button>
                  <Button type="button" variant="link" disabled={isLoading} onClick={resetFields} className={aigen.floatRight}>Reset Input</Button>
                </Form>
              </Card.Text>
            </Card.Body>
            <Alert variant="light">
              <Card.Img variant="top" src="/image-gen.png" alt="Home Page Card" width={300} height={210} style={{ padding: '5px' }} />
            </Alert>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const prompt = "An illustration for GM Insurance's Digital Enablement Platform group, known as Helios. The design should embrace a {theme} theme, which drives the visual and symbolic direction of the artwork. Use the Helios team logo prominently at the center with a sunburst pattern in {colorPalette} {verb} from it. Position the GM Insurance logo at the top center and, at the core of the design, depict a stylized {noun}. Rays {verb} outward from the {noun}, representing Cloud Engineering, API Development, and Site Reliability Engineering, each with appropriate {theme} icons (clouds, code brackets, gears). Use a {fontStyle}, {theme} font for the text 'Digital Enablement Platform' below the illustration to unify the design. The color palette should remain limited to {colorPalette} for clean, streamlined screen printing. The overall illustration should be shaped by a {artStyle} influence, ensuring the design stays true to the chosen {theme}."
  return {
    props: {
      prompt
    },
  };
};

export default AiGenPage;
