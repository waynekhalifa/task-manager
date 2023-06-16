/**
 * getThemeNameById receives a theme id and returns the theme name
 *
 * @param id
 * @returns string
 */
export const getThemeNameById = (theme: any): string => {
  if (theme.name) return theme.name.toLowerCase();

  return "maven";
};
