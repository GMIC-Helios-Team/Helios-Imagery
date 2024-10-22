/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useEffect } from 'react';
import { Card, Col, Container, Row, Image, Button, Spinner } from 'react-bootstrap';
import { GalleryItem } from '@/types/image-gallery';
import { useTheme } from '@/contexts/theme-context';
import { fetchTitle } from '@/helpers/get-title';

interface GalleryListProps {
  items: GalleryItem[];
  showVote: (image: GalleryItem) => void;
  paging: PagingProps;
}

interface VoteProps {
  item: GalleryItem | null;
  showGalleryList: () => void;
}

interface GalleryPagingProps {
  paging: PagingProps;
}

interface PagingProps {
  currentPage: number;
  totalPages: number;
  handlePrev: () => void;
  handleNext: () => void;
  isLoading: boolean;
}

const GalleryPage = () => {

  const [vote, setVote] = useState(false);
  const [selectedGalleryItem, setSelectedGalleryItem] = useState<GalleryItem | null>(null);
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const limit = 8;

  useEffect(() => {
    fetchImages((currentPage - 1) * limit, limit);
  }, [currentPage]);

  const handlePrev = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNext = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const fetchImages = async (offset: number, limit: number) => {
    try {
      setIsLoading(true);
      const response = await fetch(`/api/image-gallery?offset=${offset}&limit=${limit}`);

      if (!response.ok) {
        throw new Error('Failed to fetch images');
      }

      const data = await response.json();
      setGalleryItems(data.items);
      setTotalPages(Math.ceil(data.totalCount / limit));

    } catch (error) {
      console.error('Error fetching images:', error);
    }
    finally {
      setIsLoading(false);
    }
  };

  const showVote = (image: GalleryItem) => {
    setSelectedGalleryItem(image)
    setVote(true);
  };

  const showGalleryList = () => {
    setVote(false);
  };

  return (
    <>
      <Container style={{ marginTop: '50px' }}>
        <Row className="mb-4">
          <Col sm={{span:12}} md={{ span: 12 }} xl={{ span: 12 }} >
            {vote ?
              (<Vote showGalleryList={showGalleryList} item={selectedGalleryItem} />)
              :
              (<GalleryList
                items={galleryItems}
                showVote={showVote}
                paging={{ currentPage, totalPages, handlePrev, handleNext, isLoading }}
              />)
            }
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default GalleryPage;

const GalleryList: React.FC<GalleryListProps> = ({ items, showVote, paging }) => {
  const { isDarkTheme } = useTheme();
  const { isLoading } = paging;

  const renderImages = (galleryItems: GalleryItem[]) => {
    return galleryItems.map((item) => (
      <Col  xs={6} md={4} key={item._id}>
        <Image src={`${process.env.NEXT_PUBLIC_HELIOS_GALLERY}/${item.imageThumbnailfilename}`} fluid thumbnail height={150} width={150} onClick={() => showVote(item)} />
      </Col>
    ));
  };
  return (
    <>
      <Card className={`cardBackgroundCustom cardShadowCustom ${isDarkTheme ? 'bg-dark text-light' : 'LightThemeBG text-dark'}`}>
        <Card.Header>Gallery Image {isLoading && <Spinner className="spinnerCustomRight m1-2" animation="border" size="sm" />} </Card.Header>
        <GalleryPaging paging={paging} />
        <Card.Body>
          <Row>
            {renderImages(items)}
          </Row>
        </Card.Body>
      </Card>
    </>
  )
}

const Vote: React.FC<VoteProps> = ({ showGalleryList, item }) => {

  const { isDarkTheme } = useTheme();
  const [title, setTitle] = useState('')
  const [hasVoted, setHasVoted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!item) return
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

  const likeImage = async () => {
    try {

      const response = await fetch("/api/image-gallery", {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ HID: item?.HID, voteCount: item?.voteCount }),
      });

      if (!response.ok) {
        throw new Error('Failed to like images');
      }

    } catch (error) {
      console.error('Error fetching images:', error);
    }
  };
  const handleLike = () => {
    if (!item) return
    item.voteCount = (item.voteCount || 0) + 1;
    setHasVoted(true);
    likeImage();
  };

  return (
    <Card className={`${"cardBackgroundCustom"} ${"cardShadowCustom"} ${isDarkTheme ? 'bg-dark text-light' : 'LightThemeBG text-dark'}`}>
      <Card.Header>Vote
        <Button  variant="link" onClick={showGalleryList} className={"buttonCustomRight"} >
          Back
        </Button>
      </Card.Header>
      <Card.Body>
        <Card.Title>{item?.name}</Card.Title>
        <Image src={`${process.env.NEXT_PUBLIC_HELIOS_GALLERY}/${item?.imagefilename}`} fluid />
        {isLoading ? (
          <Card.Title className="cardHeaderCustom cardTitleCustom" >Generating Title...<Spinner className="spinnerCustomRight m1-2" animation="border" size="sm" /> </Card.Title>
        ) : (
          <Card.Title className="cardHeaderCustom cardTitleCustom" > {item?.Title || title}</Card.Title>
        )}
        <Button disabled={hasVoted} variant="link" onClick={handleLike} className="voteButton">
          Like ({item?.voteCount || 0})
        </Button>
      </Card.Body>
    </Card>
  )
}

const GalleryPaging: React.FC<GalleryPagingProps> = ({ paging }) => {
  const { currentPage, totalPages, handlePrev, handleNext } = paging;

  return (
    <div className="d-flex justify-content-between align-items-center mt-1">
      <Button variant="link" onClick={handlePrev} disabled={currentPage === 1}>
        Prev
      </Button>
      <span className="pagingText">{currentPage} of {totalPages}</span>
      <Button variant="link" onClick={handleNext} disabled={currentPage === totalPages}>
        Next
      </Button>
    </div>
  );
}
