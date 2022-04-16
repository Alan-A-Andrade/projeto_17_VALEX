import { Router } from "express";
import newCardSchema from "../schemas/newCardSchema.js";
import activateCardSchema from "../schemas/activateCardSchema.js";
import rechargeCardSchema from "../schemas/rechargeCardSchema.js";
import blockCardSchema from "../schemas/blockCardSchema.js";
import { validateApiKey } from "../middlewares/apiKeyMiddleware.js";
import { createNewCard, activateCard, getCardBalance, rechargeCard, blockCard, unblockCard } from "../controllers/cardsController.js";
import validateSchemaMiddleware from "../middlewares/validateSchemaMiddleware.js";

const cardRouter: Router = Router()

cardRouter.post('/cards', validateApiKey, validateSchemaMiddleware(newCardSchema), createNewCard)

cardRouter.get('/cards/:id', getCardBalance)

cardRouter.put('/cards/:id/activate', validateSchemaMiddleware(activateCardSchema), activateCard)

cardRouter.post('/cards/:id/recharge', validateApiKey, validateSchemaMiddleware(rechargeCardSchema), rechargeCard)

cardRouter.put('/cards/:id/block', validateSchemaMiddleware(blockCardSchema), blockCard)

cardRouter.put('/cards/:id/unblock', validateSchemaMiddleware(blockCardSchema), unblockCard)


export default cardRouter