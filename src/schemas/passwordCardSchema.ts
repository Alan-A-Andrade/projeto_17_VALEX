import joi from "joi"
import { cardPasswordPattern } from "../services/cardServices.js";

const passwordSchema = joi.object({
  password: joi.string().required().pattern(cardPasswordPattern),
});

export default passwordSchema;