'use client';

interface CheckboxGroupProps {
  label: string;
  options: string[];
  selected: string[];
  onChange: (values: string[]) => void;
}

export const CheckboxGroup = ({
  label,
  options,
  selected,
  onChange
}: CheckboxGroupProps) => {
  const handleChange = (option: string) => {
    const newSelected = selected.includes(option)
      ? selected.filter(item => item !== option)
      : [...selected, option];
    onChange(newSelected);
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-3">
        {label}
      </label>
      <div className="grid grid-cols-2 gap-4">
        {options.map((option) => (
          <div key={option} className="flex items-center">
            <input
              type="checkbox"
              checked={selected.includes(option)}
              onChange={() => handleChange(option)}
              className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
            />
            <label className="ml-2 text-sm text-gray-700">{option}</label>
          </div>
        ))}
      </div>
    </div>
  );
}; 