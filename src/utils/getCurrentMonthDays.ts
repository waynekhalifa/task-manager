export function getCurrentMonthDays(): number[] {
  const date: Date = new Date();
  const year: number = date.getFullYear();
  const month: number = date.getMonth();
  const daysInMonth: number = new Date(year, month + 1, 0).getDate();
  const daysArray: number[] = Array.from(
    { length: daysInMonth },
    (_, i) => i + 1
  );
  return daysArray;
}
