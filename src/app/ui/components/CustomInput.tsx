export default function CustomInput({
  id,
  label,
  type,
  placeholder,
  required,
  onChange,
}: {
  id: string;
  label: string;
  type: string;
  placeholder: string;
  required: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div className="w-full">
      <label
        htmlFor={id}
        className=" block text-sm font-medium text-gray-900 dark:text-white"
      >
        {label}
        <input
          type={type}
          name={id}
          id={id}
          className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder={placeholder}
          required={required}
          onChange={onChange}
        />
      </label>
    </div>
  );
}
