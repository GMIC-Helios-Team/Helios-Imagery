import React from 'react';

interface ImageModalProps {
  image: {
    id: number;
    src: string;
    title: string;
    description: string;
  };
  onClose: () => void;
}

const ImageModal: React.FC<ImageModalProps> = ({ image, onClose }) => {
  return (
    <div style={modalStyles.overlay}>
      <div style={modalStyles.modal}>
        <button onClick={onClose} style={modalStyles.closeButton}>
          &times;
        </button>
        <img src={image.src} alt={image.title} style={{ width: '100%' }} />
        <h2>{image.title}</h2>
        <p>{image.description}</p>
      </div>
    </div>
  );
};

const modalStyles: { overlay: React.CSSProperties; modal: React.CSSProperties; closeButton: React.CSSProperties } = {
  overlay: {
    position: 'fixed',  // Ensure the modal covers the entire viewport
    top: 0,
    left: 0,
    width: '100vw',  // Full viewport width
    height: '100vh',  // Full viewport height
    backgroundColor: 'rgba(0, 0, 0, 0.5)',  // Semi-transparent background
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,  // Make sure it appears above all other content
  },
  modal: {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '8px',
    width: '400px',
    maxHeight: '90vh',  // Prevent overflow on smaller screens
    overflowY: 'auto',  // Scroll if content exceeds modal height
    position: 'relative',  // Position relative to its container
  },
  closeButton: {
    position: 'absolute',
    top: '10px',
    right: '10px',
    background: 'transparent',
    border: 'none',
    fontSize: '24px',
    cursor: 'pointer',
  },
};

export default ImageModal;