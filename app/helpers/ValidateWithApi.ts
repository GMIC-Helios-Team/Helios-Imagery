import { ApiResponse } from "@/types/validate-response";

// /app/pages/ai-gen/helpers/validateWithAPI.ts
export const validateWithAPI = async (classification: string, word: string): Promise<ApiResponse> => {
  const url = new URL('/api/validate-input', window.location.origin);
  url.searchParams.append('classification', classification);
  url.searchParams.append('word', word);

  const response = await fetch(url.toString(), {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  console.log('response', response);
  if (!response.ok) {
    throw new Error('Validate request failed');
  }

  return response.json();
};