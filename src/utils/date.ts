import dayjs from "dayjs";
import ptBr from "dayjs/locale/pt-br";
var utc = require('dayjs/plugin/utc')

dayjs.locale(ptBr);
dayjs.extend(utc)

export const toFormatDate = (date: string | Date, format?: string): string => {
  return dayjs(date).format(format);
};

export const getDateNow = (format?: string, date?: string | Date): string => {
  return dayjs(date).format(format);
};

export const getDate = (date: string | Date, format?: string): string => {
  return dayjs(date).format(format);
};

export const subtractDate = (
  quantity: number,
  period: dayjs.ManipulateType,
  date?: string
): string => {
  return dayjs(date).subtract(quantity, period).format();
};

export const isAfter = (
  date: Date | string,
  dateCompare: Date | string
): boolean => {
  const dateF = dayjs(date);
  const dateCompareF = dayjs(dateCompare);

  return dateF.diff(dateCompareF) > 0 ? true : false;
};

export const isSameDay = (
  date: Date | string,
  dateCompare: Date | string
): boolean => {
  const dateF = dayjs(date);
  const dateCompareF = dayjs(dateCompare);

  return dayjs(dateF).isSame(dateCompareF, "day");
};

export const getMonthByNumber = (value: number, format?: string) => {
  return dayjs().month(value).format(format);
};

export const getDaysInMonth = (date: string | Date): Date[] => {
  const start = dayjs(date).startOf("month").toDate();
  const end = dayjs(date).endOf("month").toDate();
  const days = [];
  let day = start;

  while (day <= end) {
    days.push(day);
    day = new Date(day.getFullYear(), day.getMonth(), day.getDate() + 1);
  }

  return days;
};
