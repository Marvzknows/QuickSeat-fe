import { InputHTMLAttributes } from "react";

type CheckboxTypes = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  className?: string;
};

const Checkbox = ({ label, className = "", ...props }: CheckboxTypes) => {
  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <input
        type="checkbox"
        {...props}
        className="w-4 h-4 border rounded-md cursor-pointer"
      />
      {label && (
        <label htmlFor={props.id} className="text-sm text-gray-700">
          {label}
        </label>
      )}
    </div>
  );
};

export default Checkbox;
