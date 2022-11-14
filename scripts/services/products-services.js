export const getAllProducts = async () => {
  const response = await fetch(
    "https://shop-api-rest.herokuapp.com/api/product"
  );
  const data = await response.json();
  return data;
};

export const getFilterProductsByCategory = async (idCategory = "") => {
  const response = await fetch(
    `https://shop-api-rest.herokuapp.com/api/category/${idCategory}/products`
  );
  const data = await response.json();
  return data;
};

//
export const getFilterProductsByQuery = async (query = "") => {
  const response = await fetch(
    `https://shop-api-rest.herokuapp.com/api/product`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        mode: query,
      }),
    }
  );
  const data = await response.json();
  return data;
};
