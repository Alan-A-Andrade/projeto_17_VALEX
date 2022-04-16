import { Router } from "express";
import cardRouter from "./cardsRouter.js";
import paymentRouter from "./paymentRouter.js";
import virtualCardRouter from "./virtualCardsRouter.js";

const router: Router = Router();

router.use(cardRouter)
router.use(paymentRouter)
router.use(virtualCardRouter)

export default router