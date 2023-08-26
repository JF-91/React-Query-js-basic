import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getProducts, deleteProduct, updateProduct } from "../api/products.api";

const Products = () => {
  const queryclient = useQueryClient();

  const { isLoading, data, isError, error } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
    select: (products) => products.sort((a, b) => b.id - a.id),
  });

  const deleteProductMutation = useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      queryclient.invalidateQueries("products");
    },
  });

  const updateProductMutation = useMutation({
    mutationFn: updateProduct,
    onSuccess: () => {
      queryclient.invalidateQueries("products");
    },
  });

  if (isLoading) return <div>Loading ....</div>;
  else if (isError) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h3>Products list</h3>
      {data.map((item) => (
        <div key={item.id}>
          <h3>{item.name}</h3>
          <p>{item.description}</p>
          <span>{item.price}</span>
          <span> Stock: {item.inStock}</span>
          <label htmlFor={item.id}>In Stock</label>
          <input
            type="checkbox"
            id={item.id}
            checked={item.inStock}
            onChange={(e) =>
              updateProductMutation.mutate({
                ...item,
                inStock: e.target.checked,
              })
            }
          />
          <button onClick={() => deleteProductMutation.mutate(item.id)}>
            delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default Products;
