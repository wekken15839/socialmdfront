export const toCapitalizeString = (string) => {
  return (
    string.toString().charAt(0).toUpperCase() + string.slice(1).toLowerCase()
  );
};