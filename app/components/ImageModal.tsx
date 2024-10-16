import { GetGeneratedImageItem } from '@/types/generation-response';
import React from 'react';

const ImageModal: React.FC<GetGeneratedImageItem> = ({ url, HID, name, prompt, likesAmount,  onClose }) => {
  // Handle click outside the modal content
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (e.target === e.currentTarget) {  // Check if the click is on the overlay itself
      onClose();  // Close the modal if clicked outside the modal content
    }
  };

  const LikeAnImage = () => {
    // Do like image actions
    // Check if it has already been liked somehow and if not, increment the like amount of the image

  }

  return (
    <div style={modalStyles.overlay} onClick={handleOverlayClick}>
      <div style={modalStyles.modal}>
        <button onClick={onClose} style={modalStyles.closeButton}>
          &times;
        </button>
        <img src={url} alt={name} style={{ width: '100%' }} />
        <h2>{HID}</h2>
        <p>{prompt}</p>
        <span><p>liked: {likesAmount ?? 0}</p><button onClick={() => LikeAnImage()}>I like this</button></span>
        
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