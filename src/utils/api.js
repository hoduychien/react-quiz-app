import axios from "axios";

const BASE_URL = "https://opentdb.com";

export const fetchDataFromAPI = async (url, params) => {
  try {
    const { data } = await axios.get(BASE_URL + url, {
      params,
    });
    return data;
  } catch (error) {
    return error;
  }
};
