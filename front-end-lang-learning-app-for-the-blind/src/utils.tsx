export const getMessageFromUnkError = (error: unknown) => {
  if ((error as Error) != undefined) return (error as Error).message;

  return "Error has occrured" + error;
};
export const withEnter = (e: React.KeyboardEvent, onEnter: () => void) => {
  console.log(e);
  if (e.keyCode == 13 || e.which === 13 || e.key === "Enter") {
    onEnter();
  }
};

export const dateToString = (date: Date) => {
  const yyyy = date.getFullYear();
  const mm = date.getMonth() + 1;
  const dd = date.getDate();

  return `${yyyy}-${mm < 10 ? "0" + mm : mm}-${dd < 10 ? "0" + dd : dd}`;
};
