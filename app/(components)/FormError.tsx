  import { FormErrorProps } from "@/app/types/auth";
  
  export default function FormError({ message }: FormErrorProps) {
    return <p className="text-red-500">{message}</p>;
  }
  