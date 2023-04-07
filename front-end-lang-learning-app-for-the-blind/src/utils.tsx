import moment from "moment";

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

export const getFormattedTimestamp = (timestamp: number):string => {
  const formattedDate = moment(timestamp).format('MMMM D, YYYY');
  return formattedDate;
}
