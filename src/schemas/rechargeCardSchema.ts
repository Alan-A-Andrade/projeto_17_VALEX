import joi from "joi"

const rechargeCardSchema = joi.object({
  amount: joi.number().required()
});

export default rechargeCardSchema;