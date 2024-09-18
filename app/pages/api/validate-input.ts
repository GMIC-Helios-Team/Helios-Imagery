// pages/api/validate-input.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { ApiResponse } from '../../models/validate-response';

interface ValidationResult {
  result: boolean;
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

    // console.log("classification: " + classification);
    // console.log("word: " + word);

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

      // console.log(JSON.stringify(data));

      const responseObject: ApiResponse = {
        isValid: !data[0].result,
        message: data[0].message
      };

      // console.log(data[0].result);
      if (data[0].result === false) {
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