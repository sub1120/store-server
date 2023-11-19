import storeController from "@/controllers/store.controller";
import { Router } from "express";

import { isLoggedIn } from "@/middlewares/auth.middleware";
import validate from "@/middlewares/validation.middleware";
import storeValidation from "@/validations/store.validation";

const storeRouter = Router();

/**
 * @ROUTE {{URL}}/api/v1/store
 */
storeRouter
  .route("/")
  .post(
    isLoggedIn,
    validate(storeValidation.createStoreSchema),
    storeController.createStore,
  );

/**
 * @ROUTE {{URL}}/api/v1/store
 */

storeRouter.route("/").get(isLoggedIn, storeController.getAllStores);

/**
 * @ROUTE {{URL}}/api/v1/store
 */

storeRouter.route("/:id").get(isLoggedIn, storeController.getStoreById);

export default storeRouter;
