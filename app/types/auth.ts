export interface SignUpFormProps {
    role: "STAFF" | "USER";
  }

export interface PasswordInputProps {
  name: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface FormErrorProps {
  message: string;
}

export interface UseSignUpProps {
  role: "STAFF" | "USER";
}

export interface AuthInputProps {
  type: string;
  name: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
}

export interface GoogleSignInButtonProps {
  onClick: () => void;
  isLoading: boolean;
}