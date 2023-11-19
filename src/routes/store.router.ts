import storeController from "@/controllers/store.controller";
import { Router } from "express";

import { isLoggedIn } from "@/middlewares/auth.middleware";
import validate from "@/middlewares/validation.middleware";
import storeValidation from "@/validations/store.validation";

const storeRouter = Router();

/**
 * @ROUTE {{URL}}/api/v1/store
 * @METHOD GET
 * @PARAMS NA
 * @ACCESS Protected
 */
storeRouter
  .route("/")
  .post(
    isLoggedIn,
    validate(storeValidation.storeSchema),
    storeController.createStore,
  );

/**
 * @ROUTE {{URL}}/api/v1/store
 * @METHOD GET
 * @PARAMS NA
 * @ACCESS Protected
 */
storeRouter.route("/").get(isLoggedIn, storeController.getAllStores);

/**
 * @ROUTE {{URL}}/api/v1/store
 * @METHOD GET
 * @PARAMS id
 * @ACCESS Protected
 */
storeRouter.route("/:id").get(isLoggedIn, storeController.getStoreById);

export default storeRouter;
