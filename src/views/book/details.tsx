'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { BookInfo, mapApiResponseToBookInfo } from 'types/books';
import { Typography, Rating } from '@mui/material';

const Loading = () => <p>Loading...</p>;
const ErrorMessage = ({ error }: { error: string }) => <p>Error: {error}</p>;

const fetchBookDetails = async (isbn13: string, setBookDetails: any, setLoading: any, setError: any) => {
  try {
    const response = await fetch(`http://localhost:4000/library/isbn13/${isbn13}`);
    if (!response.ok) {
      throw new Error('Failed to fetch book details');
    }
    const data = await response.json();
    setBookDetails(mapApiResponseToBookInfo(data));
    setLoading(false);
  } catch (err: any) {
    setError(err.message);
    setLoading(false);
  }
};

const BookDetails = () => {
  const searchParams = useSearchParams();
  const isbn13 = searchParams.get('isbn13');
  const [bookDetails, setBookDetails] = useState<BookInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();
  const handleAuthorsClick = (authors: string) => {
    router.push(`/search-book?authors=${authors}`);
  };

  useEffect(() => {
    if (isbn13) {
      fetchBookDetails(isbn13, setBookDetails, setLoading, setError);
    }
  }, [isbn13]);

  if (loading) return <Loading />;
  if (error) return <ErrorMessage error={error} />;
  if (!bookDetails) return <p>Book details not found.</p>;

  return (
    <div>
      <Typography variant="h1" component="div" style={{ marginBottom: '20px' }}>
      {bookDetails.title}
      </Typography>
      <div className="row" style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: '40px', alignItems: 'flex-start' }}>
        <div className="column" style={{ flex: '0 0 auto' }}>
          <img
            src={bookDetails.image_url || 'https://dummyimage.com/400x600/556b2f/fff&text=NoCoverFound'}
            alt={`Cover of ${bookDetails.title}`}
            style={{
              maxWidth: '400px',
              display: 'block',
              marginTop: '20px'
            }}
          />
        </div>
        <div className="column" style={{ flex: '1 1 auto' }}>
          <Typography variant="h4" style={{ marginTop: '0' }}>
            <p onClick={() => handleAuthorsClick(bookDetails.authors)}>
            <strong>Author:</strong> {bookDetails.authors}
            </p>
            <p>
              <strong>Published:</strong> {bookDetails.publication_year}
            </p>
            <p>
            <strong>ISBN:</strong> {bookDetails.isbn13}
            </p>
            <Rating 
                value={bookDetails.rating_avg || 0} 
                precision={0.1} 
                readOnly 
                size="medium"
              />
              {bookDetails.rating_avg !== undefined && bookDetails.rating_avg !== null && (
                <Typography variant="body2" color="text.secondary">
                  ({bookDetails.rating_avg.toFixed(1)})
                  {bookDetails.rating_count ? ` - ${bookDetails.rating_count} ratings` : ''}
                </Typography>
              )}
          </Typography>
        </div>
      </div>
    </div>
  );
};
export default BookDetails;
