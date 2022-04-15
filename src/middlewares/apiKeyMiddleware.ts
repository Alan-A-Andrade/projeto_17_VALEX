import { Request, Response, NextFunction } from "express";
import { findCompanyByKey } from "../services/services.js";

export async function validateApiKey(req: Request, res: Response, next: NextFunction) {

  const apiKey = req.headers["x-api-key"] as string

  if (!apiKey) {
    throw { type: "Bad_Request", message: "missing API Key at Headers Config" };
  }

  const company = await findCompanyByKey(apiKey)

  res.locals.company = company

  next();
}