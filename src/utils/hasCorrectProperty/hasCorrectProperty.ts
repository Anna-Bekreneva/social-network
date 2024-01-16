export const hasCorrectProperty = (obj: { [key: string]: string | null }) => {
  for (let key in obj) {
    if (obj.hasOwnProperty(key) && obj[key] !== null && obj[key] !== "") {
      return true;
    }
  }
  return false;
};
