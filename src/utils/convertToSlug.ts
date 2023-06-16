/**
 * convertToSlug: receives a string and returns a slug
 *
 * @param text
 * @returns string
 */
function convertToSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/ /g, "-")
    .replace(/[^\w-]+/g, "");
}

export default convertToSlug;
