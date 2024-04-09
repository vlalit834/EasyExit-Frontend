import { Response200 } from '@/interfaces/api';
import { loginData } from '@/interfaces/Auth';
import axios from 'axios';

export type SearchResultsData = {
  id: string;
  name: string;
};

export type LoginResultsData = {
  token: string;
};

export const getSearchResults = async (
  searchString: string,
): Promise<SearchResultsData[]> => {
  try {
    const response = await axios.get(
      `${process.env.EXPO_PUBLIC_BACKEND_URL}/organization?name=${encodeURIComponent(searchString)}`,
    );
    console.log(response);

    const res: Response200<SearchResultsData[]> = response.data;
    console.log(res);
    return res.data;
  } catch (err) {
    console.log(err.message);
    return [];
  }
};

export const LoginApi = async (data: loginData): Promise<LoginResultsData> => {
  try {
    const response = await axios.post(
      `${process.env.EXPO_PUBLIC_BACKEND_URL}/auth/login`,
      data,
      {
        headers: { 'Content-Type': 'application/json' },
      },
    );

    if (response.status === 200) {
      const res: Response200<LoginResultsData> = response.data;
      return res.data;
    }
  } catch (error) {
    if (
      error.response.status == 400 ||
      error.response.status == 401 ||
      error.response.status == 500 ||
      error.response.status == 404
    ) {
      throw new Error(JSON.stringify(error.response.data));
    } else throw new Error('sdfdsfs');
  }
};
