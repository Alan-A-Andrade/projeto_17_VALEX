import { Router } from "express";
import validateSchemaMiddleware from "../middlewares/validateSchemaMiddleware.js";
import newVirtualCardSchema from "../schemas/newVirtualCardSchema.js";
import { createNewVirtualCard, deleteVirtualCard } from "../controllers/virtualCardsController.js";
import passwordSchema from "../schemas/passwordCardSchema.js";

const virtualCardRouter: Router = Router()

virtualCardRouter.post('/virtualCard', validateSchemaMiddleware(newVirtualCardSchema), createNewVirtualCard)

virtualCardRouter.delete('/virtualCard/:id', validateSchemaMiddleware(passwordSchema), deleteVirtualCard)

export default virtualCardRouter