"use client";

import { useState } from "react";
import { PasswordInputProps } from "@/app/types/auth";

export default function PasswordInput({ name, placeholder, value, onChange }: PasswordInputProps) {
  const [show, setShow] = useState(false);

  return (
    <div className="relative">
      <input
        type={show ? "text" : "password"}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full p-2 border rounded"
        required
      />
      <button
        type="button"
        onClick={() => setShow((prev) => !prev)}
        className="absolute right-3 top-2 text-sm text-black"
      >
        {show ? "Hide" : "Show"}
      </button>
    </div>
  );
}
