import { ReactNode, useEffect } from "react";
import { IoMdClose } from "react-icons/io";
import Button from "../buttons/Buttons";

type ModalPropsType = {
  onClose: () => void;
  title: string;
  children: ReactNode;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  submitText?: string;
};

const FormModal = ({
  onClose,
  title,
  children,
  onSubmit,
  submitText = "Save",
}: ModalPropsType) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    // Attach the event listener when the component mounts
    document.addEventListener("keydown", handleKeyDown);

    // Cleanup the event listener when the component unmounts
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div className="relative bg-white rounded-lg shadow p-4 w-[95%] md:w-[60%] h-[80%] md:h-[75%]">
        <form onSubmit={onSubmit} className="h-full flex flex-col">
          {/* Modal Header */}
          <div className="border-b-2 py-2 px-3 text-lg text-neutral-600 font-bold flex items-center justify-between">
            <span id="modal-title">{title}</span>
            <button
              type="button"
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
              aria-label="Close modal"
            >
              <IoMdClose size={25} />
            </button>
          </div>

          {/* Modal Content */}
          <div className="flex-grow overflow-y-auto p-4 my-2">
            {/* Content goes here */}
            {children}
          </div>

          {/* Modal Footer */}
          <div className="border-t-2 mt-auto flex items-center justify-end gap-2 pt-2">
            <Button
              type="button"
              className="px-5"
              variant="outline"
              onClick={onClose}
            >
              Close
            </Button>
            <Button type="submit" className="px-5">
              {submitText}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormModal;