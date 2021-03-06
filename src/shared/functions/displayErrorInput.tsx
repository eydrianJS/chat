export const displayErrorInput = (
  touched: boolean | undefined,
  error: string | undefined
): boolean => {
  const valid = (touched && error) || false;
  return valid as boolean;
};
