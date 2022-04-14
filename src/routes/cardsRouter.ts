import { Router } from "express";
import { validateSchemaMiddleware } from "../middlewares/validateScheme.js";
import newCardSchema from "../schemas/newCardSchema.js";
import { validateApiKey } from "../middlewares/apiKeyMiddleware.js";

const cardRouter: Router = Router()

cardRouter.use(validateApiKey)

cardRouter.post('/cards', validateSchemaMiddleware(newCardSchema), (req, res) => { res.send(`tentou criar um novo cartão para empresa  ${res.locals.company.name}`) })

export default cardRouter