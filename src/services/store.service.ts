import StoreModel from "@/models/store.model";

const create = async (
  name: string,
  address: string,
  phoneNumber: string,
  email: string,
  timing: string,
) => {
  const store = await StoreModel.create({
    name,
    address,
    phoneNumber,
    email,
    timing,
  });

  return store;
};

export default {
  create,
};
