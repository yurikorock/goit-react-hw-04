import axios from "axios";
const ACCESS_KEY = "wI1w2RVgUvjuJb0J1gHe4ygdTOtGE6Jz3bmKWX5CLQc";
axios.defaults.baseURL = "https://api.unsplash.com";

export const fetchImagesByQuery = async (query, page = 1) => {
  const response = await axios.get("/search/photos", {
    params: {
      query,
      page,
      client_id: ACCESS_KEY,
      per_page: 12,
    },
  });
  return response.data.results;
};
