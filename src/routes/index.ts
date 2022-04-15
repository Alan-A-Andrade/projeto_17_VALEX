import { Router } from "express";
import cardRouter from "./cardsRouter.js";
import purchaseRouter from "./purchaseRouter.js";

const router: Router = Router();

router.use(cardRouter)
router.use(purchaseRouter)

export default router