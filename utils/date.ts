import dayjs from "dayjs";

/**
 * @returns UTC timestamp (seconds since midnight, January 1, 1970 UTC)
 */
export function dateToUTCTimestamp(date: Date): number {
  return Math.floor(date.getTime() / 1000);
}

/**
 * @param timestamp UTC timestamp (seconds since midnight, January 1, 1970 UTC)
 */
// export function utcTimestampToDate(timestamp: number): Date {
//   return new Date(timestamp);
// }

// export function utcTimestampToDate(timestamp: string): Date {
//   return dayjs(timestamp).toDate(); // Преобразует строку ISO 8601 в объект Date
// }

// export function utcTimestampToDate(date: string | number): string {
//   return dayjs(date).utc().format("DD MMM YYYY, HH:mm"); // например: "14 Apr 2025, 12:30"
// }

export function utcTimestampToDate(date: string | number): string {
  return dayjs(date).format("DD MMM YYYY, HH:mm");
}

export function utcTimestampToDayAndMonth(date: string | number): string {
  return dayjs(date).format("DD MMM YYYY");
}
