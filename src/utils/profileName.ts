export const profileName = (session: any): string => {
  let firstName: string = session?.user?.first_name || "admin";
  let lastName: string = session?.user?.last_name || "user";

  return `${firstName} ${lastName}`;
};
