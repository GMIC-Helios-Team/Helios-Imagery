import React, { useState, useEffect } from 'react';
import { GetImageList } from '@/pages/api/get-image-list'; // Import the API service
import { GetGeneratedImageItem } from '@/types/generation-response';
import { useRouter } from 'next/router';
import ImageCard from '@/components/ImageCard';
import ps from '@/styles/photo-gallery.module.css';

const PhotoGallery = () => {

  const [loading, setLoading] = useState(true);
  const [images, setImages] = useState<GetGeneratedImageItem[]>([]);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();
  const openImageDetail = (hid: string) => {
    router.push(`/gallery/image/${hid}`); // Navigate to /gallery/image/{hid}
  };

  // Fetch images when the component mounts
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const fetchedImages = await GetImageList();
        setImages(fetchedImages);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message); // Now TypeScript knows 'err' has a 'message' property
        } else {
          setError('An unknown error occurred'); // Fallback for non-error objects
        }
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  return (
    <>
       {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <ErrorMessage message={error!} />
      ) : images ? (
        <div>
        <h1 >Generated Images</h1>
        <div className={ps.container}>
          {images.map((image) => (
            <div key={image.id} className={ps.itemContainer}>
              <ImageCard image={image}></ImageCard>
            </div>
          ))}
        </div>
        </div>
      ) : (
        <p>No Images loaded</p>
      )}
    </>
  );
};

const ErrorMessage: React.FC<{ message: string }> = ({ message }) => (
  <p><strong>Error:</strong> {message}</p>
);

export default PhotoGallery;