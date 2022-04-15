import * as services from "../services/services.js";
import { Request, Response } from "express";



export async function createNewCard(req: Request, res: Response) {

  const { employeeId, cardType } = req.body

  const card = await services.createNewCard(employeeId, cardType)

  res.status(201).send(card)

}