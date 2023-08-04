import axios from "axios";

const apiClient = axios.create({
    baseURL: "http://localhost:5000/api",
    timeout: 20000,
});

export const registerUser = async (userData) => {
    try {
        const response = await apiClient.post('/auth/register', userData);
        return response.data;
    } catch (exception) {
        return {
            error: true,
            exception,
          };
    }
}

export const loginUser = async (userData) => {
    try {
        const response = await apiClient.post('/auth/login', userData);
        return response.data;
    } catch (exception) {
        return {
            error: true,
            exception,
          };
    }
};

// product routes
export const showAllProducts = async (productData) => {
    try {
        const response = await apiClient.get("/prod/showallProducts", productData);
        return response.data;
    } catch (exception) {
        return {
            error: true,
            exception,
        };
    }
};

//cart routes

export const createCart = async (userData) => {
    try {

        const response = await apiClient.post('/cart/createCart', userData);
        //console.log("this is userId for create cart: ", response);
        return response;
    } catch (exception) {
        return {
            error: true,
            exception,
        };
    }
}

//'/readCart/:userId',
export const readCartAPI = async (userId) => {
    try {
        const response = await apiClient.get(`/cart/readCart/${userId}`);
        console.log("this is userId for create cart: ", response);
        return response.data;
    } catch (exception) {
        return {
            error: true,
            exception,
        };
    }
}

//'/getProduct/:prodId',
//'/readCart/:userId',
//const response = await apiClient.get(`/cart/ImagesforCart/${userId}`);
//console.log("this is the response for getProductImage: ", response);
export const getProdImage = async (userId) => {
    try {
        const response = await apiClient.get(`/cart/ImagesforCart/${userId}`);
        console.log("Response from getProdImage API:", response);
        return response;
    } catch (exception) {
        return {
            error: true,
            exception,
        };
    }
}

// apply discount
export const applyDiscount = async(userId) => {
    try {
        const response = await apiClient.post(`/cart/applyDiscount/${userId}`);
        return response.data;
    } catch (exception) {
        return {
            error: true,
            exception,
        };
    }
}

//delete order from cart
export const deleteOrderfromCart = async(userId, productId) => {
    try {
        const response = await apiClient.post(`/cart/deleteOrderfromCart/${userId}/${productId}`);
        return response.data;
    } catch (exception) {
        return {
            error: true,
            exception,
        };
    }
}