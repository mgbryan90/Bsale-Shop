export const getAllProducts = async () => {
  const response = await fetch("http://localhost:3000/api/product");
  const data = await response.json();
  return data;
};

export const getFilterProductsByCategory = async (idCategory = "") => {
  const response = await fetch(
    `http://localhost:3000/api/category/${idCategory}/products`
  );
  const data = await response.json();
  return data;
};

//
export const getFilterProductsByQuery = async (query = "") => {
  const response = await fetch(`http://localhost:3000/api/product`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      mode: query,
    }),
  });
  const data = await response.json();
  return data;
};
