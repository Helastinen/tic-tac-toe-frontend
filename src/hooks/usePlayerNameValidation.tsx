import { useState } from "react";
import { Players } from "../types/types.js";
import { validatePlayerName } from "../utils/validation.js";

export const usePlayerNameValidation = () => {
  const [errors, setErrors] = useState<Record<keyof Players, boolean>>({
    playerOne: false,
    playerTwo: false,
  });
  const [helperTexts, setHelperTexts] = useState<Record<keyof Players, string>>({
    playerOne: "",
    playerTwo: "",
  });

  const validateNameField = (field: keyof Players, value: string) => {
    const { error, message } = validatePlayerName(value);

    setErrors(prev => ({ ...prev, [field]: error }));
    setHelperTexts(prev => ({ ...prev, [field]: message }));
  };

  return {
    errors,
    helperTexts,
    validateNameField
  };
};