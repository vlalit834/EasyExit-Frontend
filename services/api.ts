import { Response200 } from '@/interfaces/api';
import axios from 'axios';

export type SearchResultsData = {
  id: string;
  name: string;
};

export const getSearchResults = async (searchString: string): Promise<SearchResultsData[]> => {
  const response = await axios.get(
    `${process.env.EXPO_PUBLIC_BACKEND_URL}/organization?name=${encodeURIComponent(searchString)}`,
  );
  const res: Response200<SearchResultsData[]> = response.data;

  return res.data;
};
