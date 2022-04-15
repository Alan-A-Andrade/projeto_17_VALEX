import joi from "joi"
import { cardPasswordPattern } from "../services/cardServices.js";

const activateCardSchema = joi.object({
  securityCode: joi.string().required().pattern(/^[0-9]{3}$/),
  password: joi.string().required().pattern(cardPasswordPattern)
});

export default activateCardSchema;