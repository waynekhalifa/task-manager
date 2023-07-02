export function getHoursDiff(startDate: Date, endDate: Date): number {
  const diffInMs: number = Math.abs(endDate.getTime() - startDate.getTime());
  const diffInHours: number = Math.ceil(diffInMs / (1000 * 60 * 60));
  return diffInHours;
}
