export const profileEmail = (session: any): string =>
  session?.user?.email || "admin@example.com";
