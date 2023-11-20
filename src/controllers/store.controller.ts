import asyncHandler from "@/middlewares/asyncHandler.middleware";
import storeService from "@/services/store.service";
import commonResponse from "@/utils/commonResponse";
import HTTP_STATUS from "@/utils/httpStatus";

/***********************************************************************
 * @CREATE_STORE
 * @DESCRIPTION Controller for creating new store
 * @INPUTS name, address, phoneNumber, email, timing, description
 * @RETURNS Store
 ***********************************************************************/
const createStore = asyncHandler(async (req, res) => {
  const { name, address, phoneNumber, email, timing, description } = req.body;

  const store = await storeService.create(
    name,
    address,
    phoneNumber,
    email,
    timing,
    description,
  );

  return commonResponse(
    res,
    "Store Created Successfully",
    store,
    HTTP_STATUS.CREATED,
  );
});

/***********************************************************************
 * @GET_ALL_STORES
 * @DESCRIPTION Controller to fetch all stores
 * @INPUTS NA
 * @RETURNS All stores
 ***********************************************************************/
const getAllStores = asyncHandler(async (req, res) => {
  const allStores = await storeService.getAll();

  //check for empty
  if (allStores.length === 0) {
    return commonResponse(res, "No Store Exists", {}, HTTP_STATUS.NO_CONTENT);
  }

  return commonResponse(
    res,
    "Stores Feched Successfully",
    allStores,
    HTTP_STATUS.OK,
  );
});

/***********************************************************************
 * @GET_STORE_BY_ID
 * @DESCRIPTION Controller to fetch store by id
 * @INPUTS id
 * @RETURNS A store
 ***********************************************************************/
const getStoreById = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const store = await storeService.getById(id);

  //check for empty
  if (!store) {
    return commonResponse(res, "Store Not Found", {}, HTTP_STATUS.NOT_FOUND);
  }

  return commonResponse(
    res,
    "Store Feched Successfully",
    store,
    HTTP_STATUS.OK,
  );
});

export default {
  createStore,
  getAllStores,
  getStoreById,
};
