'use client';

import React, { useState, useEffect, KeyboardEvent } from 'react';

interface Book {
  isbn13: string;
  title: string;
  authors: string;
  publication_year: string;
  rating_avg: number;
  rating_count: number;
  description?: string;
}

export default function SearchBook() {
  const [searchType, setSearchType] = useState('title');
  const [searchValue, setSearchValue] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [books, setBooks] = useState<Book[]>([]);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);

  useEffect(() => {
    setSearchValue('');
    setBooks([]);
    setError(null);
  }, [searchType]);

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
          console.log('Title search endpoint:', endpoint);
          break;
        case 'author':
          endpoint = `${baseUrl}/library?authors=${encodeURIComponent(searchValue.trim())}`;
          break;
        case 'isbn':
          endpoint = `${baseUrl}/library/isbn13/${encodeURIComponent(searchValue.trim())}`;
          console.log('ISBN search endpoint:', endpoint);
          break;
        case 'year':
          endpoint = `${baseUrl}/library?publication_year=${encodeURIComponent(searchValue.trim())}`;
          break;
        case 'rating':
          endpoint = `${baseUrl}/library?rating_avg=${encodeURIComponent(searchValue.trim())}`;
          break;
      }

      const response = await fetch(endpoint);
      const data = await response.json();

      if (response.status === 404) {
        setError('No books found');
        setBooks([]);
        return;
      }

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      if (data.entry) {
        const book = data.entry;
        setBooks([
          {
            isbn13: book.isbn13?.toString() || '',
            title: book.title?.toString() || '',
            authors: book.authors?.toString() || '',
            publication_year: book.publication_year?.toString() || '',
            rating_avg: book.rating_avg ? parseFloat(book.rating_avg) : 0,
            rating_count: book.rating_count || 0,
            description: book.description || ''
          }
        ]);
      } else if (data.entries && Array.isArray(data.entries)) {
        const processedBooks = data.entries
          .map((entry: any) => {
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
                publication_year: matches[4],
                rating_avg: 0,
                rating_count: 0
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
      console.error('Search error:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch books');
      setBooks([]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearchClick();
    }
  };

  const handleBookClick = (isbn: string) => {
    const book = books.find((b) => b.isbn13 === isbn);
    if (book) {
      setSelectedBook(book);
    }
  };

  const handleBack = () => {
    setSelectedBook(null);
  };

  // Return a different component instead of making a new page when opening a book
  if (selectedBook) {
    // Detail View
    return (
      <div className="main-container">
        <div className="back-button" onClick={handleBack} title="Back to search">
          ←
        </div>
        <div className="book-cover-container">
          <div className="book-cover-placeholder"></div>
        </div>
        <div className="book-info-container">
          <div className="book-title-text">{selectedBook.title}</div>
          <div className="book-author-text">{selectedBook.authors}</div>
          <div className="book-date-text">{selectedBook.publication_year}</div>
          <div className="book-rating">
            Rating: {selectedBook.rating_avg ? selectedBook.rating_avg.toFixed(1) : 'N/A'}/5
            {selectedBook.rating_count ? ` - ${selectedBook.rating_count} ratings` : ''}
          </div>
          <div className="book-description">ISBN: {selectedBook.isbn13}</div>
          {error && <div style={{ color: 'red', marginTop: '10px' }}>{error}</div>}
        </div>
      </div>
    );
  }

  // Search & Results View
  return (
    <div className="main-container-flex">
      <div className="header">
        <span className="browse-text">browse</span>
      </div>
      <div className={`search-container ${books.length <= 5 ? 'centered' : ''}`}>
        <select className="filter-select" value={searchType} onChange={(e) => setSearchType(e.target.value)}>
          <option value="title">Title</option>
          <option value="author">Author</option>
          <option value="isbn">ISBN</option>
          <option value="year">Year</option>
          <option value="rating">Rating</option>
        </select>

        <input
          type="text"
          className="search-bar"
          placeholder={`Search by ${searchType}...`}
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <button className={`search-button ${loading ? 'loading' : ''}`} onClick={handleSearchClick} aria-label="Search" disabled={loading}>
          {loading ? 'Searching...' : 'Search'}
        </button>
      </div>

      {error && <div className="error-message">{error}</div>}

      <div className="books-container">
        {books.length > 0 ? (
          <div className="book-grid">
            {books.map((book) => (
              <div key={book.isbn13} className="book-placeholder" onClick={() => handleBookClick(book.isbn13)}>
                <div className="book-preview">
                  <div className="book-preview-title">{book.title}</div>
                  <div className="book-preview-author">{book.authors}</div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          !loading && !error && <div style={{ textAlign: 'center', marginTop: '20px' }}>No books found</div>
        )}
      </div>
    </div>
  );
}
