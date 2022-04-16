import * as paymentRepository from "../repositories/paymentRepository.js"
import * as cardServices from "./cardServices.js"
import * as businessServices from "./businessServices.js"
import * as hashUtils from "../utils/hashUtils.js";
import * as financeUtils from "../utils/financeUtils.js"

export async function paymentOrder(cardId: number, password: string, businessId: number, amount: number) {

  const card = await cardServices.findCardById(cardId)

  if (financeUtils.isExpired(card.expirationDate)) {
    throw { type: "Conflict" };
  }

  if (!hashUtils.compareHashData(password, card.password)) {
    throw { type: "Unauthorized" };
  }

  const business = await businessServices.findBusinessById(businessId)

  if (card.type !== business.type) {
    throw { type: "Unauthorized" };
  }

  if (amount <= 0) {
    throw { type: "Unprocessable_Entity" };
  }

  const cardInfo = await cardServices.getBalance(cardId)

  if (cardInfo.balance < amount) {
    throw { type: "Unauthorized" };
  }

  await paymentRepository.insert({ cardId, businessId, amount })

}