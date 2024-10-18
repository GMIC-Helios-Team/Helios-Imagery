import { GetGeneratedImageItem } from '@/types/generation-response';
import ps from '@/styles/photo-gallery.module.css';
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';

interface ImageProperties {
    src?: string;
    image: GetGeneratedImageItem;
}

const ModalImage: React.FC<ImageProperties> = ({ src, image }) => {
    const [fullscreen, setFullscreen] = useState<true | undefined>(true);  // Allow only true or undefined
    const [show, setShow] = useState(false);

    function handleShow() {
        setFullscreen(true);  // Always set fullscreen to true
        setShow(true);
    }

    return (
        <>
            <img
                src={src}
                alt="Image Not Found"
                onClick={handleShow}
                className={ps.image}
            />
            <Modal show={show} fullscreen={fullscreen} onHide={() => setShow(false)}>
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
            </Modal>
        </>
    );
}

export default ModalImage;