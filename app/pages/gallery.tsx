import React from 'react';
import { Container } from 'react-bootstrap';
import PhotoGallery from './photo-gallery';

const GalleryPage = () => {

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

export default GalleryPage;