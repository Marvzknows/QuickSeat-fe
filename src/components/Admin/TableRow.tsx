import { MdEdit } from "react-icons/md";
import { MovieRatingsType, MoviesType } from "../../types/movies";
import { AiFillDelete } from "react-icons/ai";
import { ParseToPhp } from "../../utils/ParseToPhp";

const RatingText = ({ rating }: { rating: MovieRatingsType }) => {
  const color = {
    G: "text-green-500",
    PG: "text-blue-500",
    SPG: "text-danger",
  };
  return (
    <div className={`flex items-center font-bold ${color[rating]}`}>
      {rating}
    </div>
  );
};

type TableRowProps = MoviesType & {
  HandleEdit: (data: MoviesType) => void;
  HandleDelete: (id: string) => void;
  isDeleting: boolean;
  HandleCheckBox: (id: string) => void;
  checkedData: string[];
};

const TableRow = (props: TableRowProps) => {
  return (
    <tr
      key={props.id}
      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
    >
      <td className="text-center">
        <input
          onChange={() => props.HandleCheckBox(props.id)}
          checked={props.checkedData.includes(props.id)}
          type="checkbox"
          className="cursor-pointer h-4 w-4 text-blue-600"
        />
      </td>
      <td
        scope="row"
        className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white"
      >
        <img
          className="w-14 object-contain"
          src={props.image}
          alt={props.movie_name}
        />
        <div className="ps-3">
          <div className="text-base font-semibold">{props.movie_name}</div>
          <div className="font-normal text-gray-500">
            Duration: <small className="font-bold">{props.duration}mins</small>
          </div>
        </div>
      </td>
      <td className="px-6 py-4">{props.genre}</td>
      <td className="px-6 py-4">
        <RatingText rating={props.mtrcb_rating} />
      </td>
      <td className="px-6 py-4 font-semibold">
        {ParseToPhp(props.ticket_price)}
      </td>
      <td className="px-6 py-4">
        <button
          onClick={() => props.HandleEdit(props)}
          disabled={props.isDeleting}
          className="px-2 py-1 bg-blue-700 text-white rounded hover:bg-blue-800 mr-1 font-bold disabled:bg-blue-300"
        >
          <MdEdit size={20} />
        </button>
        <button
          disabled={props.isDeleting}
          onClick={() => props.HandleDelete(props.id)}
          className="px-2 py-1 bg-red-700 text-white rounded hover:bg-red-800 mr-1 font-bold disabled:bg-red-300"
        >
          <AiFillDelete size={20} />
        </button>
      </td>
    </tr>
  );
};

// export default memo(TableRow);
export default TableRow;
