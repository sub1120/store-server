import asyncHandler from "@/middlewares/asyncHandler.middleware";
import storeService from "@/services/store.service";
import AppErr from "@/utils/appErr";
import commonResponse from "@/utils/commonResponse";

const createStore = asyncHandler(async (req, res) => {
  const { name, address, phoneNumber, email, timing, description } = req.body;

  if (!name || !address || !phoneNumber || !email || !timing || !description) {
    throw new AppErr(
      "Please provide all detail { name, address, phoneNumber, email, timing, description }",
      401,
    );
  }

  const store = await storeService.create(
    name,
    address,
    phoneNumber,
    email,
    timing,
    description,
  );

  return commonResponse(res, "Store created successfully", store);
});

const getAllStores = asyncHandler(async (req, res) => {
  const stores = await storeService.getAll();

  const updatedStores = stores.map((item) => {
    const storeCurrentStatus = storeService.getStoreStatus(item.timing);

    return {
      _id: item._id,
      name: item.name,
      address: item.address,
      phoneNumber: item.phoneNumber,
      email: item.email,
      timing: item.timing,
      description: item.description,
      storeStatus: storeCurrentStatus,
    };
  });

  return commonResponse(res, "Stores feched successfully", updatedStores);
});

const getStoreById = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const store = await storeService.getById(id);
  if (store) {
    const storeCurrentStatus = storeService.getStoreStatus(store.timing);

    const updatedStore = {
      _id: store._id,
      name: store.name,
      address: store.address,
      phoneNumber: store.phoneNumber,
      email: store.email,
      timing: store.timing,
      description: store.description,
      storeStatus: storeCurrentStatus,
    };

    return commonResponse(res, "Store feched successfully", updatedStore);
  }

  return commonResponse(res, "Store Not Found", {});
});

export default {
  createStore,
  getAllStores,
  getStoreById,
};
