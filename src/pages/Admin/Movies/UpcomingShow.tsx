import { MdAdd, MdEdit } from "react-icons/md";
import Button from "../../../components/buttons/Buttons";
import SectionHeader from "../../../components/Headers/AdminHeaders";
import AdminContainer from "../../Layout/AdminLayout/AdminContainer";
import { HiMiniViewfinderCircle } from "react-icons/hi2";
import { AiFillDelete } from "react-icons/ai";
import { useContext, useEffect, useState } from "react";
import ImageUpload from "../../../components/input/FileInput";
import FormModal from "../../../components/modals/FormModal";
import InputField from "../../../components/input/input";
import MultiSelectDropdown from "../../../components/dropdown/MultiSelect";
import SelectDropdown from "../../../components/dropdown/SelectDropdown";
import {
  AddUpcommingApi,
  GetGenresListApi,
  GetUpcomingMoviesListApi,
} from "../../../api/admin/upcomingMovieApi";
import { UserContext } from "../../../context/userContext";
import toast, { Toaster } from "react-hot-toast";
import { Option } from "../../../types/AdminTypes/Admin";
import {
  MovieRatingsType,
  ratingsOption,
  UpcomingGenresType,
} from "../../../types/movies";
import { useMutation, useQuery } from "@tanstack/react-query";
import CircularProgress from "@mui/material/CircularProgress";
import { queryClient } from "../../../utils/queryClient";
import { Pagination } from "@mui/material";

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

const UpcomingShow = () => {
  const [isShowModal, setIsShowModal] = useState(false);
  const [selectedGenre, setSelectedGenre] = useState<Option[]>([]); // split when passing as payload
  const [options, setOptions] = useState<Option[]>([]);
  const [uploadData, setUploadData] = useState({
    movie_name: "The batman",
    mtrcb_rating: "",
    duration: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const context = useContext(UserContext);
  const [imageUpload, setImageUpload] = useState<File | null>(null);
  const limit = 2;
  const [currentPage, setCurrentPage] = useState(1);

  const OnClickAddNewShow = () => setIsShowModal(!isShowModal);

  // Fetch Upcoming List
  const {
    error,
    data: upcomingMoviesList,
    isFetching,
  } = useQuery({
    queryKey: ["upcomingMovies", currentPage],
    queryFn: () =>
      GetUpcomingMoviesListApi({
        token: context.session?.acces_token ?? "",
        onTokenExpired: context.sessionExpired,
        page: currentPage,
        limit: limit,
      }),
  });

  // Fetch Movies Genres
  const { data: genreList, error: errorGenreList } =
    useQuery<UpcomingGenresType>({
      queryKey: ["options"],
      queryFn: () =>
        GetGenresListApi({
          token: context.session?.acces_token ?? "",
          onTokenExpired: context.sessionExpired,
          page: currentPage,
        }),
    });

  useEffect(() => {
    if (errorGenreList) setOptions([]);
    setOptions(genreList?.data as Option[]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [genreList]);

  // Add Upcoming Movies
  const { mutateAsync: addUpcomingMutation, isPending: isSubmitting } =
    useMutation({
      mutationFn: async (formData: FormData) => {
        await AddUpcommingApi({
          token: context.session?.acces_token ?? "",
          data: formData,
          onTokenExpired: context.sessionExpired,
        });
      },
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["upcomingMovies"],
        });

        setIsShowModal(false);
        setUploadData({
          movie_name: "",
          mtrcb_rating: "",
          duration: "",
        });
        setSelectedGenre([]);
        setErrorMessage("");
        toast.success("New upcoming movie added successfully");
      },
      onError: (err) => {
        toast.success(`${err}: Error adding new movie`);
      },
    });

  const HandleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { movie_name, mtrcb_rating, duration } = uploadData;

    if (!context.session) return;

    if (
      !imageUpload ||
      !selectedGenre ||
      !movie_name ||
      !mtrcb_rating ||
      !duration
    ) {
      setErrorMessage("All Fields are Required");
      return;
    }

    const splitGenre = selectedGenre.map((data) => data.name).join(", "); // split when passing as payload

    const formData = new FormData();
    formData.append("movie_name", movie_name);
    formData.append("image", imageUpload);
    formData.append("mtrcb_rating", mtrcb_rating);
    formData.append("genre", splitGenre);
    formData.append("duration", duration);

    await addUpcomingMutation(formData);
  };

  const HandleOnchangeSelect = (option: Option) => {
    setUploadData((prev) => ({ ...prev, mtrcb_rating: option.name }));
  };

  const HandleSelectGenre = (option: Option) => {
    setSelectedGenre((prev) => {
      // Check if the option is already selected
      if (prev.some((selected) => selected.id === option.id)) {
        // Remove the option if already selected
        return prev.filter((selected) => selected.id !== option.id);
      } else {
        // Add the option if not already selected
        return [...prev, option];
      }
    });
  };

  const HandleOnchange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUploadData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <AdminContainer>
      <SectionHeader
        children={"Admin / Movies"}
        currentPage={"Upcoming show"}
      />

      {/* Make this div grow to fill remaining space use flex-grow flex */}
      <div className="flex-grow flex flex-col">
        <div className="w-full h-full flex flex-col p-2.5 bg-white rounded-lg shadow border border-neutral-200 overflow-auto">
          <div className="flex items-center w-full">
            <Button
              onClick={OnClickAddNewShow}
              className="ml-auto flex items-center gap-2-"
            >
              <MdAdd size={18} /> Add New Show
            </Button>
          </div>

          <div className="relative overflow-x-auto sm:rounded-lg">
            {isFetching ? (
              <div className="flex justify-center items-center py-16">
                <CircularProgress />
              </div>
            ) : error ? (
              <div className="flex justify-center items-center py-16 text-red-500">
                Failed to load data. Please try again later.
              </div>
            ) : upcomingMoviesList?.data?.length === 0 ? (
              <div className="flex justify-center items-center py-16 text-gray-500">
                No upcoming movies
              </div>
            ) : (
              <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <caption className="p-5 text-lg font-semibold text-left rtl:text-right text-gray-900 bg-white dark:text-white dark:bg-gray-800">
                  Upcoming shows
                  <p className="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">
                    Lists of upcoming shows
                  </p>
                </caption>
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      Movie Name
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Genre
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Rating
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {upcomingMoviesList?.data.map((data) => (
                    <tr
                      key={data.id}
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                    >
                      <th
                        scope="row"
                        className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        <img
                          className="w-14 object-contain"
                          src={data.image}
                          alt={data.movie_name}
                        />
                        <div className="ps-3">
                          <div className="text-base font-semibold">
                            {data.movie_name}
                          </div>
                          <div className="font-normal text-gray-500">
                            Duration:{" "}
                            <small className="font-bold">
                              {data.duration}mins
                            </small>
                          </div>
                        </div>
                      </th>
                      <td className="px-6 py-4">{data.genre}</td>
                      <td className="px-6 py-4">
                        <RatingText rating={data.mtrcb_rating} />
                      </td>
                      <td className="px-6 py-4">
                        <button className="px-2 py-1 bg-blue-700 text-white rounded hover:bg-blue-800 mr-1 font-bold">
                          <MdEdit size={20} />
                        </button>
                        <button className="px-2 py-1 bg-green-700 text-white rounded hover:bg-green-800 mr-1 font-bold">
                          <HiMiniViewfinderCircle size={20} />
                        </button>
                        <button className="px-2 py-1 bg-red-700 text-white rounded hover:bg-red-800 mr-1 font-bold">
                          <AiFillDelete size={20} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

            <div className="flex items-center justify-center p-2">
              <Pagination
                count={upcomingMoviesList?.totalPages ?? 0}
                page={currentPage}
                onChange={(_e, page) => {
                  setCurrentPage(page);
                }}
                variant="outlined"
                shape="rounded"
              />
            </div>
          </div>
        </div>
      </div>

      {isShowModal && (
        <FormModal
          onSubmit={HandleOnSubmit}
          onClose={() => {
            if (isSubmitting) return;
            setIsShowModal(false);
            setImageUpload(null);
          }}
          title="Add new show"
          errorMessage={errorMessage}
          isLoading={isSubmitting}
        >
          <div className="flex flex-col w-full  border-danger">
            <ImageUpload
              name="image"
              id="image"
              setImageUpload={setImageUpload}
            />
            <InputField
              name="movie_name"
              id="movie_name"
              className="mt-5"
              label="Movie name"
              onChange={HandleOnchange}
            />
            <div className="flex flex-col md:flex-row items-center">
              <MultiSelectDropdown
                label="Genre"
                options={options}
                value={selectedGenre}
                onChange={HandleSelectGenre}
                className="w-full"
              />
              <SelectDropdown
                handleOnchange={HandleOnchangeSelect}
                label="Rating"
                options={ratingsOption}
                value={uploadData.mtrcb_rating}
                className="w-full"
              />
              <InputField
                name="duration"
                id="duration"
                className="w-full"
                label="Movie Duration"
                type="number"
                onChange={HandleOnchange}
              />
            </div>
          </div>
        </FormModal>
      )}
      <Toaster position="top-center" reverseOrder={false} />
    </AdminContainer>
  );
};

export default UpcomingShow;
