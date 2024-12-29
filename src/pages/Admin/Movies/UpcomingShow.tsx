import { MdAdd } from "react-icons/md";
import Button from "../../../components/buttons/Buttons";
import AdminContainer from "../../Layout/AdminLayout/AdminContainer";
import { useCallback, useContext, useEffect, useState } from "react";
import ImageUpload from "../../../components/input/FileInput";
import FormModal from "../../../components/modals/FormModal";
import InputField from "../../../components/input/input";
import MultiSelectDropdown from "../../../components/dropdown/MultiSelect";
import SelectDropdown from "../../../components/dropdown/SelectDropdown";
import {
  AddUpcommingApi,
  DeleteUpcomingMovieApi,
  EditUpcomingMovieApi,
  GetGenresListApi,
  GetUpcomingMoviesListApi,
  TransferNowShowingApi,
} from "../../../api/admin/upcomingMovieApi";
import { UserContext } from "../../../context/userContext";
import toast, { Toaster } from "react-hot-toast";
import { Option } from "../../../types/AdminTypes/Admin";
import { ratingsOption, UpcomingGenresType } from "../../../types/movies";
import { useMutation, useQuery } from "@tanstack/react-query";
import CircularProgress from "@mui/material/CircularProgress";
import { queryClient } from "../../../utils/queryClient";
import { Pagination } from "@mui/material";
import { IoIosSearch } from "react-icons/io";
import Swal from "sweetalert2";
import TableRow from "../../../components/Admin/TableRow";

type EditData = {
  id: string;
  movie_name: string;
  mtrcb_rating: string;
  duration: string;
  genre: string;
  image: string;
};

const UpcomingShow = () => {
  const [isShowModal, setIsShowModal] = useState(false);
  const [selectedGenre, setSelectedGenre] = useState<Option[]>([]); // split when passing as payload
  const [options, setOptions] = useState<Option[]>([]);
  const [uploadData, setUploadData] = useState({
    movie_name: "",
    mtrcb_rating: "",
    duration: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const context = useContext(UserContext);
  const [imageUpload, setImageUpload] = useState<File | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const [editData, setEditData] = useState<EditData>({
    id: "",
    movie_name: "",
    mtrcb_rating: "",
    duration: "",
    genre: "",
    image: "",
  });

  const [checkedData, setCheckedData] = useState<string[]>([]);

  const OnClickAddNewShow = () => {
    setIsEdit(false);
    setIsShowModal(!isShowModal);
  };

  const ResetForm = () => {
    setErrorMessage("");
    setIsShowModal(false);
    setImageUpload(null);
    setSelectedGenre([]);
    setUploadData({ movie_name: "", mtrcb_rating: "", duration: "" });
    setEditData({
      id: "",
      movie_name: "",
      mtrcb_rating: "",
      duration: "",
      genre: "",
      image: "",
    }); // Clear preview on close
  };

  // #region REACT QUERY AND MUTATIONS

  // Fetch Upcoming List
  const {
    error,
    data: upcomingMoviesList,
    isFetching,
  } = useQuery({
    queryKey: ["upcomingMovies", currentPage, search],
    queryFn: () =>
      GetUpcomingMoviesListApi({
        token: context.session?.acces_token ?? "",
        onTokenExpired: context.sessionExpired,
        page: currentPage,
        limit: 5,
        search: search,
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

  // Edit Upcoming Movie
  const { mutateAsync: editUpcomingMutation, isPending: isEditing } =
    useMutation({
      mutationFn: async (formData: FormData) => {
        await EditUpcomingMovieApi({
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
        setEditData({
          id: "",
          movie_name: "",
          mtrcb_rating: "",
          duration: "",
          genre: "",
          image: "",
        });
        setSelectedGenre([]);
        setErrorMessage("");
        toast.success("Successfully modified upcoming movie");
      },
      onError: (err) => {
        toast.success(`${err}: Error editing upcoming movie`);
      },
    });

  // Delete Upcoming Movie
  const { mutateAsync: deleteUpcomingMutation, isPending: isDeleting } =
    useMutation({
      mutationFn: async (id: string) => {
        await DeleteUpcomingMovieApi({
          token: context.session?.acces_token ?? "",
          onTokenExpired: context.sessionExpired,
          endPoint: id,
        });
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["upcomingMovies"] });
        toast.success("Movie deleted successfully");
      },
      onError: (err) => toast.error(`Error deleting movie: ${err}`),
    });

  // Add Now showing
  const { mutateAsync: transferNowShowingMutation, isPending: isTransfering } =
    useMutation({
      mutationFn: async (data: string[]) => {
        await TransferNowShowingApi({
          token: context.session?.acces_token ?? "",
          onTokenExpired: context.sessionExpired,
          data: {
            movieIds: data,
          },
        });
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["upcomingMovies"] });
        setCheckedData([]);
        toast.success("Movie successfully transfered to now showing");
      },
      onError: (err) => toast.error(`Error deleting movie: ${err}`),
    });
  //#endregion

  const isActionDisabled =
    isFetching || isSubmitting || isDeleting || isEditing || isTransfering;

  const HandleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = isEdit ? editData : uploadData;
    const { movie_name, mtrcb_rating, duration } = data;

    if (!context.session) return;

    if (!selectedGenre || !movie_name || !mtrcb_rating || !duration) {
      setErrorMessage("All Fields are Required");
      return;
    }

    const splitGenre = selectedGenre.map((data) => data.name).join(", "); // split when passing as payload

    const formData = new FormData();
    if (isEdit) {
      formData.append("id", editData.id);
    }
    formData.append("movie_name", movie_name);

    // Only append image if imageUpload is not null
    if (!isEdit && !imageUpload) {
      console.log("not edit");
      setErrorMessage("Movie Poster is required");
      return;
    }

    if (imageUpload) {
      formData.append("image", imageUpload);
    }

    formData.append("mtrcb_rating", mtrcb_rating);
    formData.append("genre", splitGenre);
    formData.append("duration", duration);

    if (isEdit) {
      await editUpcomingMutation(formData);
      return;
    }
    await addUpcomingMutation(formData);
  };

  const HandleOnchangeSelect = (option: Option) => {
    if (isEdit) {
      setEditData((prev) => ({ ...prev, mtrcb_rating: option.name }));
    }
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
    if (name === "search") {
      setSearch(value);
      setCurrentPage(1);
    }

    if (isEdit) {
      setEditData((prev) => ({ ...prev, [name]: value }));
    } else {
      setUploadData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const HandleDelete = useCallback(
    (id: string) => {
      Swal.fire({
        title: "Are you sure?",
        text: "This action cannot be undone",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Delete",
      }).then((result) => {
        if (result.isConfirmed) deleteUpcomingMutation(id);
      });
    },
    [deleteUpcomingMutation],
  );

  const HandleEdit = useCallback((editData: EditData) => {
    if (!editData) return;
    const populateSelectedGenre = editData.genre.split(", ").map((genre) => ({
      id: genre,
      name: genre,
    }));
    setIsShowModal(true);
    setIsEdit(true);
    setEditData(editData);
    setSelectedGenre(populateSelectedGenre);
    setImageUpload(null);
  }, []);

  const HandleCheckBox = (id: string) => {
    if (!id) return;
    setCheckedData((prev) =>
      prev.includes(id)
        ? prev.filter((checkedId) => checkedId !== id)
        : [...prev, id],
    );
  };

  const HandleUploadNowShowing = () => {
    if (!checkedData.length) return;
    Swal.fire({
      title: "Are you sure?",
      text: "Move this movie into now showing?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        transferNowShowingMutation(checkedData);
      }
    });
  };

  return (
    <AdminContainer
      className="overflow-auto"
      sectionHeaderChildren={"Admin / Movies"}
      sectionHeaderCurrentPage={"Upcoming show"}
    >
      <div className="flex h-full flex-col bg-white relative overflow-x-auto sm:rounded-lg border border-neutral-200 shadow">
        <div className="flex justify-end gap-1 px-3 py-4 items-center w-full">
          <Button
            disabled={isActionDisabled || !checkedData.length}
            variant="outline"
            onClick={HandleUploadNowShowing}
            className="flex items-center gap-2"
          >
            <MdAdd size={18} /> Transfer to Now showing
          </Button>
          <Button
            disabled={isActionDisabled}
            onClick={OnClickAddNewShow}
            className="flex items-center gap-2"
          >
            <MdAdd size={18} /> Add New Show
          </Button>
        </div>
        <InputField
          leftIcon={
            <IoIosSearch className="cursor-pointer hover:text-slate-700" />
          }
          className="w-80 ml-auto"
          placeholder="Search movie...."
          value={search}
          name="search"
          onChange={HandleOnchange}
          disabled={isDeleting || isSubmitting || isEditing}
        />
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
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <caption className="p-5 text-lg font-semibold text-left text-gray-900 bg-white dark:text-white dark:bg-gray-800">
              Upcoming shows
              <p className="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">
                Lists of upcoming shows
              </p>
            </caption>
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  {/* checkbox */}
                </th>
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
                <TableRow
                  key={data.id}
                  id={data.id}
                  movie_name={data.movie_name}
                  image={data.image}
                  mtrcb_rating={data.mtrcb_rating}
                  genre={data.genre}
                  duration={data.duration}
                  created_at={data.created_at}
                  isDeleting={isDeleting}
                  checkedData={checkedData}
                  HandleEdit={HandleEdit}
                  HandleDelete={HandleDelete}
                  HandleCheckBox={HandleCheckBox}
                />
              ))}
            </tbody>
          </table>
        )}

        <div className="flex items-center justify-end p-2 mt-auto">
          <Pagination
            disabled={isActionDisabled}
            count={upcomingMoviesList?.totalPages || 0}
            page={currentPage}
            onChange={(_e, page) => {
              setCurrentPage(page);
            }}
            variant="outlined"
            shape="rounded"
          />
        </div>
      </div>

      {isShowModal && (
        <FormModal
          onSubmit={HandleSubmit}
          onClose={ResetForm}
          title="Add new show"
          errorMessage={errorMessage}
          isLoading={isSubmitting || isEditing}
        >
          <div className="flex flex-col w-full">
            <ImageUpload
              name="image"
              id="image"
              setImageUpload={setImageUpload}
              propsImagePreview={isEdit ? editData.image : null}
              removePropsImagePreview={() =>
                setEditData((prev) => ({ ...prev, image: "" }))
              }
            />
            <InputField
              name="movie_name"
              id="movie_name"
              className="mt-5"
              label="Movie name"
              value={isEdit ? editData.movie_name : uploadData.movie_name}
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
                value={isEdit ? editData.mtrcb_rating : uploadData.mtrcb_rating}
                className="w-full"
              />
              <InputField
                name="duration"
                id="duration"
                className="w-full"
                label="Movie Duration"
                type="number"
                value={isEdit ? editData.duration : uploadData.duration}
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
