import { GetGeneratedImageItem } from '@/types/generation-response';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import ps from '@/styles/photo-gallery.module.css';

interface ImageProperties {
    src?: string;
    image: GetGeneratedImageItem;
    style?: React.CSSProperties;
}
const ModalImage: React.FC<ImageProperties> = ({ src, image, style }) => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <img
                src={src}
                alt="Image Not Found"
                onClick={handleShow}
                style={style}
                className={ps.image}
            />
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{image.name}</Modal.Title>
                </Modal.Header>
                <Modal.Header className='imageContainer'>
                
                    <img
                        src={src}
                        alt="Image Not Found"
                        onClick={handleShow}
                        className={ps.squareImage}
                    />
                </Modal.Header>
                <Modal.Body>{image.prompt}</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalImage;