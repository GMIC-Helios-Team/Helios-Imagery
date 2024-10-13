// pages/api/validate-input.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { ApiResponse } from '@/types/validate-response';

interface ValidationResult {
  result: boolean | { value: boolean };
  message: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const { classification, word } = req.query;

    // Credentials
    const username = process.env.API_USERNAME;;
    const password = process.env.API_PASSWORD;
    const apiUrl = process.env.AI_API_URL;
    const validationEndpoint = process.env.VALIDATION_ENDPOINT;
    const credentials = Buffer.from(`${username}:${password}`).toString('base64');

    try {
      const url = new URL(`${apiUrl}/${validationEndpoint}`);
      if (classification && word) {
        url.searchParams.append('classification', classification as string);
        url.searchParams.append('word', word as string);
      } else {
        throw new Error('Invalid query parameters');
      }

      const response = await fetch(url.toString(), {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Basic ${credentials}`,
        },
      });

      if (!response.ok) {
        throw new Error('Validation request failed');
      }

      const data: ValidationResult[] = await response.json();

      let isValid: boolean;
      if (typeof data[0].result === 'boolean') {
        isValid = data[0].result;
      } else if (typeof data[0].result === 'object' && typeof data[0].result.value === 'boolean') {
        isValid = data[0].result.value;
      } else {
        throw new Error('Unexpected result type');
      }

      const responseObject: ApiResponse = {
        isValid: !isValid,
        message: data[0].message
      };

      if (isValid === false) {
        res.status(200).json(responseObject);
      } else {
        res.status(400).json(responseObject);
      }
    } catch (error) {
      res.status(503).json({ message: 'Service is not Available' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}