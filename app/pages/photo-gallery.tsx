import React, {  useState } from 'react';
import ImageModal from '@/components/ImageModal';

interface ImageItem {
  id: number;
  src: string;
  title: string;
  description: string;
  likesAmount?: number;
}

const images: ImageItem[] = [
  { id: 1, src: 'https://upload.wikimedia.org/wikipedia/commons/3/33/Blue_merle_koolie_short_coat_heading_sheep.jpg', title: 'Image 1', description: 'Description for Image 1' , likesAmount: 2},
  { id: 2, src: 'https://upload.wikimedia.org/wikipedia/commons/9/99/Brooks_Chase_Ranger_of_Jolly_Dogs_Jack_Russell.jpg', title: 'Image 2', description: 'Description for Image 2' },
  { id: 1, src: 'https://upload.wikimedia.org/wikipedia/commons/3/33/Blue_merle_koolie_short_coat_heading_sheep.jpg', title: 'Image 1', description: 'Description for Image 1' , likesAmount: 2},
  { id: 2, src: 'https://upload.wikimedia.org/wikipedia/commons/9/99/Brooks_Chase_Ranger_of_Jolly_Dogs_Jack_Russell.jpg', title: 'Image 2', description: 'Description for Image 2' },{ id: 1, src: 'https://upload.wikimedia.org/wikipedia/commons/3/33/Blue_merle_koolie_short_coat_heading_sheep.jpg', title: 'Image 1', description: 'Description for Image 1' , likesAmount: 2},
  { id: 2, src: 'https://upload.wikimedia.org/wikipedia/commons/9/99/Brooks_Chase_Ranger_of_Jolly_Dogs_Jack_Russell.jpg', title: 'Image 2', description: 'Description for Image 2' },{ id: 1, src: 'https://upload.wikimedia.org/wikipedia/commons/3/33/Blue_merle_koolie_short_coat_heading_sheep.jpg', title: 'Image 1', description: 'Description for Image 1' , likesAmount: 2},
  { id: 2, src: 'https://upload.wikimedia.org/wikipedia/commons/9/99/Brooks_Chase_Ranger_of_Jolly_Dogs_Jack_Russell.jpg', title: 'Image 2', description: 'Description for Image 2' },{ id: 1, src: 'https://upload.wikimedia.org/wikipedia/commons/3/33/Blue_merle_koolie_short_coat_heading_sheep.jpg', title: 'Image 1', description: 'Description for Image 1' , likesAmount: 2},
  { id: 2, src: 'https://upload.wikimedia.org/wikipedia/commons/9/99/Brooks_Chase_Ranger_of_Jolly_Dogs_Jack_Russell.jpg', title: 'Image 2', description: 'Description for Image 2' },{ id: 1, src: 'https://upload.wikimedia.org/wikipedia/commons/3/33/Blue_merle_koolie_short_coat_heading_sheep.jpg', title: 'Image 1', description: 'Description for Image 1' , likesAmount: 2},
  { id: 2, src: 'https://upload.wikimedia.org/wikipedia/commons/9/99/Brooks_Chase_Ranger_of_Jolly_Dogs_Jack_Russell.jpg', title: 'Image 2', description: 'Description for Image 2' },{ id: 1, src: 'https://upload.wikimedia.org/wikipedia/commons/3/33/Blue_merle_koolie_short_coat_heading_sheep.jpg', title: 'Image 1', description: 'Description for Image 1' , likesAmount: 2},
  { id: 2, src: 'https://upload.wikimedia.org/wikipedia/commons/9/99/Brooks_Chase_Ranger_of_Jolly_Dogs_Jack_Russell.jpg', title: 'Image 2', description: 'Description for Image 2' },{ id: 1, src: 'https://upload.wikimedia.org/wikipedia/commons/3/33/Blue_merle_koolie_short_coat_heading_sheep.jpg', title: 'Image 1', description: 'Description for Image 1' , likesAmount: 2},
  { id: 2, src: 'https://upload.wikimedia.org/wikipedia/commons/9/99/Brooks_Chase_Ranger_of_Jolly_Dogs_Jack_Russell.jpg', title: 'Image 2', description: 'Description for Image 2' },{ id: 1, src: 'https://upload.wikimedia.org/wikipedia/commons/3/33/Blue_merle_koolie_short_coat_heading_sheep.jpg', title: 'Image 1', description: 'Description for Image 1' , likesAmount: 2},
  { id: 2, src: 'https://upload.wikimedia.org/wikipedia/commons/9/99/Brooks_Chase_Ranger_of_Jolly_Dogs_Jack_Russell.jpg', title: 'Image 2', description: 'Description for Image 2' },{ id: 1, src: 'https://upload.wikimedia.org/wikipedia/commons/3/33/Blue_merle_koolie_short_coat_heading_sheep.jpg', title: 'Image 1', description: 'Description for Image 1' , likesAmount: 2},
  { id: 2, src: 'https://upload.wikimedia.org/wikipedia/commons/9/99/Brooks_Chase_Ranger_of_Jolly_Dogs_Jack_Russell.jpg', title: 'Image 2', description: 'Description for Image 2' },{ id: 1, src: 'https://upload.wikimedia.org/wikipedia/commons/3/33/Blue_merle_koolie_short_coat_heading_sheep.jpg', title: 'Image 1', description: 'Description for Image 1' , likesAmount: 2},
  { id: 2, src: 'https://upload.wikimedia.org/wikipedia/commons/9/99/Brooks_Chase_Ranger_of_Jolly_Dogs_Jack_Russell.jpg', title: 'Image 2', description: 'Description for Image 2' },{ id: 1, src: 'https://upload.wikimedia.org/wikipedia/commons/3/33/Blue_merle_koolie_short_coat_heading_sheep.jpg', title: 'Image 1', description: 'Description for Image 1' , likesAmount: 2},
  { id: 2, src: 'https://upload.wikimedia.org/wikipedia/commons/9/99/Brooks_Chase_Ranger_of_Jolly_Dogs_Jack_Russell.jpg', title: 'Image 2', description: 'Description for Image 2' },{ id: 1, src: 'https://upload.wikimedia.org/wikipedia/commons/3/33/Blue_merle_koolie_short_coat_heading_sheep.jpg', title: 'Image 1', description: 'Description for Image 1' , likesAmount: 2},
  { id: 2, src: 'https://upload.wikimedia.org/wikipedia/commons/9/99/Brooks_Chase_Ranger_of_Jolly_Dogs_Jack_Russell.jpg', title: 'Image 2', description: 'Description for Image 2' },{ id: 1, src: 'https://upload.wikimedia.org/wikipedia/commons/3/33/Blue_merle_koolie_short_coat_heading_sheep.jpg', title: 'Image 1', description: 'Description for Image 1' , likesAmount: 2},
  { id: 2, src: 'https://upload.wikimedia.org/wikipedia/commons/9/99/Brooks_Chase_Ranger_of_Jolly_Dogs_Jack_Russell.jpg', title: 'Image 2', description: 'Description for Image 2' },{ id: 1, src: 'https://upload.wikimedia.org/wikipedia/commons/3/33/Blue_merle_koolie_short_coat_heading_sheep.jpg', title: 'Image 1', description: 'Description for Image 1' , likesAmount: 2},
  { id: 2, src: 'https://upload.wikimedia.org/wikipedia/commons/9/99/Brooks_Chase_Ranger_of_Jolly_Dogs_Jack_Russell.jpg', title: 'Image 2', description: 'Description for Image 2' },{ id: 1, src: 'https://upload.wikimedia.org/wikipedia/commons/3/33/Blue_merle_koolie_short_coat_heading_sheep.jpg', title: 'Image 1', description: 'Description for Image 1' , likesAmount: 2},
  { id: 2, src: 'https://upload.wikimedia.org/wikipedia/commons/9/99/Brooks_Chase_Ranger_of_Jolly_Dogs_Jack_Russell.jpg', title: 'Image 2', description: 'Description for Image 2' },{ id: 1, src: 'https://upload.wikimedia.org/wikipedia/commons/3/33/Blue_merle_koolie_short_coat_heading_sheep.jpg', title: 'Image 1', description: 'Description for Image 1' , likesAmount: 2},
  { id: 2, src: 'https://upload.wikimedia.org/wikipedia/commons/9/99/Brooks_Chase_Ranger_of_Jolly_Dogs_Jack_Russell.jpg', title: 'Image 2', description: 'Description for Image 2' },{ id: 1, src: 'https://upload.wikimedia.org/wikipedia/commons/3/33/Blue_merle_koolie_short_coat_heading_sheep.jpg', title: 'Image 1', description: 'Description for Image 1' , likesAmount: 2},
  { id: 2, src: 'https://upload.wikimedia.org/wikipedia/commons/9/99/Brooks_Chase_Ranger_of_Jolly_Dogs_Jack_Russell.jpg', title: 'Image 2', description: 'Description for Image 2' },{ id: 1, src: 'https://upload.wikimedia.org/wikipedia/commons/3/33/Blue_merle_koolie_short_coat_heading_sheep.jpg', title: 'Image 1', description: 'Description for Image 1' , likesAmount: 2},
  { id: 2, src: 'https://upload.wikimedia.org/wikipedia/commons/9/99/Brooks_Chase_Ranger_of_Jolly_Dogs_Jack_Russell.jpg', title: 'Image 2', description: 'Description for Image 2' },{ id: 1, src: 'https://upload.wikimedia.org/wikipedia/commons/3/33/Blue_merle_koolie_short_coat_heading_sheep.jpg', title: 'Image 1', description: 'Description for Image 1' , likesAmount: 2},
  { id: 2, src: 'https://upload.wikimedia.org/wikipedia/commons/9/99/Brooks_Chase_Ranger_of_Jolly_Dogs_Jack_Russell.jpg', title: 'Image 2', description: 'Description for Image 2' },{ id: 1, src: 'https://upload.wikimedia.org/wikipedia/commons/3/33/Blue_merle_koolie_short_coat_heading_sheep.jpg', title: 'Image 1', description: 'Description for Image 1' , likesAmount: 2},
  { id: 2, src: 'https://upload.wikimedia.org/wikipedia/commons/9/99/Brooks_Chase_Ranger_of_Jolly_Dogs_Jack_Russell.jpg', title: 'Image 2', description: 'Description for Image 2' },{ id: 1, src: 'https://upload.wikimedia.org/wikipedia/commons/3/33/Blue_merle_koolie_short_coat_heading_sheep.jpg', title: 'Image 1', description: 'Description for Image 1' , likesAmount: 2},
  { id: 2, src: 'https://upload.wikimedia.org/wikipedia/commons/9/99/Brooks_Chase_Ranger_of_Jolly_Dogs_Jack_Russell.jpg', title: 'Image 2', description: 'Description for Image 2' },{ id: 1, src: 'https://upload.wikimedia.org/wikipedia/commons/3/33/Blue_merle_koolie_short_coat_heading_sheep.jpg', title: 'Image 1', description: 'Description for Image 1' , likesAmount: 2},
  { id: 2, src: 'https://upload.wikimedia.org/wikipedia/commons/9/99/Brooks_Chase_Ranger_of_Jolly_Dogs_Jack_Russell.jpg', title: 'Image 2', description: 'Description for Image 2' },{ id: 1, src: 'https://upload.wikimedia.org/wikipedia/commons/3/33/Blue_merle_koolie_short_coat_heading_sheep.jpg', title: 'Image 1', description: 'Description for Image 1' , likesAmount: 2},
  { id: 2, src: 'https://upload.wikimedia.org/wikipedia/commons/9/99/Brooks_Chase_Ranger_of_Jolly_Dogs_Jack_Russell.jpg', title: 'Image 2', description: 'Description for Image 2' },{ id: 1, src: 'https://upload.wikimedia.org/wikipedia/commons/3/33/Blue_merle_koolie_short_coat_heading_sheep.jpg', title: 'Image 1', description: 'Description for Image 1' , likesAmount: 2},
  { id: 2, src: 'https://upload.wikimedia.org/wikipedia/commons/9/99/Brooks_Chase_Ranger_of_Jolly_Dogs_Jack_Russell.jpg', title: 'Image 2', description: 'Description for Image 2' },
];


const PhotoGallery: React.FC = () => {
    const [selectedImage, setSelectedImage] = useState<ImageItem | null>(null);
  //   const [images, setImages] = useState<ImageItem[]>([]); // State to hold images

  //   const fetchImages = async () => {
  //       try {
  //         const response = await fetch('https://api.unsplash.com/photos/random?count=10&client_id=YOUR_ACCESS_KEY');  // Replace with your API endpoint and key
  //         const data = await response.json();
  //         setImages(data);  // Update state with fetched images
  //       } catch (error) {
  //         console.error('Error fetching images:', error);
  //       }
  //     };

  //       // Step 3: Use useEffect to call fetchImages when the component mounts
  // useEffect(() => {
  //   fetchImages();
  // }, []);  // Empty dependency array means this runs once on mount
  
    const openModal = (image: ImageItem) => {
      setSelectedImage(image);
    };
  
    const closeModal = () => {
      setSelectedImage(null);
    };
  
    return (
      <div>
        <h1>Generated Images</h1>
        <div style={galleryStyles.container}>
          {images.map((image) => (
            <div key={image.id} style={galleryStyles.itemContainer}>
              
              <img
                src={image.src}
                alt={image.title}
                style={galleryStyles.image}
                onClick={() => openModal(image)}
              />
              <div style={galleryStyles.imageBorder}></div>
              
              {/* Center the link under the image */}
              <a 
                href={image.title} 
                target="_blank" 
                rel="noopener noreferrer"
                style={{ textDecoration: 'none' }}
              >
                View
              </a>
            </div>
          ))}
        </div>
    
        {selectedImage && <ImageModal image={selectedImage} onClose={closeModal} />}
      </div>
    );
  };
  
  const galleryStyles: { container: React.CSSProperties; itemContainer: React.CSSProperties; image: React.CSSProperties, imageBorder: React.CSSProperties } = {
    container: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', // Responsive grid
      gap: '10px',  // Space between images
    },
    itemContainer: {
      textAlign: 'center', // Center the content (image and link) inside each grid item
      border: '2px solid #ccc', 
      borderRadius: '10px',
      padding: '5px',
    },
    image: {
      width: '100%',    // Full width in each grid cell
      height: '150px',  // Fixed height for uniformity
      objectFit: 'cover',  // Ensure the image maintains its aspect ratio
      cursor: 'pointer',  // Indicate the image is clickable
      borderRadius: '10px',
    },
    imageBorder: {
      paddingTop: '10px',
      paddingBottom: '3px',
      borderBottom: '2px solid #ccc' /* Bottom border */
    }
  };
  

export default PhotoGallery;