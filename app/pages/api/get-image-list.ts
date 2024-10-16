// apiService.js

export const GetImageList = async () => {
    const username = process.env.API_USERNAME;;
    const password = process.env.API_PASSWORD;
    // const apiUrl = process.env.AI_API_URL;
    // const getImageListEndpoint = process.env.GET_IMAGE_LIST_ENDPOINT;
    const apiUrl = 'https://localhost:7244';
    const getImageListEndpoint = 'OpenAi/GetImages';
  
    // Encode the username and password in Base64
    const credentials = Buffer.from(`${username}:${password}`).toString('base64');
  
    // Make the API request
    try {
        const url = new URL(`${apiUrl}/${getImageListEndpoint}`);

        console.log(`url: ${url.toString()}`);

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Authorization': `Basic ${credentials}`,
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching images:', error);
      throw error;  // You can handle this error in your component
    }
  };