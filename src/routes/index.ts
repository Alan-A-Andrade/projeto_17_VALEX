import { Router } from "express";
import cardRouter from "./cardsRouter.js";

const router: Router = Router();

router.use(cardRouter)

export default router