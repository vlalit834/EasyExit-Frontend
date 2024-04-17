import { Response200, Response204 } from '@/interfaces/api';
import { AdminRegisterData, LoginData, StudentRegisterData } from '@/interfaces/Auth';
import { TokenStatus } from '@/interfaces/TokenStatus';
import convertLocalImageUrlToBase64Url from '@/utils/convertLocalImageUrlToBase64Url';
import axios from 'axios';
import { getItemAsync } from 'expo-secure-store';

import { generateOutPassData } from '@/interfaces/User';

export type SearchResultsData = {
  id: string;
  name: string;
};

export type getCheckedTokensData = {
  token: string;
  heading: string;
  status: TokenStatus;
  exitTime?: Date | null;
  returnedTime?: Date | null;
};

export type getTokenData = {
  token: string;
  reason?: string;
  heading: string;
  startTime: Date;
  endTime: Date;
  status: TokenStatus;
  acceptedBy?: string;
  phoneNumber?: number;
};

export type OutpassResultsData = {
  token: string;
  reason?: string;
  email?: string;
  heading: string;
  startTime: Date;
  endTime: Date;
  status: TokenStatus;
  acceptedBy: string;
  phoneNumber: number;
};

export type TokenData = {
  token: string;
};

export const getSearchResults = async (searchString: string): Promise<SearchResultsData[]> => {
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
    const response = await axios.post(`${process.env.EXPO_PUBLIC_BACKEND_URL}/auth/login`, data);

    if (response.status === 200) {
      const res: Response200<TokenData> = response.data;
      return res.data;
    }
  } catch (error) {
    if ([400, 401, 404, 500].includes(error.response?.status)) {
      throw new Error(JSON.stringify(error.response?.data));
    } else throw new Error('Unknown Error');
  }
};

export const studentRegister = async (data: StudentRegisterData): Promise<TokenData> => {
  try {
    const formData = new FormData();
    for (const key in data) {
      if (key === 'profileImg' && data[key]) {
        formData.append(key, await convertLocalImageUrlToBase64Url(data[key]));
      } else formData.append(key, data[key]);
    }

    const response = await axios.post(`${process.env.EXPO_PUBLIC_BACKEND_URL}/auth/register/peoples`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    const res: Response200<TokenData> = response.data;
    return res.data;
  } catch (error) {
    if (error.response?.status === 400 || error.response?.status === 500) {
      throw new Error(JSON.stringify(error.response?.data));
    } else throw new Error('Unknown Error');
  }
};

export const adminRegister = async (data: AdminRegisterData): Promise<TokenData> => {
  try {
    const formData = new FormData();
    for (const key in data) {
      if (['organizationLogo', 'profileImg'].includes(key) && data[key])
        formData.append(key, await convertLocalImageUrlToBase64Url(data[key]));
      else if ((key === 'startTime' || key === 'endTime') && data[key]) formData.append(key, data[key].toISOString());
      else formData.append(key, data[key]);
    }
    const response = await axios.post(`${process.env.EXPO_PUBLIC_BACKEND_URL}/auth/register/admin`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    const res: Response200<TokenData> = response.data;
    return res.data;
  } catch (error) {
    if (error.response?.status === 400 || error.response?.status === 500) {
      throw new Error(JSON.stringify(error.response?.data));
    } else throw new Error('Unknown Error');
  }
};

export const approvedStudentOutpass = async (): Promise<OutpassResultsData[]> => {
  try {
    const jwtToken = await getItemAsync('token');
    const response = await axios.get(`${process.env.EXPO_PUBLIC_BACKEND_URL}/user/approvedOutpass`, {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    });
    const res: Response200<OutpassResultsData[]> = response.data;
    return res.data.map(data => {
      data.startTime = new Date(data.startTime);
      data.endTime = new Date(data.endTime);
      return data;
    });
  } catch (error) {
    if (error.response?.status === 500) {
      throw new Error(JSON.stringify(error.response?.data));
    } else throw new Error('Unknown Error');
  }
};

export const rejectedStudentOutpass = async (): Promise<OutpassResultsData[]> => {
  try {
    const jwtToken = await getItemAsync('token');
    const response = await axios.get(`${process.env.EXPO_PUBLIC_BACKEND_URL}/user/rejectedOutpass`, {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    });
    const res: Response200<OutpassResultsData[]> = response.data;
    return res.data.map(data => {
      data.startTime = new Date(data.startTime);
      data.endTime = new Date(data.endTime);
      return data;
    });
  } catch (error) {
    if (error.response?.status === 500) {
      throw new Error(JSON.stringify(error.response?.data));
    } else throw new Error('Unknown Error');
  }
};

export const getToken = async (tokenId: string): Promise<getTokenData> => {
  try {
    const jwtToken = await getItemAsync('token');
    const response = await axios.get(
      `${process.env.EXPO_PUBLIC_BACKEND_URL}/user/getToken?tokenId=${encodeURIComponent(tokenId)}`,
      {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      },
    );

    const res: Response200<getTokenData> = response.data;
    res.data.startTime = new Date(res.data.startTime);
    res.data.endTime = new Date(res.data.endTime);
    return res.data;
  } catch (error) {
    if (error.response?.status === 401 || error.response?.status === 500) {
      throw new Error(JSON.stringify(error.response?.data));
    } else throw new Error('Unknown Error');
  }
};

export const checkToken = async (tokenId: string): Promise<string> => {
  try {
    const jwtToken = await getItemAsync('token');
    const response = await axios.patch(
      `${process.env.EXPO_PUBLIC_BACKEND_URL}/checker/checkToken`,
      { tokenId },
      {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      },
    );

    const res: Response204 = response.data;
    return res.message;
  } catch (error) {
    if ([400, 404, 500].includes(error.response?.status)) {
      throw new Error(JSON.stringify(error.response?.data));
    } else throw new Error('Unknown Error');
  }
};

export const generateOutPass = async (data: generateOutPassData): Promise<TokenData> => {
  try {
    const jwtToken = await getItemAsync('token');
    const response = await axios.post(`${process.env.EXPO_PUBLIC_BACKEND_URL}/user/requestToken`, data, {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    });

    if (response.status === 201) {
      const res: Response200<TokenData> = response.data;
      return res.data;
    }
  } catch (error) {
    if ([401, 500].includes(error.response.status)) {
      throw new Error(JSON.stringify(error.response.data));
    } else throw new Error('Unknown Error');
  }
};

export const getCheckedTokens = async (search?: string | null): Promise<getCheckedTokensData[]> => {
  try {
    const jwtToken = await getItemAsync('token');
    const response = await axios.get(
      `${process.env.EXPO_PUBLIC_BACKEND_URL}/checker/checkedTokens${!search ? '' : `?search=${encodeURIComponent(search)}`}`,
      {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      },
    );
    const res: Response200<getCheckedTokensData[]> = response.data;

    return res.data.map(data => {
      if (data.exitTime) data.exitTime = new Date(data.exitTime);
      if (data.returnedTime) data.returnedTime = new Date(data.returnedTime);
      return data;
    });
  } catch (error) {
    if (error.response?.status === 401 || error.response?.status === 500) {
      throw new Error(JSON.stringify(error.response?.data));
    } else throw new Error('Unknown Error');
  }
};
