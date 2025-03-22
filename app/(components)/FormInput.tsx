import { FormInputProps } from "../types/auth";

export default function FormInput({
    label,
    type,
    name,
    value,
    onChange,
    disabled = false,
    required = false,
    placeholder = "",
  }: FormInputProps) {
    return (
      <div>
        <label className="block text-sm font-medium text-gray-700">{label}</label>
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          className="w-full p-2 border rounded"
          disabled={disabled}
          required={required}
          placeholder={placeholder}
        />
      </div>
    );
  }
  