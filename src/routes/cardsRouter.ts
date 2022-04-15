import { Router } from "express";
import { validateSchemaMiddleware } from "../middlewares/validateScheme.js";
import newCardSchema from "../schemas/newCardSchema.js";
import activateCardSchema from "../schemas/activateCardSchema.js";
import { validateApiKey } from "../middlewares/apiKeyMiddleware.js";
import { createNewCard, activateCard, getCardBalance } from "../controllers/cardsController.js";

const cardRouter: Router = Router()

cardRouter.post('/cards', validateApiKey, validateSchemaMiddleware(newCardSchema), createNewCard)

cardRouter.put('/cards/:id/activate', validateSchemaMiddleware(activateCardSchema), activateCard)

cardRouter.get('/cards/:id', getCardBalance)


export default cardRouter