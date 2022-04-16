import * as paymentRepository from "../repositories/paymentRepository.js"
import * as cardServices from "./cardServices.js"
import * as businessServices from "./businessServices.js"
import * as hashUtils from "../utils/hashUtils.js";
import * as financeUtils from "../utils/financeUtils.js"

export async function posPayment(
  cardId: number,
  password: string,
  businessId: number,
  amount: number
) {

  const card = await cardServices.findCardById(cardId)

  if (card.isVirtual) {
    throw { type: "Bad_Request" };
  }

  if (financeUtils.isExpired(card.expirationDate)) {
    throw { type: "Conflict" };
  }

  if (!hashUtils.compareHashData(password, card.password)) {
    throw { type: "Unauthorized" };
  }


  if (card.isBlocked) {
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

export async function onlinePayment(
  cardholderName: string,
  number: string,
  securityCode: string,
  expirationDate: string,
  businessId: number,
  amount: number
) {

  const card = await cardServices.findCardByDetails(number, cardholderName, expirationDate)

  if (card.isVirtual) {
    card.id = card.originalCardId
  }

  if (financeUtils.isExpired(card.expirationDate)) {
    throw { type: "Conflict" };
  }

  if (!hashUtils.compareHashData(securityCode, card.securityCode)) {
    throw { type: "Unauthorized" };
  }

  if (card.isBlocked) {
    throw { type: "Unauthorized" };
  }

  const business = await businessServices.findBusinessById(businessId)

  if (card.type !== business.type) {
    throw { type: "Unauthorized" };
  }

  if (amount <= 0) {
    throw { type: "Unprocessable_Entity" };
  }

  const cardInfo = await cardServices.getBalance(card.id)

  if (cardInfo.balance < amount) {
    throw { type: "Unauthorized" };
  }

  await paymentRepository.insert({ cardId: card.id, businessId, amount })

}