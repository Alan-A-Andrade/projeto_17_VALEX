import { Router } from "express";
import validateSchemaMiddleware from "../middlewares/validateSchemaMiddleware.js";
import * as virtualCardsController from "../controllers/virtualCardsController.js";
import * as schemas from "../schemas/index.js"

const virtualCardRouter: Router = Router()

virtualCardRouter.post(
  '/virtualCard',
  validateSchemaMiddleware(schemas.newVirtualCardSchema),
  virtualCardsController.createNewVirtualCard
)

virtualCardRouter.delete(
  '/virtualCard/:id',
  validateSchemaMiddleware(schemas.passwordSchema),
  virtualCardsController.deleteVirtualCard
)

export default virtualCardRouter