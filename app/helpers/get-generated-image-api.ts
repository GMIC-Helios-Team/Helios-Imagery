import { GetGeneratedImage } from '@/types/generation-response';

export const fetchImage = async (HID: string): Promise<GetGeneratedImage> => {

    const url = new URL('/api/generate-image', window.location.origin);
    url.searchParams.append('HID', HID);

    const response = await fetch(url.toString(), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Get generated image request failed');
    }
    
    return response.json();
};
