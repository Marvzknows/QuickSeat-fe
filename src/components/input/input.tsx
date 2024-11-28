import { ReactNode } from "react";

type InputFieldProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  type: 'text' | 'password' | 'email' | 'number';
  placeholder?: string;
  leftIcon?: ReactNode; 
  rightIcon?: ReactNode; 
};

const InputField = ({label, type, placeholder = 'Enter your value', className, leftIcon, rightIcon, ...props}: InputFieldProps) => {

    return (
      <div className={`flex flex-col p-2 ${className}`}>
        {label && (
          <label
            htmlFor={props.id}
            className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 mb-2 font-medium"
          >
            {label}
          </label>
        )}
        <div className="relative flex items-center">
          {leftIcon && (
            <span className="absolute left-3 text-gray-500">{leftIcon}</span>
          )}
          <input
            type={type}
            placeholder={placeholder}
            {...props}
            className={`text-sm w-full p-2 rounded border border-gray-300 text-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-300 focus:border-transparent 
            ${leftIcon ? "pl-10" : ""} 
            ${rightIcon ? "pr-10" : ""}`}
          />
          {rightIcon && (
            <span className="absolute left-3 text-gray-500">{rightIcon}</span>
          )}
        </div>
      </div>
    );
}

export default InputField;