import { MdAdd, MdEdit } from "react-icons/md";
import Button from "../../../components/buttons/Buttons";
import SectionHeader from "../../../components/Headers/AdminHeaders";
import AdminContainer from "../../Layout/AdminLayout/AdminContainer";
import { HiMiniViewfinderCircle } from "react-icons/hi2";
import { AiFillDelete } from "react-icons/ai";

const UpcomingShow = () => {
  const movieBannerLink =
    "https://marketplace.canva.com/EAFVCFkAg3w/1/0/1131w/canva-red-and-black-horror-movie-poster-AOBSIAmLWOs.jpg";

  return (
    <AdminContainer>
      <SectionHeader
        children={"Admin / Movies"}
        currentPage={"Upcoming show"}
      />

      {/* Make this div grow to fill remaining space */}
      <div className="flex-grow flex flex-col">
        <div className="w-full h-full flex flex-col p-2.5 bg-white rounded-lg shadow border border-neutral-200 overflow-auto">
          <div className="flex items-center w-full">
            <Button className="ml-auto flex items-center gap-2-">
              <MdAdd size={18} /> Add New Show
            </Button>
          </div>

          <div className="relative overflow-x-auto sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <caption className="p-5 text-lg font-semibold text-left rtl:text-right text-gray-900 bg-white dark:text-white dark:bg-gray-800">
                Upcoming shows
                <p className="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">
                  Lists of upcoming shows,
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
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <th
                    scope="row"
                    className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    <img
                      className="w-14 object-contain"
                      src={movieBannerLink}
                      alt="Jese image"
                    />
                    <div className="ps-3">
                      <div className="text-base font-semibold">The Batman</div>
                      <div className="font-normal text-gray-500">
                        Duration: <small className="font-bold">145mins</small>
                      </div>
                    </div>
                  </th>
                  <td className="px-6 py-4">Horror, Suspense, Thriller</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center font-bold text-danger">
                      Online
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <button className="px-2 py-1 bg-blue-700 text-white rounded hover:bg-blue-800 mr-1 fontb-bold">
                      <MdEdit size={20} />
                    </button>
                    <button className="px-2 py-1 bg-green-700 text-white rounded hover:bg-green-800 mr-1 fontb-bold">
                      <HiMiniViewfinderCircle size={20} />
                    </button>
                    <button className="px-2 py-1 bg-red-700 text-white rounded hover:bg-red-800 mr-1 fontb-bold">
                      <AiFillDelete size={20} />
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminContainer>
  );
};

export default UpcomingShow;
