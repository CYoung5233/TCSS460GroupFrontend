// ==============================|| BOOK TYPE ||============================== //

export type BookInfo = {
  isbn13: string;
  title: string;
  authors: string;
  publication_year: number;
  rating_avg?: number;
  rating_count?: number;
  rating_1_star?: number;
  rating_2_star?: number;
  rating_3_star?: number;
  rating_4_star?: number;
  rating_5_star?: number;
  image_url?: string;
  image_small_url?: string;
};

export function mapApiResponseToBookInfo(apiResponse: any): BookInfo | null {
  if (!apiResponse || !apiResponse.entry) {
    console.error('Invalid API response:', apiResponse);
    return null; // Return null if the response doesn't have the expected structure
  }
  const { entry } = apiResponse;
  // Extract only the fields defined in the BookInfo interface
  return {
    isbn13: entry.isbn13,
    title: entry.title,
    authors: entry.authors,
    publication_year: entry.publication_year,
    rating_avg: entry.rating_avg,
    rating_count: entry.rating_count,
    rating_1_star: entry.rating_1_star,
    rating_2_star: entry.rating_2_star,
    rating_3_star: entry.rating_3_star,
    rating_4_star: entry.rating_4_star,
    rating_5_star: entry.rating_5_star,
    image_url: entry.image_url || 'https://dummyimage.com/400x600/556b2f/fff&text=NoImagesFromBackend',
    image_small_url: entry.image_small_url || 'https://dummyimage.com/400x600/556b2f/fff&text=NoImagesFromBackend'
  };
}
