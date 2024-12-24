import { IoWarning } from "react-icons/io5";
import Button from "../buttons/Buttons";
import { useContext } from "react";
import { UserContext } from "../../context/userContext";

const SessionExpireModal = () => {
  const { removeSession } = useContext(UserContext);

  return (
    <div
      className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div className="absolute rounded overflow-hidden bg-white w-[700px] flex flex-col min-h-52 shadow">
        <div className="w-full flex items-center justify-center gap-4 font-medium text-lg text-secondary bg-primary p-2">
          <IoWarning size={25} />
          Session Expired
        </div>

        <div className="flex-grow w-full h-full p-3 flex flex-col items-center justify-center">
          <p>Your session has expired.</p>
          <p>Click the button below to login again.</p>
        </div>

        <div className="w-full flex justify-end p-2">
          <Button onClick={removeSession} variant="outline">
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SessionExpireModal;
