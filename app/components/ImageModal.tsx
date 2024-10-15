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

const modalStyles = {
  overlay: {
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '20px'
  },
  modal: {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '8px',
    width: '400px',
  },
  closeButton: {
    top: '10px',
    right: '10px',
    background: 'transparent',
    border: 'none',
    fontSize: '24px',
    cursor: 'pointer',
  },
};

export default ImageModal;