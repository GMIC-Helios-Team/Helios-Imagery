import React, { useState } from 'react';
import ImageModal from '@/components/ImageModal';

interface ImageItem {
  id: number;
  src: string;
  title: string;
  description: string;
}

const images: ImageItem[] = [
  { id: 1, src: 'https://upload.wikimedia.org/wikipedia/commons/3/33/Blue_merle_koolie_short_coat_heading_sheep.jpg', title: 'Image 1', description: 'Description for Image 1' },
  { id: 2, src: 'https://upload.wikimedia.org/wikipedia/commons/9/99/Brooks_Chase_Ranger_of_Jolly_Dogs_Jack_Russell.jpg', title: 'Image 2', description: 'Description for Image 2' },
  { id: 3, src: 'https://upload.wikimedia.org/wikipedia/commons/6/69/Dog_morphological_variation.png', title: 'Image 3', description: 'Description for Image 3' }
];

const PhotoGallery: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<ImageItem | null>(null);

  const openModal = (image: ImageItem) => {
    setSelectedImage(image);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  return (
    <div>
      <h1>Image Gallery</h1>
      <div style={{ display: 'flex', gap: '10px' }}>
        {images.map((image) => (
          <img
            key={image.id}
            src={image.src}
            alt={image.title}
            style={{ width: '150px', cursor: 'pointer' }}
            onClick={() => openModal(image)}
          />
        ))}
      </div>

      {selectedImage && <ImageModal image={selectedImage} onClose={closeModal} />}
    </div>
  );
};

export default PhotoGallery;