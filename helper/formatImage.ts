const BASE_URL = process.env.NEXT_PUBLIC_FILE_URL!;
export const getImageUrl = (image?: string) => {

  console.log('====================================');
  console.log("image======",image);
  console.log('====================================');
  if (!image) return "";
  return `${BASE_URL}/${image}`;
};