import { Response200 } from '@/interfaces/api';
import {
  AdminRegisterData,
  LoginData,
  StudentRegisterData,
} from '@/interfaces/Auth';
import convertLocalImageUrlToBase64Url from '@/utils/convertLocalImageUrlToBase64Url';
import axios from 'axios';

export type SearchResultsData = {
  id: string;
  name: string;
};

export type TokenData = {
  token: string;
};

export const getSearchResults = async (
  searchString: string,
): Promise<SearchResultsData[]> => {
  try {
    const response = await axios.get(
      `${process.env.EXPO_PUBLIC_BACKEND_URL}/organization?name=${encodeURIComponent(searchString)}`,
    );

    const res: Response200<SearchResultsData[]> = response.data;
    return res.data;
  } catch (err) {
    console.log(err.message);
    return [];
  }
};

export const LoginApi = async (data: LoginData): Promise<TokenData> => {
  try {
    const response = await axios.post(
      `${process.env.EXPO_PUBLIC_BACKEND_URL}/auth/login`,
      data,
    );

    if (response.status === 200) {
      const res: Response200<TokenData> = response.data;
      return res.data;
    }
  } catch (error) {
    if ([400, 401, 404, 500].includes(error.response.status)) {
      throw new Error(JSON.stringify(error.response.data));
    } else throw new Error('Unknown Error');
  }
};

export const studentRegister = async (
  data: StudentRegisterData,
): Promise<TokenData> => {
  try {
    const formData = new FormData();
    for (const key in data) {
      if (key === 'profileImg' && data[key])
        formData.append(key, await convertLocalImageUrlToBase64Url(data[key]));
        // console.log(data[key]);
      else formData.append(key, data[key]);
    }
    const response = await axios.post(
      `${process.env.EXPO_PUBLIC_BACKEND_URL}/auth/register/peoples`,
      data,
    );

    const res: Response200<TokenData> = response.data;
    return res.data;
  } catch (error) {
    if (error.response.status === 400 || error.response.status === 500) {
      throw new Error(JSON.stringify(error.response.data));
    } else throw new Error('Unknown Error');
  }
};

export const adminRegister = async (
  data: AdminRegisterData,
): Promise<TokenData> => {
  try {
    const formData = new FormData();
    for (const key in data) {
      if (['organizationLogo', 'profileImg'].includes(key) && data[key])
        formData.append(key, await convertLocalImageUrlToBase64Url(data[key]));
      else if ((key === 'startTime' || key === 'endTime') && data[key])
        formData.append(key, data[key].toISOString());
      else formData.append(key, data[key]);
    }
    const response = await axios.post(
      `${process.env.EXPO_PUBLIC_BACKEND_URL}/auth/register/admin`,
      data,
    );

    const res: Response200<TokenData> = response.data;
    return res.data;
  } catch (error) {
    if (error.response.status === 400 || error.response.status === 500) {
      throw new Error(JSON.stringify(error.response.data));
    } else throw new Error('Unknown Error');
  }
};
