import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { Col, Container, Row, Image, Card, Spinner, Button } from 'react-bootstrap';
import { fetchImage } from '@/helpers/get-generated-image-api';
import { GetGeneratedImage } from '@/types/generation-response';
import { fetchTitle } from '@/helpers/get-title';
//import { useTheme } from '@/contexts/theme-context';

interface GalleryImageButtonProps {
  isLoading: boolean;
}

const GalleryImage = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [data, setData] = useState<GetGeneratedImage | null>(null);
  const [hasVoted, setHasVoted] = useState(false);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (!id) return;

    const retrieveImage = async () => {
      try {
        setIsLoading(true);
        const generatedImage = await fetchImage(id as string);
        console.log(generatedImage);
        generatedImage.imagefilename = `${process.env.NEXT_PUBLIC_HELIOS_GALLERY}/${generatedImage.imagefilename}`
        setData(generatedImage);
      } catch (error) {
        const errImage: GetGeneratedImage = {
          _id: "",
          imagefilename: '/err-pirate.png',
          prompt: "Yarr! Our robo-pirates searched every corner of the digital seas, but the image has gone overboard! Maybe it walked the plank? Sail back to safer waters",
          name: "Lost at Sea-Bot",
          email: "",
          HID: "",
          imageThumbnailfilename: "",
          Title: "Shiver me timbers!",
          voteCount: 0,
          SendGridMessageId: "",
          createDatetime: "",
          updateDatetime: "",
          EmailSentDateTime: ""
        }
        setData(errImage);
      }
      finally {
        setIsLoading(false);
      }
    };

    retrieveImage();

  }, [id, router]);

  const likeImage = async () => {
    try {
      const response = await fetch("/api/image-gallery", {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ HID: data?.HID, voteCount: data?.voteCount }),
      });

      if (!response.ok) {
        throw new Error('Failed to like images');
      }

    } catch (error) {
      console.error('Error fetching images:', error);
    }
  };

  const handleLike = () => {
    if (!data) return;
    data.voteCount = (data.voteCount || 0) + 1;
    setHasVoted(true);
    likeImage();
  };

  return (
    <Container style={{ marginTop: '50px' }}>
      <Row className="mb-4">
        <Col sm={{span:12}} md={{ span: 12 }} xl={{ span: 12 }} >
          <Card className="cardBackgroundCustom cardShadowCustom">
            <Card.Header>
              Gallery Image
              <GalleryImageButton isLoading={isLoading} ></GalleryImageButton>
            </Card.Header>
            <Card.Body>
              {isLoading ? (
                <p>Loading...</p>
              ) : (
                <GalleryImageDetail item={data} hasVoted={hasVoted} handleLike={handleLike} />
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default GalleryImage;

interface GalleryImageDetailProps {
  item: GetGeneratedImage | null;
  hasVoted: boolean;
  handleLike: () => void;
}

const GalleryImageDetail: React.FC<GalleryImageDetailProps> = ({ item, hasVoted, handleLike }) => {
  const [title, setTitle] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  //const { isDarkTheme } = useTheme();

  useEffect(() => {
    if (!item) return;
    if (item.Title === undefined || item.Title.trim() === '') {
      setIsLoading(true);
      fetchTitle(item.HID).then((data) => {
        item.Title = data.Title;
        setTitle(data.Title);
      })
        .catch((error) => {
          console.error('Error fetching title:', error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [setIsLoading, item]);

  return (
    <>
      <Card.Title>{item?.name}</Card.Title>
      <Image
        src={item?.imagefilename}
        fluid
        className={"imageBeveled"}
        alt="Generated Image"
      />
      {isLoading ? (
        <Card.Title className="cardHeaderCustom cardTitleCustom" >Generating Title...<Spinner className="spinnerCustomRight m1-2" animation="border" size="sm" /> </Card.Title>
      ) : (
        <Card.Title className="cardHeaderCustom cardTitleCustom" > {item?.Title || title}</Card.Title>
      )}
      <Card.Text className="cardTextCustom">{item?.prompt}</Card.Text>
      <Button disabled={hasVoted} variant="link" onClick={handleLike} className="voteButton">
        Like ({item?.voteCount || 0})
      </Button>
    </>
  );
}

const GalleryImageButton: React.FC<GalleryImageButtonProps> = ({ isLoading }) => {
  const router = useRouter();

  const navigateHome = () => {
    router.push('/');
  };
  return (
    <>
      {isLoading ? (
        <Spinner className="spinnerCustomRight" animation="border" size="sm" />
      ) : (
        <Button className="buttonCustomRight" variant="link" onClick={navigateHome}>
          Home
        </Button>
      )}
    </>
  );
}