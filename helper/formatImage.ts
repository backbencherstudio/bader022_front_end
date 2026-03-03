const BASE_URL = process.env.NEXT_PUBLIC_FILE_URL!;

export const getImageUrl = (path?: string | null) => {
  if (!path || path === "null") return "/images/company3.png";

  if (path.startsWith("http")) return path;

  return `${BASE_URL}/${path}`;
};