// pages/api/validate-input.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { MetricResponse  } from '@/types/metrics-response';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {

    // Credentials
    const username = process.env.API_USERNAME;;
    const password = process.env.API_PASSWORD;
    const apiUrl = process.env.AI_API_URL;
    const generatedImageEndpoint = process.env.METRICS_ENDPOINT;
    const credentials = Buffer.from(`${username}:${password}`).toString('base64');

    try {
      const url = new URL(`${apiUrl}/${generatedImageEndpoint}`);

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

      const data: MetricResponse[] = await response.json();
      res.status(200).json(data);

    } catch (error) {
      res.status(503).json({ message: 'Service is not Available' });
    }

  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}