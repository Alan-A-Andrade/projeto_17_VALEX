import joi from "joi"
import { cardPasswordPattern } from "../services/cardServices.js";

const PosPurchaseSchema = joi.object({
  cardId: joi.number().required(),
  password: joi.string().required().pattern(cardPasswordPattern),
  businessId: joi.number().required(),
  amount: joi.number().required()
});

export default PosPurchaseSchema;