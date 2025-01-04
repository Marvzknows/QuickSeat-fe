import { useMutation, useQuery } from "@tanstack/react-query";
import NowShowingMovieCard from "../../../components/Admin/NowShowingCard";
import AdminContainer from "../../Layout/AdminLayout/AdminContainer";
import { GetNowShowingMoviesListApi } from "../../../api/admin/AdminDashboardApi";
import { useContext } from "react";
import { UserContext } from "../../../context/userContext";
import { CircularProgress } from "@mui/material";
import { DeleteNowShowingApi } from "../../../api/admin/NowShowingApi";
import { queryClient } from "../../../utils/queryClient";
import Swal from "sweetalert2";

const NowShowing = () => {
  const context = useContext(UserContext);

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
                  imageUrl={data.image}
                  onEdit={() => {
                    throw new Error("Function not implemented.");
                  }}
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
    </AdminContainer>
  );
};

export default NowShowing;
