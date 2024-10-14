// pages/api/validate-input.ts
import { NextApiRequest, NextApiResponse } from 'next';

import { GenerationResponse } from '@/types/generation-response';


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { name, email, prompt } = req.body;

    // Credentials
    const username = process.env.API_USERNAME;;
    const password = process.env.API_PASSWORD;
    const apiUrl = process.env.AI_API_URL;
    const promptGenerationEndpoint = process.env.PROMPT_GENERATION_ENDPOINT;

    const credentials = Buffer.from(`${username}:${password}`).toString('base64');

    try {
      const url = new URL(`${apiUrl}/${promptGenerationEndpoint}`);

      console.log(`url: ${url.toString()} \n ${prompt}`);

      const response = await fetch(url.toString(), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Basic ${credentials}`,
        },
        body: JSON.stringify({ name, email, prompt })

      });

      const data: GenerationResponse = await response.json();
      console.log(data);
      if (response.ok) {
        res.status(200).json(data);
      } else if (response.status === 500) {
        res.status(500).json({ message: data.message });
      } else {
        res.status(400).json({ message: 'Bad request' });
      }

    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
  } else if (req.method === 'GET') {
    const { HID } = req.query;

    // Credentials
    const username = process.env.API_USERNAME;;
    const password = process.env.API_PASSWORD;
    const apiUrl = process.env.AI_API_URL;
    const promptGenerationEndpoint = process.env.PROMPT_GENERATION_ENDPOINT;
    const credentials = Buffer.from(`${username}:${password}`).toString('base64');

    try {
      const url = new URL(`${apiUrl}/${promptGenerationEndpoint}`);
      console.log(`url: ${url.toString()} \n ${HID}`);

      if (HID) {
        url.searchParams.append('HID', HID as string);
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
      
      const data1 = await response.json();
      console.log(`after fetch ${JSON.stringify(data1)}`);
      if (!response.ok) {
        throw new Error('Validation request failed');
      }
      const data = await response.json();
      console.log(`in generate image ${JSON.stringify(data)}`);

      res.status(200).json(data);


    } catch (error) {
      console.log('ouch some error');
      res.status(503).json({ message: 'Service is not Available' });
    }

  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}