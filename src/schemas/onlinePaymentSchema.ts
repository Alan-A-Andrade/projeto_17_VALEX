import joi from "joi"

const onlinePaymentSchema = joi.object({
  cardholderName: joi.string().required(),
  securityCode: joi.string().required(),
  expirationDate: joi.string().required().pattern(/^[0-9]{2}\/[0-9]{4}$/),
  number: joi.string().required(),
  businessId: joi.number().required(),
  amount: joi.number().required()
});

export default onlinePaymentSchema;