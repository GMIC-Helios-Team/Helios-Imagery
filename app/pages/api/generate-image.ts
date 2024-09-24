// pages/api/validate-input.ts
import { NextApiRequest, NextApiResponse } from 'next';

import { GenerationResponse } from '../../models/generation-response';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { name, noun, verb } = req.body;

    // Credentials
    const username = process.env.API_USERNAME;;
    const password = process.env.API_PASSWORD;
    const apiUrl = process.env.AI_API_URL;
    const generationEndpoint = process.env.VALIDATION_ENDPOINT;

    const credentials = Buffer.from(`${username}:${password}`).toString('base64');

    try {
      const url = new URL(`${apiUrl}/${generationEndpoint}`);

      const response = await fetch(url.toString(), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Basic ${credentials}`,
        },
        body: JSON.stringify({ name, noun, verb }),

      });

      const data: GenerationResponse = await response.json();

      if (response.ok) {
        res.status(200).json(data);
      } else {
        res.status(400).json({ message: 'Bad request' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}