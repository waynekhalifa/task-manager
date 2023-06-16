export const numberToCurrency = (number: number): string => {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "AED",
    minimumFractionDigits: 2,
  });

  return formatter.format(number);
};
