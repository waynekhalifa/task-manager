export const sumDaysLeftFromToDay = (startDate:string) => {
  const date1: any = new Date();
  let date2: any = new Date(startDate);
  const diffTime = Math.abs(date2 - date1);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};

export const sumDateRange = (startDate: string, endDate:string) => {
  let date1: any = new Date(startDate);
  let date2: any = new Date(endDate);
  const diffTime = Math.abs(date1 - date2);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};
