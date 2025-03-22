import { AuthInputProps } from "../types/auth"; 
  
  export default function AuthInput({ type, name, placeholder, value, onChange, disabled }: AuthInputProps) {
    return (
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className="w-full p-2 border rounded"
        required
      />
    );
  }
  