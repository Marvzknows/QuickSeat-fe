import { useRef } from "react";
import { RiArrowDropDownLine, RiArrowDropUpLine } from "react-icons/ri";
import useClickOutside from "../../hooks/useClickOutside";

export type Option = {
  id: string;
  value: string;
};

type MultiSelectDropdownProps = {
  label?: string;
  options: Option[];
  setOptions: React.Dispatch<React.SetStateAction<Option[]>>;
  selectedOptions: Option[];
  setSelectedOptions: React.Dispatch<React.SetStateAction<Option[]>>;
  className?: string;
};

const MultiSelect = ({
  label,
  options,
  setOptions,
  selectedOptions,
  setSelectedOptions,
  className,
}: MultiSelectDropdownProps) => {
  const [isOpen, setIsOpen, ref] = useClickOutside(false);
  const originalOptionsRef = useRef<Option[]>(options);

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  const handleSelect = (option: Option) => {
    // Add the selected option in the selectedOption states
    setSelectedOptions((prev) =>
      prev.some((item) => item.id === option.id) ? prev : [...prev, option],
    );

    // Remove the selectedOption from the option lists dropdown
    const filteredOptions = options.filter((data) => data.id !== option.id);
    setOptions(filteredOptions);
  };

  const handleRemoveSelected = (option: Option) => {
    // Remove sa "selectedOptions"
    const removedSelectedOptionList = selectedOptions.filter(
      (data) => data.id !== option.id,
    );
    setSelectedOptions([...removedSelectedOptionList]);
    // Add the removed option also add the removed option  back in its original position
    setOptions((prev) => {
      const allOptions = [...prev, option];
      return originalOptionsRef.current.filter((original) =>
        allOptions.some((current) => current.id === original.id),
      );
    });
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
        className="relative flex flex-wrap items-center gap-1 border rounded border-gray-300 p-2 cursor-pointer"
      >
        {selectedOptions.length ? (
          selectedOptions.map((data) => (
            <span
              onClick={(e) => {
                e.stopPropagation();
                handleRemoveSelected(data);
              }}
              key={data.id}
              className="p-1.5 bg-blue-100 text-blue-800 rounded text-xs"
            >
              {data.value}
            </span>
          ))
        ) : (
          <span className="text-gray-500 rounded text-xs">
            Select options...
          </span>
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
                    handleSelect(item);
                  }}
                  key={item.id}
                  className="flex items-center gap-2 px-3 py-2 text-xs cursor-pointer hover:bg-blue-100"
                >
                  {item.value}
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
