import React, { useState, useEffect } from 'react';
import { Joke } from '@/types/joke';

const Jokes: React.FC = () => {

  const [data, setData] = useState<Joke | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [category, setCategory] = useState<string>('Programming');
  const [isClient, setIsClient] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient && category) {
      fetchData(category);
    }
  }, [category, isClient]);

  useEffect(() => {
    const toggleCategories = () => {
      if (category === 'Programming') {
        setCategory("Spooky");
      }
      else {
        setCategory("Programming");
      }
    }
    const intervalId = setInterval(toggleCategories, 8000); // 8 seconds

    return () => clearInterval(intervalId); // Cleanup on unmount
  }, [category]);

  const fetchData = async (category: string) => {
    const url = `${process.env.NEXT_PUBLIC_JOKE_URL}/${category}?safe-mode`;
    try {
      setIsLoading(true);
      const res = await fetch(url);
      if (!res.ok) {
        throw new Error(`Error: ${res.status} ${res.statusText}`);
      }
      const result: Joke = await res.json();
      setData(result);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred');
      }
    }
    finally {
      setIsLoading(false);
    }
  };

  if (!isClient) {
    return null; // Render nothing on the server
  }

  return (
    <>
       {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <ErrorMessage message={error} />
      ) : data ? (
        <JokeDisplay data={data} />
      ) : (
        <p>No Joke Loaded</p>
      )}
    </>
  );
};

export default Jokes;

const ErrorMessage: React.FC<{ message: string }> = ({ message }) => (
  <p><strong>Error:</strong> {message}</p>
);

const JokeDisplay: React.FC<{ data: Joke }> = ({ data }) => (
  <>
    {data.error ? (
      <p><strong>Error:</strong> {data.message}</p>
    ) : (
      <>
        {data.type === 'single' ? (
          <p><strong>Joke:</strong> {data.joke}</p>
        ) : (
          <>
            <p><strong>Setup:</strong> {data.setup}</p>
            <p><strong>Delivery:</strong> {data.delivery}</p>
          </>
        )}
      </>
    )}
  </>
);
