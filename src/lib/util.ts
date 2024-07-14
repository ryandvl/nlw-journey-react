import { format } from "date-fns";

export function formatDate(date: Date | string) {
  return format(date, "d' de 'LLL");
}

export function addZeroToSmallNumbers(numberOrString: number | string) {
  const number = Number(numberOrString);

  return number > 0 && number < 10 ? String(number).padStart(2, "0") : number;
}

export function capitalizeFirstLetter(string: string) {
  return string[0].toUpperCase() + string.slice(1);
}
