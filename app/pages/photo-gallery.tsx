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
  { id: 3, src: 'https://upload.wikimedia.org/wikipedia/commons/6/69/Dog_morphological_variation.png', title: 'Image 3', description: 'Description for Image 3' },
  { id: 1, src: 'https://upload.wikimedia.org/wikipedia/commons/3/33/Blue_merle_koolie_short_coat_heading_sheep.jpg', title: 'Image 1', description: 'Description for Image 1' },
  { id: 2, src: 'https://upload.wikimedia.org/wikipedia/commons/9/99/Brooks_Chase_Ranger_of_Jolly_Dogs_Jack_Russell.jpg', title: 'Image 2', description: 'Description for Image 2' },
  { id: 3, src: 'https://upload.wikimedia.org/wikipedia/commons/6/69/Dog_morphological_variation.png', title: 'Image 3', description: 'Description for Image 3' },
  { id: 1, src: 'https://upload.wikimedia.org/wikipedia/commons/3/33/Blue_merle_koolie_short_coat_heading_sheep.jpg', title: 'Image 1', description: 'Description for Image 1' },
  { id: 2, src: 'https://upload.wikimedia.org/wikipedia/commons/9/99/Brooks_Chase_Ranger_of_Jolly_Dogs_Jack_Russell.jpg', title: 'Image 2', description: 'Description for Image 2' },
  { id: 3, src: 'https://upload.wikimedia.org/wikipedia/commons/6/69/Dog_morphological_variation.png', title: 'Image 3', description: 'Description for Image 3' },
  { id: 1, src: 'https://upload.wikimedia.org/wikipedia/commons/3/33/Blue_merle_koolie_short_coat_heading_sheep.jpg', title: 'Image 1', description: 'Description for Image 1' },
  { id: 2, src: 'https://upload.wikimedia.org/wikipedia/commons/9/99/Brooks_Chase_Ranger_of_Jolly_Dogs_Jack_Russell.jpg', title: 'Image 2', description: 'Description for Image 2' },
  { id: 3, src: 'https://upload.wikimedia.org/wikipedia/commons/6/69/Dog_morphological_variation.png', title: 'Image 3', description: 'Description for Image 3' },  { id: 1, src: 'https://upload.wikimedia.org/wikipedia/commons/3/33/Blue_merle_koolie_short_coat_heading_sheep.jpg', title: 'Image 1', description: 'Description for Image 1' },
  { id: 2, src: 'https://upload.wikimedia.org/wikipedia/commons/9/99/Brooks_Chase_Ranger_of_Jolly_Dogs_Jack_Russell.jpg', title: 'Image 2', description: 'Description for Image 2' },
  { id: 3, src: 'https://upload.wikimedia.org/wikipedia/commons/6/69/Dog_morphological_variation.png', title: 'Image 3', description: 'Description for Image 3' },
  { id: 1, src: 'https://upload.wikimedia.org/wikipedia/commons/3/33/Blue_merle_koolie_short_coat_heading_sheep.jpg', title: 'Image 1', description: 'Description for Image 1' },
  { id: 2, src: 'https://upload.wikimedia.org/wikipedia/commons/9/99/Brooks_Chase_Ranger_of_Jolly_Dogs_Jack_Russell.jpg', title: 'Image 2', description: 'Description for Image 2' },
  { id: 3, src: 'https://upload.wikimedia.org/wikipedia/commons/6/69/Dog_morphological_variation.png', title: 'Image 3', description: 'Description for Image 3' },
  { id: 1, src: 'https://upload.wikimedia.org/wikipedia/commons/3/33/Blue_merle_koolie_short_coat_heading_sheep.jpg', title: 'Image 1', description: 'Description for Image 1' },
  { id: 2, src: 'https://upload.wikimedia.org/wikipedia/commons/9/99/Brooks_Chase_Ranger_of_Jolly_Dogs_Jack_Russell.jpg', title: 'Image 2', description: 'Description for Image 2' },
  { id: 3, src: 'https://upload.wikimedia.org/wikipedia/commons/6/69/Dog_morphological_variation.png', title: 'Image 3', description: 'Description for Image 3' },
  { id: 1, src: 'https://upload.wikimedia.org/wikipedia/commons/3/33/Blue_merle_koolie_short_coat_heading_sheep.jpg', title: 'Image 1', description: 'Description for Image 1' },
  { id: 2, src: 'https://upload.wikimedia.org/wikipedia/commons/9/99/Brooks_Chase_Ranger_of_Jolly_Dogs_Jack_Russell.jpg', title: 'Image 2', description: 'Description for Image 2' },
  { id: 3, src: 'https://upload.wikimedia.org/wikipedia/commons/6/69/Dog_morphological_variation.png', title: 'Image 3', description: 'Description for Image 3' },
  { id: 1, src: 'https://upload.wikimedia.org/wikipedia/commons/3/33/Blue_merle_koolie_short_coat_heading_sheep.jpg', title: 'Image 1', description: 'Description for Image 1' },
  { id: 2, src: 'https://upload.wikimedia.org/wikipedia/commons/9/99/Brooks_Chase_Ranger_of_Jolly_Dogs_Jack_Russell.jpg', title: 'Image 2', description: 'Description for Image 2' },
  { id: 3, src: 'https://upload.wikimedia.org/wikipedia/commons/6/69/Dog_morphological_variation.png', title: 'Image 3', description: 'Description for Image 3' },







];

// const PhotoGallery: React.FC = () => {
//   const [selectedImage, setSelectedImage] = useState<ImageItem | null>(null);

//   const openModal = (image: ImageItem) => {
//     setSelectedImage(image);
//   };

//   const closeModal = () => {
//     setSelectedImage(null);
//   };

//   return (
//     <div>
//       <h1>Image Gallery</h1>
//       <div style={{ display: 'flex', gap: '10px' }}>
//         {images.map((image) => (
//           <img
//             key={image.id}
//             src={image.src}
//             alt={image.title}
//             style={{ width: '150px', cursor: 'pointer' }}
//             onClick={() => openModal(image)}
//           />
//         ))}
//       </div>

//       {selectedImage && <ImageModal image={selectedImage} onClose={closeModal} />}
//     </div>
//   );
// };

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
        <div style={galleryStyles.container}>
          {images.map((image) => (
            <img
              key={image.id}
              src={image.src}
              alt={image.title}
              style={galleryStyles.image}
              onClick={() => openModal(image)}
            />
          ))}
        </div>
  
        {selectedImage && <ImageModal image={selectedImage} onClose={closeModal} />}
      </div>
    );
  };
  
  // Updated styles for CSS Grid
  const galleryStyles: { container: React.CSSProperties; image: React.CSSProperties } = {
    container: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', // Responsive grid
      gap: '10px',  // Space between images
    },
    image: {
      width: '100%',    // Full width in each grid cell
      height: '150px',  // Fixed height
      objectFit: 'cover',  // Ensure image fits within the grid cell while maintaining aspect ratio
      cursor: 'pointer',  // Indicate clickable images
    },
  };
  

export default PhotoGallery;