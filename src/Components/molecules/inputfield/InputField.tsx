import { InputFieldProps } from "./InputField.types";

const InputField = ({ label, type, name, value, onChange, required }: InputFieldProps) => (
  <div className="mb-4">
    <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      required={required}
      className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-800 dark:text-white dark:border-gray-700"
    />
  </div>
);

export default InputField;