
import * as companyRepository from "../repositories/companyRepository.js";
import * as employeeRepository from "../repositories/employeeRepository.js";
import * as cardRepository from "../repositories/cardRepository.js"
import * as paymentRepository from "../repositories/paymentRepository.js"
import * as rechargeRepository from "../repositories/rechargeRepository.js"
import { createHashData, compareHashData } from "../utils/hashUtils.js";
import { sumValueByKey } from "../utils/financeUtils.js";
import { faker } from '@faker-js/faker';
import { default as dayjs } from 'dayjs'

export async function findCompanyByKey(apiKey: string) {

  const companyData = await companyRepository.findByApiKey(apiKey)

  if (!companyData) {
    throw { type: "Unauthorized" };
  }

  return companyData
}

async function findEmployeeById(employeeId: number) {

  const employeeData: employeeRepository.Employee = await employeeRepository.findById(employeeId)

  if (!employeeData) {
    throw { type: "Not_Found" };
  }

  return employeeData
}

async function checkUniqueCardTypeByEmployee(employeeId: number, cardType: cardRepository.TransactionTypes) {

  const cardData = await cardRepository.findByTypeAndEmployeeId(cardType, employeeId)

  if (cardData) {
    throw { type: "Unprocessable_Entity" };
  }
}

function generateCardInformation(employeeId: number, employeeName: string, cardType: cardRepository.TransactionTypes): cardRepository.CardInsertData {

  const cardholderName: string = generateCardHolderName(employeeName)

  const number: string = faker.finance.creditCardNumber('Mastercard')

  const securityCode: string = faker.finance.creditCardCVV()

  const expirationDate: string = generateExpirationDate()

  const type = cardType

  const isBlocked: boolean = false

  return {
    employeeId,
    number,
    cardholderName,
    securityCode,
    expirationDate,
    password: null,
    isVirtual: false,
    originalCardId: null,
    isBlocked,
    type
  }

}

function generateCardHolderName(name: string): string {

  const fullNameArray = name.split(" ")

  const firstName = fullNameArray.shift()

  const lastName = fullNameArray.pop()

  const middleName = fullNameArray.filter(el => el.length >= 3).map(el => el.slice(0, 1))

  const cardHolderName = [firstName, ...middleName, lastName].join(" ").toUpperCase()

  return cardHolderName

}

function generateExpirationDate(): string {

  return dayjs(Date.now()).add(5, 'year').format('MM/YYYY')

}



export async function createNewCard(employeeId: number, cardType: cardRepository.TransactionTypes) {

  const employee: employeeRepository.Employee = await findEmployeeById(employeeId)

  await checkUniqueCardTypeByEmployee(employeeId, cardType)

  const cardData: cardRepository.CardInsertData = generateCardInformation(employee.id, employee.fullName, cardType)

  const cardDataReturn = {
    cardholderName: cardData.cardholderName,
    number: cardData.number,
    securityCode: cardData.securityCode,
    expirationDate: cardData.expirationDate
  }

  cardData.securityCode = createHashData(cardData.securityCode)

  await cardRepository.insert(cardData)

  return cardDataReturn

}

export async function findCardById(cardId: number) {

  const cardData: cardRepository.Card = await cardRepository.findById(cardId)

  if (!cardData) {
    throw { type: "Not_Found" };
  }

  return cardData

}

export function isCardExpired(date: string): boolean {

  const dateFormat = date.split("/")

  const isExpired = dayjs(`${dateFormat[0]}/31/${dateFormat[1]}`).isBefore(dayjs(Date.now()))

  return isExpired
}

export async function activateCard(cardId: number, securityCode: string, password: string) {

  const card = await findCardById(cardId)

  if (card.password) {
    throw { type: "Conflict" };
  }

  if (isCardExpired(card.expirationDate)) {
    throw { type: "Conflict" };
  }

  if (!compareHashData(securityCode, card.securityCode)) {
    throw { type: "Unauthorized" };
  }

  card.password = createHashData(password)

  await cardRepository.update(cardId, card)

}

export const cardPasswordPattern = /^[0-9]{4}$/

export async function getBalance(cardId: number) {

  await findCardById(cardId)

  const transaction = await paymentRepository.findByCardId(cardId)

  const recharges = await rechargeRepository.findByCardId(cardId)

  const totalTransaction: number = sumValueByKey(transaction, "amount")

  const totalRecharge: number = sumValueByKey(recharges, "amount")

  const balance: number = totalRecharge - totalTransaction

  return {
    balance,
    transaction,
    recharges
  }

}

export async function rechargeCard(cardId: number, rechargeAmount: number) {

  await findCardById(cardId)


  if (rechargeAmount <= 0) {
    throw { type: "Unprocessable_Entity" };
  }

  const rechargeData = { cardId, amount: rechargeAmount }

  await rechargeRepository.insert(rechargeData)

}