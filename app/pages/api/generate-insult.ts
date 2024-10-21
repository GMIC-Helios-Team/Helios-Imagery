// pages/api/validate-input.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { InsultResponse } from '@/types/insult-response';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { clickCount } = req.body;

    // Credentials
    const username = process.env.API_USERNAME;;
    const password = process.env.API_PASSWORD;
    const apiUrl = process.env.AI_API_URL;
    const insultGenerationEndpoint = process.env.INSULT_GENERATION_ENDPOINT;

    const credentials = Buffer.from(`${username}:${password}`).toString('base64');

    try {
      const url = new URL(`${apiUrl}/${insultGenerationEndpoint}`);
      const response = await fetch(url.toString(), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Basic ${credentials}`,
        },
        body: JSON.stringify({ clickCount })

      });

      const data : InsultResponse = await response.json();
      if (response.ok) {
        res.status(200).json(data);
      } else if (response.status === 500) {
        res.status(500).json({ message: data });
      } else {
        res.status(400).json({ message: 'Bad request' });
      }

    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
  }