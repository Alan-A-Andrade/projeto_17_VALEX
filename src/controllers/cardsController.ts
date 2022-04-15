import * as services from "../services/services.js";
import { Request, Response } from "express";



export async function createNewCard(req: Request, res: Response) {

  const { employeeId, cardType } = req.body

  const card = await services.createNewCard(employeeId, cardType)

  res.status(201).send(card)

}

export async function activateCard(req: Request, res: Response) {

  const { id } = req.params

  const { securityCode, password } = req.body

  const cardId: number = parseInt(id)

  await services.activateCard(cardId, securityCode, password)

  res.sendStatus(200)

}

export async function getCardBalance(req: Request, res: Response) {

  const { id } = req.params
  const cardId: number = parseInt(id)

  const data = await services.getBalance(cardId)

  res.status(200).send(data)

}