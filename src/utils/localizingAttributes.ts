import { Languages } from "enums/languages";

export const localizingAttributes = (
  locale: string | undefined,
  object: any,
  key: string
) => {
  if (locale === Languages.ENGLISH) return object[`en_${key}`];

  return object[key];
};
