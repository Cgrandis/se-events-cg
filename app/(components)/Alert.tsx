import { AlertProps } from "../types/events";  
  
export default function Alert({ message, type }: AlertProps) {
    const color = type === "error" ? "red" : "green";
    return <p className={`text-${color}-500`}>{message}</p>;
  }
  