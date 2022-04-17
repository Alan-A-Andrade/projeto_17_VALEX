import { Router } from "express";
import validateSchemaMiddleware from "../middlewares/validateSchemaMiddleware.js";
import * as paymentsController from "../controllers/paymentsController.js";
import * as schemas from "../schemas/index.js"

const paymentRouter: Router = Router()

paymentRouter.post(
  '/payment/pos',
  validateSchemaMiddleware(schemas.posPaymentSchema),
  paymentsController.posPayment
)

paymentRouter.post(
  '/payment/online',
  validateSchemaMiddleware(schemas.onlinePaymentSchema),
  paymentsController.onlinePayment
)


export default paymentRouter