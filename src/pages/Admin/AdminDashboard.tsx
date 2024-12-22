import { useState } from "react";
import AdminBarChart from "../../components/charts/Barchart";
import AdminContainer from "../Layout/AdminLayout/AdminContainer";
import { FaList } from "react-icons/fa";
import { ListButtonProps } from "../../types/AdminTypes/Admin";

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
    nowShowing: true,
    upcoming: false,
  });

  const data = [
    2, 2, 45, 253, 256, 246, 24, 63, 46, 374, 535, 73, 7345, 7, 458, 4, 68,
    4846, 845, 68, 48, 456, 895, 965, 95, 9, 65, 95, 679, 5769, 579, 5, 9,
  ];

  const movieBannerLink =
    "https://marketplace.canva.com/EAFVCFkAg3w/1/0/1131w/canva-red-and-black-horror-movie-poster-AOBSIAmLWOs.jpg";

  const HandleOnchangeList = (tabName: string) => {
    setActiveList({
      nowShowing: tabName === "nowShowing",
      upcoming: tabName === "upcoming",
    });
  };

  return (
    <>
      <AdminContainer
        className="bg-inherit overflow-auto"
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
              {data.map((item) => (
                <div
                  key={item}
                  className="border-b-2 flex flex-row gap-2 text-sm p-2"
                >
                  <img width={50} src={movieBannerLink} />

                  <div className="flex flex-col items-start justify-around px-2">
                    <p className="font-bold text-md text-slate-800">
                      The Batman
                    </p>
                    <p className="text-slate-500">
                      Rating: <span className="text-success font-bold">PG</span>
                    </p>
                    <p className="text-slate-500">
                      Duration:
                      <span className="text-slate-800 font-bold px-1">
                        145mins
                      </span>
                    </p>
                  </div>

                  <div className="ml-auto my-auto pr-4">
                    <p className="text-slate-500">
                      Ticket Sold:{" "}
                      <span className="text-slate-800 font-bold px-1">
                        ₱1,400.00
                      </span>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </AdminContainer>
    </>
  );
};

export default AdminDashboard;
