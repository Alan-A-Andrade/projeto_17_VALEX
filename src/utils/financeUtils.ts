import * as cardRepository from "../repositories/cardRepository.js"
import { faker } from '@faker-js/faker';
import { default as dayjs } from 'dayjs'


export function sumValueByKey(array: any[], key: string): number {

  const keyValues: any[] = array.map(el => el[key])

  return keyValues.reduce((current: number, sum: number) => sum + current, 0);
}

export function generateCardInformation(

  employeeId: number,
  employeeName: string,
  cardType: cardRepository.TransactionTypes

): cardRepository.CardInsertData {

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

export function generateVirtualCardInformation(originalCard: cardRepository.Card): cardRepository.CardInsertData {

  const { employeeId, cardholderName, password, type, id } = originalCard


  //As Faker random credit card number can generate a wrong starting number for masterCard, this assures will start with 5

  let check: boolean = false
  let num: string = ""
  do {
    num = faker.finance.creditCardNumber('mastercard')
    check = num[0] === "5"
  } while (!check)

  const number: string = num

  const securityCode: string = faker.finance.creditCardCVV()

  const expirationDate: string = generateExpirationDate()

  return {
    employeeId,
    number,
    cardholderName,
    securityCode,
    expirationDate,
    password,
    isVirtual: true,
    originalCardId: id,
    isBlocked: false,
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

export function isExpired(date: string): boolean {

  const dateFormat = date.split("/")

  const isExpired = dayjs(`${dateFormat[0]}/31/${dateFormat[1]}`).isBefore(dayjs(Date.now()))

  return isExpired
}