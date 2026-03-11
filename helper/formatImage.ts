const BASE_URL = process.env.NEXT_PUBLIC_IMAGE_API_URL!;
export const getImageUrl = (image?: string) => {
  if (!image) return "";
  return `${BASE_URL}/${image}`;
};