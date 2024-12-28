import { MovieRatingsType, MoviesType } from "../../types/movies";

type DbMovieListProps = MoviesType;

const RatingText = ({ rating }: { rating: MovieRatingsType }) => {
  const color = {
    G: "text-green-500",
    PG: "text-blue-500",
    SPG: "text-danger",
  };
  return <span className={`font-bold ${color[rating]}`}>{rating}</span>;
};

const DbMovieList = (props: DbMovieListProps) => {
  const { movie_name, image, mtrcb_rating, duration } = props;
  return (
    <div className="border-b-2 flex flex-row gap-2 text-sm p-2">
      <img width={50} src={image} />
      <div className="flex flex-col items-start justify-around px-2">
        <p className="font-bold text-md text-slate-800">{movie_name}</p>
        <p className="text-slate-500">
          Rating:
          {<RatingText rating={mtrcb_rating} />}
        </p>
        <p className="text-slate-500">
          Duration:
          <span className="text-slate-800 font-bold px-1">{duration} mins</span>
        </p>
      </div>
      <div className="ml-auto my-auto pr-4">
        <p className="text-slate-500">
          Ticket Sold:
          <span className="text-slate-800 font-bold px-1">₱1,400.00</span>
        </p>
      </div>
    </div>
  );
};

export default DbMovieList;
