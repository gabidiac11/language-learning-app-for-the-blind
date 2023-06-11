export function getMatchUsingNumber(
  items: { id: string; name: string }[],
  searchName: string,
  searchNumber?: number
) {
  if (!searchNumber) return undefined;

  const storyInputNoNumber = searchName
    .replace(/(number [\w\d]+)/, "")
    .replace(/[\d]+/, "")
    .trim();

  const storyWithNumber = `${storyInputNoNumber}#${searchNumber}`;
  console.log(`Search using name with number '${storyWithNumber}'`);
  let item = items.find(
    (item) => item.name.toLocaleLowerCase().indexOf(storyWithNumber) > -1
  );
  if (!item) {
    const storyInputNoNumber = searchName.replace("number", "").trim();
    const storyWithNumber = `${storyInputNoNumber}#${searchNumber}`;
    console.log(`Search x2 using name with number '${storyWithNumber}'`);
  }
  return item;
}
