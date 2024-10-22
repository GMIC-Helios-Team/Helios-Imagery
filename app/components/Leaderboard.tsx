import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Container, Spinner, Alert } from 'react-bootstrap';
import { LeaderBoardItem } from '@/types/leader-board';

const LeaderBoard = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [leaderBoardItems, setLeaderBoardItems] = useState<LeaderBoardItem[]>([]);

  useEffect(() => {
    fetchLeaderBoardItems();
  }, []);

  const fetchLeaderBoardItems = async () => {
    const limit = 5;
    try {
      setIsLoading(true);
      setErrorMessage('');
      const response = await fetch(`/api/leader-board?limit=${limit}`);
      if (!response.ok) throw new Error('Failed to fetch leader board items');
      const data = await response.json();
      setLeaderBoardItems(data || []);
    } catch (error) {
      setErrorMessage('Failed to fetch leader board items');
      setLeaderBoardItems([]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
<Container className="mt-12 max-w-3xl mx-auto">
  <div className="text-center mb-4">
    <h2 className="text-3xl font-bold">Leader Board</h2>
    {isLoading && <Spinner animation="border" className="ml-2" />}
  </div>

  <Alert variant="danger" show={!!errorMessage}>
    <p className="text-sm font-bold">{errorMessage}</p>
  </Alert>

  <div className="space-y-4">
    {leaderBoardItems.length > 0 ? (
      <>
        <div className="grid grid-cols-3 items-center p-4 bg-gray-200 rounded-lg">
          <div className="col-span-2">
            <h3 className="text-lg font-semibold">Title</h3>
          </div>
          <div className="text-center text-lg font-semibold">
            Votes
          </div>
        </div>
        {leaderBoardItems.map((item) => (
          <Link key={item.HID} href={`/gallery/image/${item.HID}`} passHref>
            <div className="grid grid-cols-3 items-center p-4 bg-white shadow-md rounded-lg cursor-pointer transition hover:bg-gray-100">
              <div className="col-span-2">
                <h3 className="text-lg font-semibold">{item.Title}</h3>
                <p className="text-gray-600 text-sm">by: {item.name}</p>
              </div>
              <div className="text-center text-blue-600 text-lg font-bold">
                {item.voteCount}
              </div>
            </div>
          </Link>
        ))}
      </>
    ) : (
      <div className="text-center text-gray-500">
        No items to display
      </div>
    )}
  </div>
</Container>
  );
};

export default LeaderBoard;
