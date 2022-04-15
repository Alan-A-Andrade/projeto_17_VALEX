import { NextFunction, Request, Response } from "express";


export function errorHandlingMiddleware(error, req: Request, res: Response, next: NextFunction) {

  if (!error.message) {
    error.message = "An error as occurred"
  }

  if (error.type === "Bad_Request") return res.status(400).send(error.message);

  if (error.type === "Unauthorized") return res.status(401).send(error.message);

  if (error.type === "Unprocessable_Entity") return res.status(422).send(error.message);

  if (error.type === "Not_Found") return res.status(404).send(error.message);

  if (error.type === "Conflict") return res.status(409).send(error.message);



  return res.sendStatus(500);

}