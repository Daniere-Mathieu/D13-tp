export function handleUrlErrorQuery(query: { [key: string]: any }) {
  if (
    query.error === "" ||
    typeof query.error === "undefined" ||
    query.error === null
  ) {
    return;
  }
  const error: string = query.error;
  const errorMessage: string[] = error.split("-");
  const errorValue = errorMessage[errorMessage.length - 1].split("_");
  errorMessage.pop();
  const errorString = errorMessage.join(" ") + " " + errorValue.join(" ");
  return errorString;
}
