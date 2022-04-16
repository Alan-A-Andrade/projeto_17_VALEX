import * as cardServices from "../services/cardServices.js";
import { Request, Response } from "express";



export async function createNewCard(req: Request, res: Response) {

  const { employeeId, cardType } = req.body

  const card = await cardServices.createNewCard(employeeId, cardType)

  res.status(201).send(card)

}

export async function activateCard(req: Request, res: Response) {

  const { id } = req.params

  const { securityCode, password } = req.body

  const cardId: number = parseInt(id)

  await cardServices.activateCard(cardId, securityCode, password)

  res.sendStatus(200)

}

export async function getCardBalance(req: Request, res: Response) {

  const { id } = req.params
  const cardId: number = parseInt(id)

  const data = await cardServices.getBalance(cardId)

  res.status(200).send(data)

}

export async function rechargeCard(req: Request, res: Response) {

  const { id } = req.params
  const cardId: number = parseInt(id)

  const { amount } = req.body

  await cardServices.rechargeCard(cardId, amount)

  res.sendStatus(200)

}

export async function blockCard(req: Request, res: Response) {

  const { id } = req.params
  const cardId: number = parseInt(id)

  const { password } = req.body

  await cardServices.blockCard(cardId, password)

  res.sendStatus(200)


}

export async function unblockCard(req: Request, res: Response) {

  const { id } = req.params
  const cardId: number = parseInt(id)

  const { password } = req.body

  await cardServices.unblockCard(cardId, password)

  res.sendStatus(200)


}