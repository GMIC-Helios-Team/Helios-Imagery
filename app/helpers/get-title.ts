import { TitleResponse } from '@/types/title';

export const fetchTitle = async (HID: string): Promise<TitleResponse> => {

    const url = new URL('/api/title', window.location.origin);
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
