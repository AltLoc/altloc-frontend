export const convertSecondsToMinutes = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${minutes}:${secs.toString().padStart(2, "0")}`;
};

export const convertSecondsToTimeString = (totalSeconds: number): string => {
  const secondsInMinute = 60;
  const secondsInHour = 3600;
  const secondsInDay = 86400;
  // const secondsInMonth = 30 * secondsInDay;
  // const secondsInYear = 365 * secondsInDay;

  let remainingSeconds = totalSeconds;

  // const years = Math.floor(remainingSeconds / secondsInYear);
  // remainingSeconds %= secondsInYear;

  // const months = Math.floor(remainingSeconds / secondsInMonth);
  // remainingSeconds %= secondsInMonth;

  const days = Math.floor(remainingSeconds / secondsInDay);
  remainingSeconds %= secondsInDay;

  const hours = Math.floor(remainingSeconds / secondsInHour);
  remainingSeconds %= secondsInHour;

  const minutes = Math.floor(remainingSeconds / secondsInMinute);
  const seconds = remainingSeconds % secondsInMinute;

  return `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
};
