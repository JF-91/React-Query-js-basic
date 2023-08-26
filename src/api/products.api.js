import axios from "axios";

const productsApi = axios.create({
    baseURL:"http://localhost:3000"
})

export const getProducts = async()=>{
    const res = await productsApi.get('/products')
    return res.data;
};



export const createPRoduct = async(product)=>{
    productsApi.post('/products', product)
}


export const deleteProduct = async(id)=>{
    productsApi.delete(`/products/${id}`)
}


export const updateProduct = async (body)=>{
    productsApi.put(`products/${body.id}`, body)
}