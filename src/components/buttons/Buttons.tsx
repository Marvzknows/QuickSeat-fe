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
    primary: "bg-primary text-white hover:bg-[#111827] active:bg-slate-600",
    danger: "bg-danger text-white active:bg-red-400",
    success: "bg-success text-white active:bg-green-400",
    outline:
      "bg-white text-primary border border-primary hover:bg-primary hover:text-white active:bg-slate-600",
  };

  return (
    <button
      {...props}
      className={`p-2 ${btnVariants[variant]} rounded text-xs hover:shadow-lg font-semibold transition-all ease ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
