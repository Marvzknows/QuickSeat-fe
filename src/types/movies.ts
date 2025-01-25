import { Option } from "./AdminTypes/Admin";

export const ratingsOption: Option[] = [
  { id: "G", name: "G" },
  { id: "PG", name: "PG" },
  { id: "SPG", name: "SPG" },
];

export type MovieRatingsType = "PG" | "SPG" | "G";

export type UpcomingMoviesType = {
  status: boolean;
  data: MoviesType[];
  currentPage: number;
  totalPages: number | null;
  totalCount: number;
};

export type MoviesType = {
  id: string;
  movie_name: string;
  image: string;
  mtrcb_rating: MovieRatingsType;
  genre: string;
  duration: string;
  created_at: string;
  ticket_price: number;
};

export type UpcomingGenresType = {
  status: boolean;
  data: Option[];
};
export type GenreType = {
  id: string;
  name: string;
};
