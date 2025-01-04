import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { MovieRatingsType } from "../../types/movies";

interface MovieCardProps {
  title: string;
  price: number;
  ticketsSold: number;
  rating: string;
  duration: string;
  imageUrl: string;
  onEdit: () => void;
  onDelete: () => void;
}

const CardBadge = ({ rating }: { rating: MovieRatingsType }) => {
  const variant = {
    SPG: "bg-red-600",
    PG: "bg-blue-600",
    G: "bg-green-600",
  };

  return (
    <div
      className={`absolute top-2 left-2 ${variant[rating]} text-xs px-2 py-1 rounded`}
    >
      {rating} ★
    </div>
  );
};

const NowShowingMovieCard: React.FC<MovieCardProps> = ({
  title,
  price,
  ticketsSold,
  rating,
  duration,
  imageUrl,
  onEdit,
  onDelete,
}) => {
  return (
    <figure className="bg-[#eaeded] border border-slate-200 text-white rounded-lg shadow-lg overflow-hidden w-full md:w-[320px] lg:w-[280px]">
      <div className="relative w-[95%] h-96 mx-auto mt-2 rounded-md overflow-hidden">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover"
        />
        <CardBadge rating={rating as MovieRatingsType} />
      </div>
      <div className="p-5">
        <h3 className="text-xl font-bold mb-2 text-primary">{title}</h3>
        <p className="text-gray-800">Duration: {duration}</p>
        <p className="text-gray-800">Price: ${price}</p>
        <p className="text-gray-800">Tickets Sold: {ticketsSold}</p>
        <div className="flex justify-between mt-4">
          <button
            onClick={onEdit}
            className="flex items-center text-blue-400 hover:text-blue-300"
          >
            <FaEdit className="mr-1" /> Edit
          </button>
          <button
            onClick={onDelete}
            className="flex items-center text-red-400 hover:text-red-300"
          >
            <FaTrash className="mr-1" /> Delete
          </button>
        </div>
      </div>
    </figure>
  );
};

export default NowShowingMovieCard;
