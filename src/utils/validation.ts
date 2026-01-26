import { allowedChars } from "../constants/regex";

export interface ValidationResult {
  error: boolean;
  message: string;
}

export const validatePlayerName = (input: string): ValidationResult => {
  const trimmedInput = input.trim();

  if (trimmedInput === "") {
    return {
      error: true,
      message: "This field is required",
    };
  }

  if (trimmedInput.length > 20) {
    return {
      error: true,
      message: "Maximum 20 characters",
    };
  }

  if (trimmedInput.length < 3) {
    return {
      error: true,
      message: "Minimum 3 characters",
    };
  }

  if (!allowedChars.test(trimmedInput)) {
    return {
      error: true,
      message:
      "Only letters, numbers, spaces,\n" +
      "underscores (_), hyphens (-),\n" +
      "and parentheses () are allowed",
    };
  }

  return { error: false, message: "" };
};