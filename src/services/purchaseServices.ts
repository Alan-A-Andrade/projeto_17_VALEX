import * as companyRepository from "../repositories/companyRepository.js";
import * as employeeRepository from "../repositories/employeeRepository.js";
import * as cardRepository from "../repositories/cardRepository.js"
import * as paymentRepository from "../repositories/paymentRepository.js"
import * as rechargeRepository from "../repositories/rechargeRepository.js"
import * as businessRepository from "../repositories/businessRepository.js"

import { createHashData, compareHashData } from "../utils/hashUtils.js";
import * as cardServices from "./cardServices.js"

export async function purchaseOrder(cardId: number, password: string, businessId: number, amount: number) {

  const card = await cardServices.findCardById(cardId)

  if (cardServices.isCardExpired(card.expirationDate)) {
    throw { type: "Conflict" };
  }

  if (!compareHashData(password, card.password)) {
    throw { type: "Unauthorized" };
  }

  const business = await businessRepository.findById(businessId)

  if (!business) {
    throw { type: "Unprocessable_Entity" };
  }

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