import joi from "joi"
import { cardPasswordPattern } from "../services/cardServices.js";

const newVirtualCardSchema = joi.object({
  originalCardId: joi.number().required(),
  password: joi.string().required().pattern(cardPasswordPattern),
});

export default newVirtualCardSchema;