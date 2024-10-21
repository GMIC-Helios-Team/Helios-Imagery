import React from 'react';
import { useRouter } from 'next/router';
import Image from 'react-bootstrap/Image';
import img404 from '@/public/err-404.png';

const Custom404 = () => {
  const router = useRouter();

  const handleGoBack = () => {
    router.push('/');
  };

  return (
    <div className="container mx-auto mt-12 text-center">
      <div className="mb-4">
        <div className="md:col-start-4 md:col-span-6">
          <h1 className="text-4xl font-bold">404 - Page Not Found</h1>
          <p className="text-lg mb-6">Sorry, we couldn’t find the page you’re looking for.</p>
          <div className="justify-center items-center relative w-full max-w-md h-64 mb-8 mx-auto">
            <Image
              src={img404.src}
              alt="404 Error Image"
              style={{ objectFit: 'contain' }}
              className="rounded-lg shadow-lg"
            />
          </div>
          <button
            onClick={handleGoBack}
            className="text-blue-500 hover:underline"
          >
            Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default Custom404;