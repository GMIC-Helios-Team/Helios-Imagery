import { fetchImage } from '@/helpers/get-generated-image-api';
import { GetGeneratedImage, GetGeneratedImageItem } from '@/types/generation-response';
import React, { useEffect, useState } from 'react';
import ReactModal from './ReactModal';

interface ImageCardProps {
    image: GetGeneratedImageItem;
}

const ImageCard: React.FC<ImageCardProps> = ({ image }) => {
    const [data, setData] = useState<GetGeneratedImage | null>(null);
    //let data: GetGeneratedImage;
    useEffect(() => {
    if (!image.HID) return;

    const retrieveImage = async () => {
      console.log('Issuing API request');
      try {
        data!.imagefilename = `${process.env.NEXT_PUBLIC_HELIOS_GALLERY}/${image.imageThumbnailfilename}`
        data!.imagefilename = `${process.env.NEXT_PUBLIC_HELIOS_GALLERY}/${image.imageThumbnailfilename}`
        setData(data)
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
            <ReactModal src={`${process.env.NEXT_PUBLIC_HELIOS_GALLERY}/${image.imageThumbnailfilename}`} image={image}/>
        </>
    );
};

export default ImageCard;