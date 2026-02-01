import axios from "axios";

const api = axios.create({
  baseURL: "https://api.github.com",
  headers: {
    Authorization: `token ${import.meta.env.VITE_APP_GITHUB_API_KEY}`,
  },
});

export const fetchUserData = async (username) => {
  const response = await api.get(`/users/${username}`);
  return response.data;
};

export const searchUsers = async (query, location, repos, page = 1) => {
    let q = `${query}`;
    if (location) q += ` location:${location}`;
    if (repos) q += ` repos:>=${repos}`;
  
    const response = await api.get(
      `/search/users?q=${q}&page=${page}&per_page=10`
    );
  
    return response.data;
  };
  