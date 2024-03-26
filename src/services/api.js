import axios from "axios";

const TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5MGFmZjlmYTRhZjU0MjU3ODgzMWI0OTEzNTg5MTBjZSIsInN1YiI6IjY1YmJjZjMyMmI4YTQzMDE3YjFjMTJkMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.2Yq0l3ppdXo7hX9dYOPLg14buqsftmnQJ0nb_Exs_oI";

export const requestMovies = async () => {
  const url = "https://api.themoviedb.org/3/trending/movie/day?language=en-US";

  const options = {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      accept: "application/json",
    },
  };
  const { data } = await axios.get(url, options);
  return data;
};

export const requestProductById = async (id) => {
  const url = `https://api.themoviedb.org/3/movie/${id}?language=en-US`;

  const options = {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      accept: "application/json",
    },
  };
  const { data } = await axios.get(url, options);
  return data;
};
