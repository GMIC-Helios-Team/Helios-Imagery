import { fetchImage } from '@/helpers/get-generated-image-api';
import { GetGeneratedImage, GetGeneratedImageItem } from '@/types/generation-response';
import React, { useEffect, useState } from 'react';

interface ImageCardProps {
    image: GetGeneratedImageItem;
    style?: React.CSSProperties;
    onClick: () => void;
}

const ImageCard: React.FC<ImageCardProps> = ({ image, style, onClick }) => {
    const [data, setData] = useState<GetGeneratedImage | null>(null);

    useEffect(() => {
    if (!image.HID) return;

    const retrieveImage = async () => {
      console.log('Issuing API request');
      try {
        const generatedImage = await fetchImage(image.HID as string);
        generatedImage.imagefilename = `${process.env.NEXT_PUBLIC_HELIOS_GALLERY}/${generatedImage.imagefilename}`
        setData(generatedImage);
      } catch (error) {
        const errImage: GetGeneratedImage = {
          imagefilename: '/err-pirate.png',
          prompt: "Yarr! Our robo-pirates searched every corner of the digital seas, but the image has gone overboard! Maybe it walked the plank? Sail back to safer waters",
          name: "Lost at Sea-Bot: Image Not Found",
          email: "",
          HID: "",
          imageThumbnailfilename: ""
        }
        setData(errImage);
      }
    };

    retrieveImage();

  }, [image.HID]);

    return (
        <div>
            <img
                src={data?.imagefilename}
                alt="Generated Image"
                style={style}
                onClick={onClick}
            />
        </div>
    );
};

// const galleryStyles: { image: React.CSSProperties } = {
//     image: {
//       width: '100%',    // Full width in each grid cell
//       height: '150px',  // Fixed height for uniformity
//       objectFit: 'cover',  // Ensure the image maintains its aspect ratio
//       cursor: 'pointer',  // Indicate the image is clickable
//       borderRadius: '10px',
//     }
//   };

export default ImageCard;