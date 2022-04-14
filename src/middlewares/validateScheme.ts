import { NextFunction, Request, Response } from "express";
import { Schema } from "joi";

export function validateSchemaMiddleware(schema: Schema) {
  return (req: Request, response: Response, next: NextFunction) => {
    const validation = schema.validate(req.body);
    if (validation.error) {
      throw { type: "Bad_Request", message: "invalid request format" };
    }
    next();
  }
}