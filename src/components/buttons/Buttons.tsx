import { ReactNode } from "react";

type ButtonType = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    children: ReactNode;
    variant?: 'primary' | 'danger' | 'success' | 'outline'
    className?: string;
}

const Button = ({children, variant = 'primary', className, ...props}: ButtonType ) => {

    const btnVariants = {
        primary: 'bg-primary text-white hover:bg-[#111827]',
        danger: 'bg-danger text-white',
        success: 'bg-success text-white',
        outline: 'bg-white text-primary border border-primary hover:bg-primary hover:text-white',
    }

    return (
      <button
        {...props}
        className={`p-2 ${btnVariants[variant]} rounded text-xs hover:shadow-lg font-semibold transition-all ease ${className}`}
      >
        {children}
      </button>
    );
}

export default Button;