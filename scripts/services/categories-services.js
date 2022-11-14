export const getAllCategories = async () => {
  const response = await fetch(
    "https://shop-api-rest.herokuapp.com/api/category"
  );
  const data = await response.json();
  return data;
};
