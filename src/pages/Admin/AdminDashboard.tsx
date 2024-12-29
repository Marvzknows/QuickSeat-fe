import { useContext, useState } from "react";
import AdminBarChart from "../../components/charts/Barchart";
import AdminContainer from "../Layout/AdminLayout/AdminContainer";
import { FaList } from "react-icons/fa";
import { ListButtonProps } from "../../types/AdminTypes/Admin";
import { useQuery } from "@tanstack/react-query";
import { UserContext } from "../../context/userContext";
import CircularProgress from "@mui/material/CircularProgress";
import { GetUpcomingMoviesListApi } from "../../api/admin/upcomingMovieApi";
import { GetNowShowingMoviesListApi } from "../../api/admin/AdminDashboardApi";
import DbMovieList from "../../components/Admin/DbMovieList";

const ListButton = ({ text, onChangeHandler, isActive }: ListButtonProps) => {
  return (
    <div
      onClick={() => onChangeHandler(text)}
      className={`w-full ${isActive ? "border-b-2 border-slate-800 shadow text-slate-900" : "text-slate-500"} transition-all ease-in p-2.5 font-medium  rounded-sm shadow bg-secondary cursor-pointer hover:bg-slate-100 hover:text-slate-600`}
    >
      {text}
    </div>
  );
};

const AdminDashboard = () => {
  const [activeList, setActiveList] = useState({
    nowShowing: false,
    upcoming: true,
  });

  const context = useContext(UserContext);

  //#region Tanstasck
  const {
    error: errorUpcomingMovieList,
    data: upcomingMoviesList,
    isFetching: isFetchingUpcomingMovieList,
  } = useQuery({
    queryKey: ["upcomingMovies", activeList.upcoming],
    queryFn: () =>
      GetUpcomingMoviesListApi({
        token: context.session?.acces_token ?? "",
        onTokenExpired: context.sessionExpired,
        page: 1,
        search: "",
      }),
    enabled: activeList.upcoming, // Only fetch when 'upcoming' is active
  });

  const {
    error: errorNowShowingMovieList,
    data: NowShowingMoviesList,
    isFetching: isFetchingNowShowingMovieList,
  } = useQuery({
    queryKey: ["nowShowingMovies", activeList.nowShowing],
    queryFn: () =>
      GetNowShowingMoviesListApi({
        token: context.session?.acces_token ?? "",
        onTokenExpired: context.sessionExpired,
        page: 1,
        search: "",
      }),
    enabled: activeList.nowShowing, // Only fetch when 'nowShowing' is active
  });

  // #endregion

  const HandleOnchangeList = (tabName: string) => {
    setActiveList({
      nowShowing: tabName === "nowShowing",
      upcoming: tabName === "upcoming",
    });
  };

  return (
    <>
      <AdminContainer
        className="overflow-auto"
        sectionHeaderChildren={"Admin"}
        sectionHeaderCurrentPage={"Dashboard"}
      >
        <div className="flex flex-col md:flex-row gap-2 ">
          <div className="w-full md:w-[60%] md:min-h-[500px] flex flex-col justify-center items-center bg-white rounded-lg shadow border border-neutral-200">
            <div className="w-full px-7 py-4 ">
              <p className="text-neutral-600 font-medium">
                <span className="font-bold">( Now Showing )</span> Revenue and
                Ticket Sales Overview
              </p>
            </div>
            <AdminBarChart />
          </div>

          <div className="w-full md:w-[40%] p-2 bg-white rounded-lg shadow border border-neutral-200">
            <div className="p-2 font-semibold text-slate-700 flex items-center gap-2">
              <FaList size={14} /> Movies List
            </div>
            <div className="flex items-center">
              <ListButton
                onChangeHandler={() => HandleOnchangeList("nowShowing")}
                text="Now Showing"
                isActive={activeList.nowShowing}
              />
              <ListButton
                onChangeHandler={() => HandleOnchangeList("upcoming")}
                text="Upcoming Showing"
                isActive={activeList.upcoming}
              />
            </div>

            <div className="list_container max-h-[400px] overflow-y-auto">
              {(errorUpcomingMovieList || errorNowShowingMovieList) && (
                <div className="text-red">
                  Error on displaying List, Please try again later.
                </div>
              )}

              {activeList.upcoming && (
                <>
                  {isFetchingUpcomingMovieList ? (
                    <div className="flex justify-center items-center py-16">
                      <CircularProgress />
                    </div>
                  ) : upcomingMoviesList?.data?.length ? (
                    upcomingMoviesList.data.map((item) => (
                      <DbMovieList
                        key={item.id}
                        id={item.id}
                        movie_name={item.movie_name}
                        image={item.image}
                        mtrcb_rating={item.mtrcb_rating}
                        genre={item.genre}
                        duration={item.duration}
                        created_at={item.created_at}
                      />
                    ))
                  ) : (
                    <div className="w-full text-center">No Upcoming Movies</div>
                  )}
                </>
              )}

              {activeList.nowShowing && (
                <>
                  {isFetchingNowShowingMovieList ? (
                    <div className="flex justify-center items-center py-16">
                      <CircularProgress />
                    </div>
                  ) : NowShowingMoviesList?.data?.length ? (
                    NowShowingMoviesList.data.map((item) => (
                      <DbMovieList
                        key={item.id}
                        id={item.id}
                        movie_name={item.movie_name}
                        image={item.image}
                        mtrcb_rating={item.mtrcb_rating}
                        genre={item.genre}
                        duration={item.duration}
                        created_at={item.created_at}
                      />
                    ))
                  ) : (
                    <div className="w-full text-center">
                      No Now Showing Movies
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </AdminContainer>
    </>
  );
};

export default AdminDashboard;
