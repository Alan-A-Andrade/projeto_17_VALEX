import { Router } from "express";
import validateSchemaMiddleware from "../middlewares/validateSchemaMiddleware.js";
import posPaymentSchema from "../schemas/posPaymentSchema.js";
import { newPayment } from "../controllers/paymentsController.js";

const paymentRouter: Router = Router()

paymentRouter.post('/payment/pos', validateSchemaMiddleware(posPaymentSchema), newPayment)


export default paymentRouter