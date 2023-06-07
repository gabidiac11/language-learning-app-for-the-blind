/**
 * gets a name safe for using as file name in the storage
 * @param anyName
 */
export const getSafeName = (anyName: string) => {
  const safeName = anyName
    .replace(" ", "-")
    .split("")
    .filter((char) => /[-\w\d]+/.test(char))
    .slice(0, 100)
    .join("");
  return safeName;
};
