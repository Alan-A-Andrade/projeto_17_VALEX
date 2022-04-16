import { Router } from "express";
import cardRouter from "./cardsRouter.js";
import paymentRouter from "./paymentRouter.js";

const router: Router = Router();

router.use(cardRouter)
router.use(paymentRouter)

export default router