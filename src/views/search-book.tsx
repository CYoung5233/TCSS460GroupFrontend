'use client';

import React, { useState, useEffect } from 'react';
import MainCard from 'components/MainCard';
import {
  Typography,
  Select,
  MenuItem,
  List,
  ListItem,
  ListItemText,
  Rating,
  Box,
  CircularProgress,
  Grid,
  SelectChangeEvent,
  Button,
  TextField,
  Alert
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

// routing
import { useSearchParams, useRouter } from 'next/navigation';
import { set } from 'lodash';

interface Book {
  isbn13: string;
  authors: string;
  publication_year: number;
  title: string;
  rating_avg: number;
  rating_count?: number;
}

export default function SearchBook() {
  const searchParams = useSearchParams();
  const authors = searchParams.get('authors');
  const published = searchParams.get('published');
  const rating = searchParams.get('rating');
  const value = (authors || published || rating);
  const [initialSearchDone, setInitialSearchDone] = useState(!value);
  const [searchType, setSearchType] = useState('title');
  const [searchValue, setSearchValue] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    if (!initialSearchDone && value) {
      switch(value) {
        case authors:
          setSearchType('author');
          break;
        case published:
          setSearchType('year');
          break;
        case rating:
          setSearchType('rating');
          break;
      }
      setSearchValue(value);
      setBooks([]);  // Clear books whenever search params change
      setError(null);  // Reset error state
    }
  }, [authors, published, rating]);

  useEffect(() => {
    if (!initialSearchDone && (searchType === 'author' || searchType === 'year' || searchType === 'rating') && searchValue === value) {
      handleSearchClick();
      setInitialSearchDone(true);
    }
  }, [searchValue, searchType]); 


  useEffect(() => {
    if(initialSearchDone) {
      setSearchValue('');
      setBooks([]);
      setError(null);
    }
  }, [searchType]);


  const router = useRouter();

  const handleBookClick = (isbn13: string) => {
    router.push(`/book/details?isbn13=${isbn13}`);
  };

  const handleSearchClick = async () => {
    setError(null);
    setLoading(true);

    if (!searchValue.trim()) {
      setError('Please enter a search term');
      setLoading(false);
      return;
    }

    try {
      const baseUrl = 'http://localhost:4000';
      let endpoint = '';

      switch (searchType) {
        case 'title':
          endpoint = `${baseUrl}/library/title/${encodeURIComponent(searchValue.trim())}`;
          break;
        case 'author':
          endpoint = `${baseUrl}/library?authors=${encodeURIComponent(searchValue.trim())}`;
          break;
        case 'isbn':
          endpoint = `${baseUrl}/library/isbn13/${encodeURIComponent(searchValue.trim())}`;
          break;
        case 'year':
          endpoint = `${baseUrl}/library?publication_year=${encodeURIComponent(searchValue.trim())}`;
          break;
        case 'rating':
          endpoint = `${baseUrl}/library?rating_avg=${encodeURIComponent(searchValue.trim())}`;
          break;
      }

      // console.log('Fetching from:', endpoint);

      const response = await fetch(endpoint);
      const data = await response.json();
      // console.log('Response data:', data);

      if (response.status === 404) {
        setError(data.message || 'No books found');
        setBooks([]);
        return;
      }

      if (!response.ok) {
        throw new Error(data.message || `HTTP error! status: ${response.status}`);
      }

      // handle different response formats
      if (data.entry) {
        // single book response
        setBooks([data.entry]);
      } else if (data.entries) {
        // multiple books response
        const processedBooks = data.entries
          .map((entry: any) => {
            // check if entry is already a book object
            if (typeof entry === 'object') {
              return {
                ...entry,
                rating_avg: entry.rating_avg ? parseFloat(entry.rating_avg) : 0,
                rating_count: entry.rating_count ? parseInt(entry.rating_count) : 0
              };
            }
            const matches = entry.match(/{'ISBN: ' (\d+)} - 'Title: '\[(.*?)\]  ' author '\[(.*?)\] ' publication year: \[(\d+)\]/);
            if (matches) {
              return {
                isbn13: matches[1],
                title: matches[2],
                authors: matches[3],
                publication_year: parseInt(matches[4]),
                rating_avg: 0
              };
            }
            return null;
          })
          .filter(Boolean);

        setBooks(processedBooks);
      } else {
        setBooks([]);
        setError('No books found');
      }
    } catch (err) {
      // console.error('Search error:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch books');
      setBooks([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainCard title="Search Books">
      <Grid container spacing={2}>
        {/* search controls */}
        <Grid item xs={12}>
          <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
            <Select value={searchType} onChange={(e: SelectChangeEvent) => setSearchType(e.target.value)} sx={{ minWidth: 120 }}>
              <MenuItem value="title">Title</MenuItem>
              <MenuItem value="author">Author</MenuItem>
              <MenuItem value="isbn">ISBN</MenuItem>
              <MenuItem value="year">Year</MenuItem>
              <MenuItem value="rating">Rating</MenuItem>
            </Select>

            <TextField
              fullWidth
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder={`Search by ${searchType}...`}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleSearchClick();
                }
              }}
            />

            <Button
              variant="contained"
              onClick={handleSearchClick}
              startIcon={<SearchIcon />}
              disabled={loading}
            >
              {loading ? 'Searching...' : 'Search'}
            </Button>
          </Box>
        </Grid>

        {/* results */}
        <Grid item xs={12}>
          {books.length > 0 ? (
            <List>
              {books.map((book, index) => (
                <ListItem 
                  key={book.isbn13 || index}
                  onClick={() => handleBookClick(book.isbn13)}
                  sx={{ 
                    mb: 2, 
                    bgcolor: 'background.paper',
                    borderRadius: 1,
                    boxShadow: 1
                  }}
                >
                  <ListItemText
                    primary={
                      <Typography variant="h6" component="div">
                        {book.title}
                      </Typography>
                    }
                    secondary={
                      <Box sx={{ mt: 1 }}>
                        <Typography variant="body1" color="text.secondary">
                          By: {book.authors}
                        </Typography>
                        <Typography variant="body2">
                          ISBN: {book.isbn13}
                        </Typography>
                        <Typography variant="body2">
                          Published: {book.publication_year}
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
                          <Rating 
                            value={book.rating_avg || 0} 
                            precision={0.1} 
                            readOnly 
                            size="small"
                          />
                          {book.rating_avg !== undefined && book.rating_avg !== null && (
                            <Typography variant="body2" color="text.secondary">
                              ({book.rating_avg.toFixed(1)})
                              {book.rating_count ? ` - ${book.rating_count} ratings` : ''}
                            </Typography>
                          )}
                        </Box>
                      </Box>
                    }
                  />
                </ListItem>
              ))}
            </List>
          ) : (
            !loading && !error && (
              <Typography variant="body1" sx={{ textAlign: 'center' }}>
                No books found
              </Typography>
            )
          )}

          {loading && (
            <Box sx={{ display: 'flex', justifyContent: 'center', my: 2 }}>
              <CircularProgress />
            </Box>
          )}

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}
        </Grid>

        {/* debug info */}
        <Grid item xs={12}>
          <Box sx={{ 
            bgcolor: '#f5f5f5', 
            p: 2, 
            borderRadius: 1, 
            mb: 2,
            border: '1px solid #ccc'
          }}>
            <Typography variant="body2">
              Debug Info:<br />
              Search Type: {searchType}<br />
              Search Value: {searchValue}<br />
              Loading: {loading ? 'Yes' : 'No'}<br />
              Has Error: {error ? 'Yes' : 'No'}<br />
              Error Message: {error || 'None'}<br />
              Books Found: {books.length}
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </MainCard>
  );
}