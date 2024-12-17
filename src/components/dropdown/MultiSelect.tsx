import { RiArrowDropDownLine, RiArrowDropUpLine } from "react-icons/ri";
import useClickOutside from "../../hooks/useClickOutside";
import { Option } from "../../types/AdminTypes/Admin";

type MultiSelectDropdownProps = {
  label?: string;
  options: Option[];
  onChange: (option: Option) => void;
  value: Option[];
  className?: string;
};
const MultiSelect = ({
  label,
  options,
  onChange,
  value,
  className,
}: MultiSelectDropdownProps) => {
  const [isOpen, setIsOpen, ref] = useClickOutside(false);
  const toggleDropdown = () => setIsOpen((prev) => !prev);

  const createClickHandler =
    (option: Option) => (e: React.MouseEvent<HTMLSpanElement>) => {
      e.stopPropagation();
      onChange(option);
    };

  const isOptionSelected = (option: Option) =>
    value.some((val) => option.id === val.id && option.name === val.name);

  return (
    <div ref={ref} className={`p-2 ${className}`}>
      {label && (
        <span className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 mb-2 font-medium">
          {label}
        </span>
      )}

      <div
        onClick={toggleDropdown}
        className="relative flex flex-wrap items-center gap-1 border rounded border-gray-300 p-2 cursor-pointer"
      >
        {!value.length ? (
          <span className="p-1.5 text-xs">Select options...</span>
        ) : (
          value.map((val) => (
            <span
              onClick={createClickHandler(val)}
              key={val.id}
              className="p-1.5 bg-blue-100 text-blue-800 rounded text-xs"
            >
              {val.name}
            </span>
          ))
        )}

        <span className="ml-auto">
          {isOpen ? (
            <RiArrowDropUpLine size={24} />
          ) : (
            <RiArrowDropDownLine size={24} />
          )}
        </span>

        {isOpen && (
          <ul className="absolute mt-1 top-[100%] z-10 left-0 max-h-60 w-full overflow-auto border border-gray-300 bg-white rounded shadow-lg">
            {options.length ? (
              options.map((item) => (
                <li
                  onClick={createClickHandler(item)}
                  key={item.id}
                  className={`flex items-center gap-2 px-3 py-2 text-xs cursor-pointer ${isOptionSelected(item) ? "bg-blue-100" : "hover:bg-blue-100"}`}
                >
                  {item.name}
                </li>
              ))
            ) : (
              <li className="flex items-center gap-2 px-3 py-2 text-xs">
                No options
              </li>
            )}
          </ul>
        )}
      </div>
    </div>
  );
};

export default MultiSelect;
