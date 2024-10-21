import React from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';

const Custom404 = () => {
  const { isDarkTheme } = useTheme();
  const router = useRouter();

  const handleGoBack = () => {
    router.push('/');
  };

  return (
    <div className="container mx-auto mt-12 text-center">
      <div className="mb-4">
        <div className="md:col-start-4 md:col-span-6">
          <h1 className="text-4xl font-bold">404 - Page Not Found</h1>
          <p className="mt-4 text-lg">
            Page Not Found
          </p>
          <Image
            src="/err-404.png"
            className="border-2 border-gray-300 rounded-lg shadow-lg max-w-full mt-4"
            alt="Generated Image"
            width={500}
            height={300}
          />
          
          <button
            onClick={handleGoBack}
            className="mt-4 text-blue-500 hover:underline"
          >
            Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default Custom404;