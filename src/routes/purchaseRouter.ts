import { Router } from "express";
import { validateSchemaMiddleware } from "../middlewares/validateScheme.js";
import PosPurchaseSchema from "../schemas/PosPurchaseSchema.js";
import { newPurchase } from "../controllers/purchaseController.js";

const purchaseRouter: Router = Router()

purchaseRouter.post('/purchase/pos', validateSchemaMiddleware(PosPurchaseSchema), newPurchase)


export default purchaseRouter