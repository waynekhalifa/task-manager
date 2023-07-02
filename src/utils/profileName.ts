export const profileName = (user: any): string => {
  let firstName: string = user?.first_name || "admin";
  let lastName: string = user?.last_name || "user";

  return `${firstName} ${lastName}`;
};
