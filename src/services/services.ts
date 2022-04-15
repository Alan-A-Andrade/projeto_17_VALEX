
import * as companyRepository from "../repositories/companyRepository.js";
import * as employeeRepository from "../repositories/employeeRepository.js";
import * as cardRepository from "../repositories/cardRepository.js"
import { faker } from '@faker-js/faker';
import { default as dayjs } from 'dayjs'
import bcrypt from 'bcrypt';

export async function findCompanyByKey(apiKey: string) {

  const companyData = await companyRepository.findByApiKey(apiKey)

  if (!companyData) {
    throw { type: "Unauthorized" };
  }

  return companyData
}

export async function findEmployeeById(employeeId: number) {

  const employeeData: employeeRepository.Employee = await employeeRepository.findById(employeeId)

  if (!employeeData) {
    throw { type: "Unprocessable_Entity" };
  }

  return employeeData
}

export async function checkUniqueCardTypeByEmployee(employeeId: number, cardType: cardRepository.TransactionTypes) {

  const cardData = await cardRepository.findByTypeAndEmployeeId(cardType, employeeId)

  if (cardData) {
    throw { type: "Unprocessable_Entity" };
  }
}

export function generateCardInformation(employeeId: number, employeeName: string, cardType: cardRepository.TransactionTypes): cardRepository.CardInsertData {

  const cardholderName: string = generateCardHolderName(employeeName)

  const number: string = faker.finance.creditCardNumber('Mastercard')

  const securityCode: string = faker.finance.creditCardCVV()

  const expirationDate: string = generateExpirationDate()

  const type = cardType

  const isBlocked: boolean = true

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

function createHashData(sensibleData: string): string {

  const hash = bcrypt.hashSync(sensibleData, 10)

  return hash

}

function compareHashData(sensibleData: string, hash: string): boolean {

  const result = bcrypt.compareSync(sensibleData, hash)

  return result

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