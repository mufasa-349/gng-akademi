// Path to files under public/. If the site is published in a subfolder
// (e.g. GitHub Pages: /Websites-MarbellaTech/<project>), the folder is prefixed.
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
export const asset = (path: string) => `${BASE_PATH}${path}`;
export const IS_PREVIEW = process.env.NEXT_PUBLIC_PREVIEW === "true";
