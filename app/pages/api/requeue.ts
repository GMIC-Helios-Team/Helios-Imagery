// pages/api/validate-input.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { GalleryItem } from '@/types/image-gallery';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {

    // Credentials
    const username = process.env.API_USERNAME;;
    const password = process.env.API_PASSWORD;
    const apiUrl = process.env.AI_API_URL;
    const getRequeueEndpoint = process.env.GET_REQUEUE_ENDPOINT;
    const credentials = Buffer.from(`${username}:${password}`).toString('base64');

    try {
      const url = new URL(`${apiUrl}/${getRequeueEndpoint}`);

      const response = await fetch(url.toString(), {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Basic ${credentials}`,
        },
      });

      if (!response.ok) {
        throw new Error('Requeue Get request failed');
      }

      const data: GalleryItem[] = await response.json();
      res.status(200).json(data);

    } catch (error) {
      res.status(503).json({ message: 'Service is not Available' });
    }

  } else if (req.method === 'POST') {

    const { HID } = req.body;

    // Credentials
    const username = process.env.API_USERNAME;;
    const password = process.env.API_PASSWORD;
    const apiUrl = process.env.AI_API_URL;
    const postRequeueEndpoint = process.env.POST_REQUEUE_ENDPOINT;

    console.log('HID:', HID);
    console.log(`API URL: ${apiUrl}  ${postRequeueEndpoint}`);  

    const credentials = Buffer.from(`${username}:${password}`).toString('base64');

    try {
      const url = new URL(`${apiUrl}/${postRequeueEndpoint}`);
      const response = await fetch(url.toString(), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Basic ${credentials}`,
        },
        body: JSON.stringify({ HID })

      });

      if (!response.ok) {
        throw new Error('Requeue Post failed');
      }

      res.status(200).json({ message: 'Requeue request successful' });

    } catch (error) {
      res.status(503).json({ message: 'Service is not Available' });
    }
  }
  else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
