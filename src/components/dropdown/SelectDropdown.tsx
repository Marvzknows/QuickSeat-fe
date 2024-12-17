import { RiArrowDropUpLine, RiArrowDropDownLine } from "react-icons/ri";
import useClickOutside from "../../hooks/useClickOutside";
import { Option } from "../../types/AdminTypes/Admin";

type SelectDropdownType = {
  label?: string;
  className?: string;
  options: Option[];
  value: string | number | undefined;
  handleOnchange: (data: Option) => void;
};

const SelectDropdown = ({
  label,
  className,
  options,
  value,
  handleOnchange,
}: SelectDropdownType) => {
  const [isOpen, setIsOpen, ref] = useClickOutside(false);
  const toggleDropdown = () => setIsOpen((prev) => !prev);

  const HandleOnSelect = (id: string) => {
    const selectedOption = options.find((option) => option.id === id);
    if (!selectedOption) return;
    handleOnchange(selectedOption);
    setIsOpen(false);
  };

  return (
    <div ref={ref} className={`p-2 ${className}`}>
      {label && (
        <span className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 mb-2 font-medium">
          {label}
        </span>
      )}

      <div
        onClick={toggleDropdown}
        className="relative flex items-center border rounded border-gray-300 p-2.5 cursor-pointer"
      >
        {value ? (
          <span className="text-xs">{value}</span>
        ) : (
          <span className="text-xs">Select options...</span>
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
                  onClick={(e) => {
                    e.stopPropagation();
                    HandleOnSelect(item.id);
                  }}
                  key={item.id}
                  className={`flex items-center gap-2 px-3 py-2 text-xs cursor-pointer ${item.id === value || item.name === value ? "bg-blue-200" : ""} hover:bg-blue-100`}
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

export default SelectDropdown;
