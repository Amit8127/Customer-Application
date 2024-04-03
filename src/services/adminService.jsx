import { auth, api } from "./serviceUtils";

export const signUp = async (admin) => {
  try {
    const response = await auth.post("/auth/signup", admin);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const login = async (formData) => {
  try {
    const response = await auth.post("/auth/login", formData);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const getDataFromSunbase = async () => {
  try {
    const response = await api.get(`/home/customer/getDataFromSunbase`);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const createACustomer = async (customerObj) => {
  try {
    const response = await api.post(
      `/home/customer/createACustomer`,
      customerObj
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const updateACustomer = async (id, customerObj) => {
  try {
    const response = await api.put(
      `/home/customer/updateACustomer/${id}`,
      customerObj
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const getAllCustomers = async () => {
  try {
    const response = await api.get("/home/customer/getAllCustomers");
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const getCustomerPages = async (
  pageNum,
  pageSize,
  direction,
  search
) => {
  try {
    const response = await api.get("/home/customer/getCustomerPages", {
      params: { pageNum, pageSize, direction, search },
      // params: {
      //   pageNum,
      //   pageSize,
      // },
    });
    return response.data;
  } catch (error) {
    console.log(error);
    return error.response.data;
  }
};

export const getCustomerById = async (id) => {
  try {
    const response = await api.get(`/home/customer/getCustomerById/${id}`);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const deleteACustomerById = async (id) => {
  try {
    const response = await api.delete(
      `/home/customer/deleteACustomerById/${id}`
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};
