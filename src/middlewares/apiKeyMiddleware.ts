import { Request, Response, NextFunction } from "express";
import { findByApiKey } from "../repositories/companyRepository.js";

export async function validateApiKey(req: Request, res: Response, next: NextFunction) {

  const apiKey = req.headers["x-api-key"] as string

  if (!apiKey) {
    throw { type: "Bad_Request", message: "missing API Key at Headers Config" };
  }

  const companyData = await findByApiKey(`${apiKey}`)

  if (!companyData) {
    throw { type: "Unauthorized", message: "Unauthorized API Key" };
  }

  res.locals.company = companyData

  next();
}