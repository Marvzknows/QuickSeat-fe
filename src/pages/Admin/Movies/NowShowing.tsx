import { useMutation, useQuery } from "@tanstack/react-query";
import NowShowingMovieCard from "../../../components/Admin/NowShowingCard";
import AdminContainer from "../../Layout/AdminLayout/AdminContainer";
import { GetNowShowingMoviesListApi } from "../../../api/admin/AdminDashboardApi";
import { useContext, useState } from "react";
import { UserContext } from "../../../context/userContext";
import { CircularProgress } from "@mui/material";
import {
  DeleteNowShowingApi,
  EditNowShowingApi,
} from "../../../api/admin/NowShowingApi";
import { queryClient } from "../../../utils/queryClient";
import Swal from "sweetalert2";
import FormModal from "../../../components/modals/FormModal";
import ImageUpload from "../../../components/input/FileInput";
import InputField from "../../../components/input/input";
import SelectDropdown from "../../../components/dropdown/SelectDropdown";
import MultiSelect from "../../../components/dropdown/MultiSelect";
import { Option } from "../../../types/AdminTypes/Admin";
import { ratingsOption, UpcomingGenresType } from "../../../types/movies";
import { GetGenresListApi } from "../../../api/admin/upcomingMovieApi";
import toast, { Toaster } from "react-hot-toast";

export type EditData = {
  id: string;
  title: string;
  price: number;
  rating: string;
  duration: string;
  imageUrl: string;
  genre: string;
};

const NowShowing = () => {
  const context = useContext(UserContext);
  const [selectedGenre, setSelectedGenre] = useState<Option[]>([]); // split when passing as payload
  const [showModal, setShowModal] = useState(false);
  const [imageUpload, setImageUpload] = useState<File | null>(null);
  const [editData, setEditData] = useState<EditData>({
    id: "",
    title: "",
    price: 0,
    rating: "",
    duration: "",
    imageUrl: "",
    genre: "",
  });

  //#region tanstack query
  const {
    error: errorNowShowingMovieList,
    data: NowShowingMoviesList,
    isFetching: isFetchingNowShowingMovieList,
  } = useQuery({
    queryKey: ["nowShowingMovies"],
    queryFn: () =>
      GetNowShowingMoviesListApi({
        token: context.session?.acces_token ?? "",
        onTokenExpired: context.sessionExpired,
        page: 1,
        search: "Mes",
      }),
  });

  // Delete Now showing
  const { mutateAsync: deleteNowShowing, isPending: isDeleting } = useMutation({
    mutationFn: async (delete_id: string) => {
      await DeleteNowShowingApi({
        token: context.session?.acces_token ?? "",
        onTokenExpired: context.sessionExpired,
        endPoint: delete_id,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["nowShowingMovies"],
      });
    },
  });

  // Fetch Movie Genres
  const { data: genreList } = useQuery<UpcomingGenresType>({
    queryKey: ["options"],
    queryFn: () =>
      GetGenresListApi({
        token: context.session?.acces_token ?? "",
        onTokenExpired: context.sessionExpired,
      }),
  });

  // Edit Now Showing Movie
  const { mutateAsync: editNowShowing, isPending: isEditing } = useMutation({
    mutationFn: async (formData: FormData) => {
      await EditNowShowingApi({
        token: context.session?.acces_token ?? "",
        data: formData,
        onTokenExpired: context.sessionExpired,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["nowShowingMovies"],
      });

      setShowModal(false);
      setEditData({
        id: "",
        title: "",
        price: 0,
        rating: "",
        duration: "",
        imageUrl: "",
        genre: "",
      });
      setSelectedGenre([]);
      // setErrorMessage("");
      toast.success("Successfully modified upcoming movie");
    },
    onError: (err) => {
      toast.success(`${err}: Error editing upcoming movie`);
    },
  });
  //#endregion

  const onDelete = async (id: string) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Delete",
    });

    if (result.isConfirmed) {
      await deleteNowShowing(id);
    }
  };

  const HandleEdit = (editData: EditData) => {
    if (!editData) return;
    const populateSelectedGenre = editData.genre.split(", ").map((genre) => ({
      id: genre,
      name: genre,
    }));
    setShowModal(true);
    setEditData(editData);
    setSelectedGenre(populateSelectedGenre);
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
    setEditData((prev) => ({ ...prev, [name]: value }));
  };

  const HandleOnchangeSelect = (option: Option) => {
    setEditData((prev) => ({ ...prev, rating: option.name }));
  };

  const HandleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { id, title, price, rating, duration } = editData;
    const splitGenre = selectedGenre.map((data) => data.name).join(", "); // split when passing as payload

    console.table(editData);
    console.log(selectedGenre);

    const formData = new FormData();

    if (imageUpload) {
      formData.append("image", imageUpload);
    }

    formData.append("id", id);
    formData.append("movie_name", title);
    formData.append("mtrcb_rating", rating);
    formData.append("genre", splitGenre);
    formData.append("duration", duration);
    formData.append("price", price.toString());

    await editNowShowing(formData);
  };

  return (
    <AdminContainer
      sectionHeaderChildren={"Admin / Movies"}
      sectionHeaderCurrentPage={"Now Showing"}
    >
      <div className="flex h-full flex-col bg-white relative overflow-x-auto sm:rounded-lg border border-neutral-200 shadow">
        <div className="flex justify-center p-2.5">
          <div className="flex flex-wrap gap-2 justify-start max-w-[1150px] w-full">
            {errorNowShowingMovieList ? (
              <div className="absolute top-0 left-0 h-full flex items-center justify-center w-full text-red-500">
                Error on displaying List, Please try again later
              </div>
            ) : isFetchingNowShowingMovieList || isDeleting ? (
              <div className="absolute top-0 left-0 h-full flex items-center justify-center w-full">
                <CircularProgress />
              </div>
            ) : NowShowingMoviesList?.data.length ? (
              NowShowingMoviesList.data.map((data) => (
                <NowShowingMovieCard
                  key={data.id}
                  id={data.id}
                  title={data.movie_name}
                  price={data.ticket_price}
                  ticketsSold={4124}
                  rating={data.mtrcb_rating}
                  duration={data.duration}
                  genre={data.genre}
                  imageUrl={data.image}
                  onEdit={HandleEdit}
                  onDelete={onDelete}
                />
              ))
            ) : (
              <div className="absolute top-0 left-0 h-full flex items-center justify-center w-full text-2xl text-gray-400">
                No Movies Found
              </div>
            )}
          </div>
        </div>
      </div>

      {showModal && (
        <FormModal
          onClose={() => setShowModal(false)}
          title={"Edit Now Showing Movie"}
          onSubmit={HandleSubmit}
          isLoading={isEditing}
          errorMessage={""}
        >
          <div className="flex flex-col w-full">
            <ImageUpload
              name="image"
              id="image"
              setImageUpload={setImageUpload}
              propsImagePreview={editData.imageUrl ?? null}
              removePropsImagePreview={() =>
                setEditData((prev) => ({ ...prev, imageUrl: "" }))
              }
            />
            <InputField
              name="title"
              id="title"
              className="mt-5"
              label="Movie name"
              value={editData.title}
              onChange={HandleOnchange}
            />
            <div className="flex flex-col md:flex-row items-center">
              <MultiSelect
                label="Genre"
                options={(genreList?.data as Option[]) || []}
                value={selectedGenre}
                onChange={HandleSelectGenre}
                className="w-full"
              />
              <SelectDropdown
                handleOnchange={HandleOnchangeSelect}
                label="Rating"
                options={ratingsOption}
                value={editData.rating}
                className="w-full"
              />
            </div>
            <div className="flex flex-col md:flex-row items-center">
              <InputField
                name="duration"
                id="duration"
                className="w-full"
                label="Movie Duration"
                type="number"
                value={editData.duration}
                onChange={HandleOnchange}
              />
              <InputField
                name="price"
                id="price"
                className="w-full"
                label="Tciket Price"
                type="number"
                value={editData.price}
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

export default NowShowing;
