import React from 'react';
import { Container } from 'react-bootstrap';
import PhotoGallery from './photo-gallery';

const ImageGalleryPage = () => {

  return (
    <>
      <Container>
        <div>
            <PhotoGallery></PhotoGallery>
        </div>

      </Container>

    </>

  );
};

export default ImageGalleryPage;