import { Router } from "express";
import * as schemas from "../schemas/index.js"
import * as cardsController from "../controllers/cardsController.js";
import validateSchemaMiddleware from "../middlewares/validateSchemaMiddleware.js";
import validateApiKey from "../middlewares/apiKeyMiddleware.js";

const cardRouter: Router = Router()

cardRouter.post(
  '/cards',
  validateApiKey,
  validateSchemaMiddleware(schemas.newCardSchema),
  cardsController.createNewCard
)

cardRouter.get(
  '/cards/:id',
  cardsController.getCardBalance
)

cardRouter.put(
  '/cards/:id/activate',
  validateSchemaMiddleware(schemas.activateCardSchema),
  cardsController.activateCard
)

cardRouter.post(
  '/cards/:id/recharge',
  validateApiKey,
  validateSchemaMiddleware(schemas.rechargeCardSchema),
  cardsController.rechargeCard
)

cardRouter.put(
  '/cards/:id/block',
  validateSchemaMiddleware(schemas.passwordSchema),
  cardsController.blockCard
)

cardRouter.put(
  '/cards/:id/unblock',
  validateSchemaMiddleware(schemas.passwordSchema),
  cardsController.unblockCard
)

export default cardRouter