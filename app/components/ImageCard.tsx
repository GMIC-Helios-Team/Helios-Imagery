import { fetchImage } from '@/helpers/get-generated-image-api';
import { GetGeneratedImage, GetGeneratedImageItem } from '@/types/generation-response';
import React, { useEffect, useState } from 'react';
import ReactModal from './ReactModal';

interface ImageCardProps {
    image: GetGeneratedImageItem;
    style?: React.CSSProperties;
}

const ImageCard: React.FC<ImageCardProps> = ({ image, style }) => {
    const [data, setData] = useState<GetGeneratedImage | null>(null);

    useEffect(() => {
    if (!image.HID) return;

    const retrieveImage = async () => {
      console.log('Issuing API request');
      try {
        const generatedImage = await fetchImage(image.HID as string);
        generatedImage.imagefilename = `${process.env.NEXT_PUBLIC_HELIOS_GALLERY}/${generatedImage.imagefilename}`
        generatedImage.imageThumbnailfilename = `${process.env.NEXT_PUBLIC_HELIOS_GALLERY}/${generatedImage.imageThumbnailfilename}`
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
        <>
            <ReactModal src={data?.imageThumbnailfilename} image={image} style={style}/>
        </>
    );
};

export default ImageCard;