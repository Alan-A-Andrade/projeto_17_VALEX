import joi from "joi"
import { cardPasswordPattern } from "../services/cardServices.js";

const blockCardSchema = joi.object({
  password: joi.string().required().pattern(cardPasswordPattern),
});

export default blockCardSchema;