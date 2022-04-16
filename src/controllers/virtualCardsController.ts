import * as virtualCardServices from "../services/virtualCardServices.js";
import { Request, Response } from "express";

export async function createNewVirtualCard(req: Request, res: Response) {

  const { originalCardId, password } = req.body

  const id = parseInt(originalCardId)

  const card = await virtualCardServices.createNewVirtualCard(id, password)

  res.status(201).send(card)

}

export async function deleteVirtualCard(req: Request, res: Response) {


  const { password } = req.body

  const { id } = req.params

  const cardId = parseInt(id)

  await virtualCardServices.deleteVirtualCard(cardId, password)

  res.sendStatus(200)

}