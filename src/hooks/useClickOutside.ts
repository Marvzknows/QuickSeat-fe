import { useEffect, useRef, useState } from "react";

const useClickOutside = (
  initialState: boolean,
): [
  boolean,
  React.Dispatch<React.SetStateAction<boolean>>,
  React.LegacyRef<HTMLDivElement>,
] => {
  const [isOpen, setIsOpen] = useState(initialState);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  return [isOpen, setIsOpen, ref];
};

export default useClickOutside;
