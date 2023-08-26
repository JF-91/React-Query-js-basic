import { useMutation, useQueryClient} from '@tanstack/react-query'
import { createPRoduct } from '../api/products.api';

const ProductForm = () => {

    const queryClient = useQueryClient()


    const addProductMutation = useMutation({
        mutationFn: createPRoduct,
        onSuccess: ()=> {
            console.log('created')
            queryClient.invalidateQueries('products')
        }

    })



    const handleSubmit = (e)=>{
        e.preventDefault()

        const  formData = new FormData(e.target);
        const product = Object.fromEntries(formData);
        console.log([product]);

        addProductMutation.mutate({
            ...product,
            inStock: true
        })

    }


    


  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input type="text" id='name' name="name"/>

        <label htmlFor="description">Description</label>
        <input type="text" id="description" name="description"/>

        <label htmlFor="price">Price</label>
        <input type="number" id="price" name="price"/>

        <button>
            Add product
        </button>
      </form>
    </div>
  );
};

export default ProductForm;
