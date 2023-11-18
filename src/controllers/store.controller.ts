import asyncHandler from "@/middlewares/asyncHandler.middleware";
import storeService from "@/services/store.service";
import AppErr from "@/utils/appErr";
import commonResponse from "@/utils/commonResponse";

const createStore = asyncHandler(async (req, res) => {
  const { name, address, phoneNumber, email, timing } = req.body;

  if (!name || !address || !phoneNumber || !email || !timing) {
    throw new AppErr(
      "Please provide all detail { name, address, phoneNumber, email, timing }",
      401,
    );
  }

  const store = await storeService.create(
    name,
    address,
    phoneNumber,
    email,
    timing,
  );

  return commonResponse(res, "Store created successfully", store);
});

export default {
  createStore,
};
