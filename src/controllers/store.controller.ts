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

  return commonResponse(res, "Stores feched successfully", stores);
});

const getStoreById = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const store = await storeService.getById(id);

  return commonResponse(res, "Store feched successfully", store);
});

export default {
  createStore,
  getAllStores,
  getStoreById,
};
