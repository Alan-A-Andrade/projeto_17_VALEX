import * as purchaseServices from "../services/purchaseServices.js"
import { Request, Response } from "express";


export async function newPurchase(req: Request, res: Response) {

  const { cardId, password, businessId, amount } = req.body

  await purchaseServices.purchaseOrder(cardId, password, businessId, amount)

  res.sendStatus(200)

}