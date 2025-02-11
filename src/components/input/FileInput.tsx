import { useRef, useState } from "react";
import { IoMdClose } from "react-icons/io";
import Button from "../buttons/Buttons";

type ImageUploadProps = React.InputHTMLAttributes<HTMLInputElement> & {
  setImageUpload: React.Dispatch<React.SetStateAction<File | null>>;
  propsImagePreview?: string | null;
  removePropsImagePreview?: () => void;
};

const ImageUpload = ({
  setImageUpload,
  propsImagePreview,
  removePropsImagePreview,
  ...props
}: ImageUploadProps) => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleOnchangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    // Add validation
    if (file) {
      const fileURL = URL.createObjectURL(file);
      setImagePreview(fileURL);
      setImageUpload(file);
    }
  };

  const handleRemoveImage = () => {
    setImagePreview(null);
    setImageUpload(null);
    if (removePropsImagePreview) {
      removePropsImagePreview();
    }
  };

  return (
    <div className="flex items-center justify-center min-h-72 w-64 border-2 border-dashed border-gray-300 rounded-lg mx-auto">
      {imagePreview || propsImagePreview ? (
        <div className="relative w-full h-full">
          <img
            className="w-full h-full"
            src={(propsImagePreview ?? "") || (imagePreview ?? "")}
            alt="Uploaded"
          />
          <button
            type="button"
            onClick={handleRemoveImage}
            className="absolute top-[-14px] right-[-10px] rounded-full bg-slate-200 shadow p-1 hover:bg-slate-300"
          >
            <IoMdClose size={15} />
          </button>
        </div>
      ) : (
        <label className="cursor-pointer">
          <input
            onChange={handleOnchangeImage}
            ref={fileInputRef}
            type="file"
            className="hidden"
            {...props}
          />
          <div className="flex flex-col items-center justify-center">
            <Button type="button" onClick={handleButtonClick} className="px-4">
              Upload Image
            </Button>
          </div>
        </label>
      )}
    </div>
  );
};

export default ImageUpload;
