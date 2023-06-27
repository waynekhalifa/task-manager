export const profileUserName = (session: any): string =>
  session?.user?.username || "admin";
