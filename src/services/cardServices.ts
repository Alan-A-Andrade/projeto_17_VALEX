import * as cardRepository from "../repositories/cardRepository.js"
import * as paymentRepository from "../repositories/paymentRepository.js"
import * as rechargeRepository from "../repositories/rechargeRepository.js"
import * as employeeServices from "./employeeServices.js"
import * as hashUtils from "../utils/hashUtils.js";
import * as financeUtils from "../utils/financeUtils.js"

async function checkUniqueCardTypeByEmployee(
  employeeId: number,
  cardType: cardRepository.TransactionTypes
) {

  const cardData = await cardRepository.findByTypeAndEmployeeId(cardType, employeeId)

  if (cardData) {
    throw { type: "Unprocessable_Entity" };
  }
}

export async function createNewCard(
  employeeId: number,
  cardType: cardRepository.TransactionTypes
) {

  const employee = await employeeServices.findEmployeeById(employeeId)

  await checkUniqueCardTypeByEmployee(employeeId, cardType)

  const cardData = financeUtils.generateCardInformation(employee.id, employee.fullName, cardType)

  const cardDataReturn = {
    cardholderName: cardData.cardholderName,
    number: cardData.number,
    securityCode: cardData.securityCode,
    expirationDate: cardData.expirationDate
  }

  cardData.securityCode = hashUtils.createHashData(cardData.securityCode)

  await cardRepository.insert(cardData)

  return cardDataReturn

}

export async function findCardById(
  cardId: number
) {

  const cardData: cardRepository.Card = await cardRepository.findById(cardId)

  if (!cardData) {
    throw { type: "Not_Found" };
  }

  return cardData

}

export async function findCardByDetails(
  number: string,
  cardholderName: string,
  expirationDate: string) {
  const cardData: cardRepository.Card = await cardRepository.findByCardDetails(number, cardholderName, expirationDate)

  if (!cardData) {
    throw { type: "Not_Found" };
  }

  return cardData

}

export async function activateCard(
  cardId: number,
  securityCode: string,
  password: string
) {

  const card: cardRepository.Card = await findCardById(cardId)

  if (card.isVirtual) {
    throw {
      type: "Bad_Request",
      message: "Only non virtual cards can be activated"
    };
  }

  if (card.password) {
    throw {
      type: "Conflict",
      message: "Card is already activate"
    };
  }

  if (financeUtils.isExpired(card.expirationDate)) {
    throw {
      type: "Conflict",
      message: "Card has expired"
    };
  }

  if (!hashUtils.compareHashData(securityCode, card.securityCode)) {
    throw {
      type: "Unauthorized"
    };
  }

  card.password = hashUtils.createHashData(password)

  await cardRepository.update(cardId, card)

}

export const cardPasswordPattern = /^[0-9]{4}$/

export async function getBalance(
  cardId: number
) {

  const card = await findCardById(cardId)

  let id = card.id

  if (card.isVirtual) {

    id = card.originalCardId
  }

  const transaction = await paymentRepository.findByCardId(id)

  const recharges = await rechargeRepository.findByCardId(id)

  const totalTransaction: number = financeUtils.sumValueByKey(transaction, "amount")

  const totalRecharge: number = financeUtils.sumValueByKey(recharges, "amount")

  const balance: number = totalRecharge - totalTransaction

  return {
    balance,
    transaction,
    recharges
  }

}

export async function rechargeCard(
  cardId: number,
  rechargeAmount: number
) {

  const card = await findCardById(cardId)

  if (card.isVirtual) {
    throw { type: "Bad_Request", message: "Only non virtual cards can be recharged" };
  }

  if (rechargeAmount <= 0) {
    throw { type: "Unprocessable_Entity", message: "Recharge amount must be greater than 0" };
  }

  const rechargeData = { cardId, amount: rechargeAmount }

  await rechargeRepository.insert(rechargeData)

}

export async function blockCard(
  cardId: number,
  password: string
) {

  const card = await findCardById(cardId)

  if (card.isBlocked) {
    throw { type: "Conflict", message: "Card is already blocked" };
  }

  if (financeUtils.isExpired(card.expirationDate)) {
    throw { type: "Conflict", message: "Card has expired" };
  }

  if (!hashUtils.compareHashData(password, card.password)) {
    throw { type: "Unauthorized" };
  }

  card.isBlocked = true

  await cardRepository.update(cardId, card)

}

export async function unblockCard(
  cardId: number,
  password: string
) {

  const card = await findCardById(cardId)

  if (!card.isBlocked) {
    throw { type: "Conflict", message: "Card is already unblocked" };
  }

  if (financeUtils.isExpired(card.expirationDate)) {
    throw { type: "Conflict", message: "Card has expired" };
  }

  if (!hashUtils.compareHashData(password, card.password)) {
    throw { type: "Unauthorized" };
  }

  card.isBlocked = false

  await cardRepository.update(cardId, card)

}
