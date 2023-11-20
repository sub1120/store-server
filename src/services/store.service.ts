import StoreModel from "@/models/store.model";

// creates a store
const create = async (
  name: string,
  address: string,
  phoneNumber: string,
  email: string,
  timing: string,
  description: string,
) => {
  const store = await StoreModel.create({
    name,
    address,
    phoneNumber,
    email,
    timing,
    description,
  });

  return store;
};

// get all stores
const getAll = async () => {
  const stores = await StoreModel.find();
  return stores;
};

// get store by id
const getById = async (id: string) => {
  const store = await StoreModel.findById(id);
  return store;
};

export default {
  create,
  getAll,
  getById,
};
