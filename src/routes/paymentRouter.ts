import { Router } from "express";
import validateSchemaMiddleware from "../middlewares/validateSchemaMiddleware.js";
import posPaymentSchema from "../schemas/posPaymentSchema.js";
import onlinePaymentSchema from "../schemas/onlinePaymentSchema.js";
import { posPayment, onlinePayment } from "../controllers/paymentsController.js";

const paymentRouter: Router = Router()

paymentRouter.post('/payment/pos', validateSchemaMiddleware(posPaymentSchema), posPayment)
paymentRouter.post('/payment/online', validateSchemaMiddleware(onlinePaymentSchema), onlinePayment)


export default paymentRouter