// pages/api/validate-input.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { Gallery } from '@/types/image-gallery';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const { offset, limit } = req.query;

    // Credentials
    const username = process.env.API_USERNAME;;
    const password = process.env.API_PASSWORD;
    const apiUrl = process.env.AI_API_URL;
    const imageGalleryEndPoint = process.env.IMAGE_GALLERY_ENDPOINT;
    const credentials = Buffer.from(`${username}:${password}`).toString('base64');

    try {
      const url = new URL(`${apiUrl}/${imageGalleryEndPoint}`);

      if (offset && limit) {
        url.searchParams.append('offset', offset as string);
        url.searchParams.append('limit', limit as string);
      }
      else {
        url.searchParams.append('offset', '0');
        url.searchParams.append('limit', '8');
      }

      const response = await fetch(url.toString(), {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Basic ${credentials}`,
        },
      });

      if (!response.ok) {
        throw new Error('Gallery list request failed');
      }

      const data: Gallery[] = await response.json();
      res.status(200).json(data[0]);

    } catch (error) {
      res.status(503).json({ message: 'Service is not Available' });
    }

  } else if (req.method === 'PATCH') {

    // Credentials
    const username = process.env.API_USERNAME;;
    const password = process.env.API_PASSWORD;
    const apiUrl = process.env.AI_API_URL;
    const likeImageEndpoint = process.env.LIKE_IMAGE_ENDPOINT;
    const credentials = Buffer.from(`${username}:${password}`).toString('base64');

    try {
      const url = new URL(`${apiUrl}/${likeImageEndpoint}`);

      const response = await fetch(url.toString(), {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Basic ${credentials}`,
        },
        body: JSON.stringify(req.body),
      });

      if (!response.ok) {
        throw new Error('Like Image request failed');
      }

      res.status(200).json({ message: 'Image liked successfully' });

    } catch (error) {
      res.status(503).json({ message: 'Service is not Available' });
    }
    
  }
   else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}