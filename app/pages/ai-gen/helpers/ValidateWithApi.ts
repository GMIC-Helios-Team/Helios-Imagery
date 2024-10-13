import { ApiResponse } from "@/models/validate-response";

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

  return response.json();
};