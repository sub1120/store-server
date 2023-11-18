import storeController from "@/controllers/store.controller";
import { Router } from "express";

import validate from "@/middlewares/validation.middleware";
import storeValidation from "@/validations/store.validation";

const storeRouter = Router();

/**
 * @ROUTE {{URL}}/api/v1/store
 */

storeRouter
  .route("/")
  .post(
    validate(storeValidation.createStoreSchema),
    storeController.createStore,
  );

/**
 * @ROUTE {{URL}}/api/v1/store
 */

storeRouter.route("/").get(storeController.getAllStores);

/**
 * @ROUTE {{URL}}/api/v1/store
 */

storeRouter.route("/:id").get(storeController.getStoreById);

export default storeRouter;
