import * as paymentServices from "../services/paymentServices.js"
import { Request, Response } from "express";


export async function newPayment(req: Request, res: Response) {

  const { cardId, password, businessId, amount } = req.body

  await paymentServices.paymentOrder(cardId, password, businessId, amount)

  res.sendStatus(200)

}