import axios from "axios";

const API_URL = "https://api.tvmaze.com";

export const searchShows = async (query) => {
  try {
    const response = await axios.get(`${API_URL}/search/shows?q=${query}`);
    return response.data.map((result) => result.show);
  } catch (error) {
    console.error("Error searching for shows:", error);
    return [];
  }
};

export const getShows = async () => {
  try {
    const response = await axios.get(`${API_URL}/shows?page=0`);
    return response.data;
  } catch (error) {
    console.error("Error fetching shows:", error);
    return [];
  }
};

export const getShowById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/shows/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching show by ID:", error);
    throw error;
  }
};
