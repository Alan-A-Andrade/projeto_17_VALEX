import * as paymentServices from "../services/paymentServices.js"
import { Request, Response } from "express";


export async function posPayment(req: Request, res: Response) {

  const { cardId, password, businessId, amount } = req.body

  await paymentServices.posPayment(cardId, password, businessId, amount)

  res.sendStatus(200)

}

export async function onlinePayment(req: Request, res: Response) {

  const { securityCode, number, cardholderName, expirationDate, businessId, amount } = req.body

  await paymentServices.onlinePayment(cardholderName, number, securityCode, expirationDate, businessId, amount)

  res.sendStatus(200)

}