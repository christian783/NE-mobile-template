import axiosInstance from './axiosInstance';

export const fetchWord = async (word) => axiosInstance.get(`/${encodeURIComponent(word)}`);

export default fetchWord;
