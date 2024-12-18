import { Option } from "./AdminTypes/Admin";

export const ratingsOption: Option[] = [
  { id: "G", name: "G" },
  { id: "PG", name: "PG" },
  { id: "SPG", name: "SPG" },
];

export type UpcomingMoviesType = {
  status: boolean;
  data: MoviesType[];
};

export type MoviesType = {
  id: string;
  movie_name: string;
  image: string;
  mtrcb_rating: string;
  genre: string;
  duration: string;
  created_at: string;
};

export type UpcomingGenresType = {
  status: boolean;
  data: Option[];
};
export type GenreType = {
  id: string;
  name: string;
};
