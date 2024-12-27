import { ReactNode } from "react";

type ButtonType = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  variant?: "primary" | "danger" | "success" | "outline";
  className?: string;
};

const Button = ({
  children,
  variant = "primary",
  className,
  ...props
}: ButtonType) => {
  const btnVariants = {
    primary:
      "bg-primary hover:shadow-lg text-white hover:bg-[#111827] active:bg-slate-600 disabled:bg-gray-500",
    danger: "bg-danger hover:shadow-lg text-white active:bg-red-400",
    success: "bg-success hover:shadow-lg text-white active:bg-green-400",
    outline:
      "bg-white text-primary border border-primary hover:bg-primary hover:text-white active:bg-slate-600 disabled:bg-slate-200 disabled:border-slate-300 disabled:text-slate-400 disable:hover:shadow-none",
  };

  return (
    <button
      {...props}
      className={`p-2 ${btnVariants[variant]} rounded text-xs font-semibold transition-all ease ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
