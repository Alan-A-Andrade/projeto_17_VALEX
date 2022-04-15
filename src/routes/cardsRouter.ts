import { Router } from "express";
import { validateSchemaMiddleware } from "../middlewares/validateScheme.js";
import newCardSchema from "../schemas/newCardSchema.js";
import { validateApiKey } from "../middlewares/apiKeyMiddleware.js";
import { createNewCard } from "../controllers/cardsController.js";

const cardRouter: Router = Router()

cardRouter.use(validateApiKey)

cardRouter.post('/cards', validateSchemaMiddleware(newCardSchema), createNewCard)

export default cardRouter