export type FieldValidatorType = (value: string) => string | undefined;
export const required: FieldValidatorType = (value) => {
  if (value) return undefined;

  return "field is required";
};

export const maxLengthCreator =
  (maxLength: number): FieldValidatorType =>
  (value) => {
    if (value.length > maxLength) return "Max length is 30 symbols";

    return undefined;
  };
