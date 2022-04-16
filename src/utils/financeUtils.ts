import * as cardRepository from "../repositories/cardRepository.js"
import { faker } from '@faker-js/faker';
import { default as dayjs } from 'dayjs'


export function sumValueByKey(array: any[], key: string): number {

  const keyValues: any[] = array.map(el => el[key])

  return keyValues.reduce((current: number, sum: number) => sum + current, 0);
}

export function generateCardInformation(employeeId: number, employeeName: string, cardType: cardRepository.TransactionTypes): cardRepository.CardInsertData {

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

export function isExpired(date: string): boolean {

  const dateFormat = date.split("/")

  const isExpired = dayjs(`${dateFormat[0]}/31/${dateFormat[1]}`).isBefore(dayjs(Date.now()))

  return isExpired
}