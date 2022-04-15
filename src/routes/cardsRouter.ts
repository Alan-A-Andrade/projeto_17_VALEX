import { Router } from "express";
import { validateSchemaMiddleware } from "../middlewares/validateScheme.js";
import newCardSchema from "../schemas/newCardSchema.js";
import activateCardSchema from "../schemas/activateCardSchema.js";
import rechargeCardSchema from "../schemas/rechargeCardSchema.js";
import { validateApiKey } from "../middlewares/apiKeyMiddleware.js";
import { createNewCard, activateCard, getCardBalance, rechargeCard } from "../controllers/cardsController.js";

const cardRouter: Router = Router()

cardRouter.post('/cards', validateApiKey, validateSchemaMiddleware(newCardSchema), createNewCard)

cardRouter.put('/cards/:id/activate', validateSchemaMiddleware(activateCardSchema), activateCard)

cardRouter.post('/cards/:id/recharge', validateApiKey, validateSchemaMiddleware(rechargeCardSchema), rechargeCard)

cardRouter.get('/cards/:id', getCardBalance)


export default cardRouter