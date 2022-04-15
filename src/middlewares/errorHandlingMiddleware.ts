import { NextFunction, Request, Response } from "express";


export function errorHandlingMiddleware(error, req: Request, res: Response, next: NextFunction) {

  if (!error.message) {
    error.message = "An error as occurred"
  }

  if (error.type === "Bad_Request") return res.status(400).send(error.message);

  if (error.type === "Unauthorized") return res.status(401).send(error.message);

  if (error.type === "Unprocessable_Entity") return res.status(422).send(error.message);


  return res.sendStatus(500);

}