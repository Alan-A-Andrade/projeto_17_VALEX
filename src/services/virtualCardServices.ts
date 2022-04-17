import * as cardServices from "./cardServices.js"
import * as hashUtils from "../utils/hashUtils.js";
import * as financeUtils from "../utils/financeUtils.js"
import * as cardRepository from "../repositories/cardRepository.js"

export async function createNewVirtualCard(originalCardId: number, password: string) {

  const originalCard = await cardServices.findCardById(originalCardId)

  if (!originalCard.password) {
    throw { type: "Bad_Request" };
  }

  if (!hashUtils.compareHashData(password, originalCard.password)) {
    throw { type: "Unauthorized" };
  }

  const virtualCardData: cardRepository.CardInsertData = financeUtils.generateVirtualCardInformation(originalCard)

  const virtualCardReturn = {
    cardholderName: virtualCardData.cardholderName,
    number: virtualCardData.number,
    securityCode: virtualCardData.securityCode,
    expirationDate: virtualCardData.expirationDate
  }

  virtualCardData.securityCode = hashUtils.createHashData(virtualCardData.securityCode)

  await cardRepository.insert(virtualCardData)

  return virtualCardReturn

}

export async function deleteVirtualCard(cardId: number, password: string) {

  const card = await cardServices.findCardById(cardId)

  if (!card.isVirtual) {
    throw { type: "Bad_Request" };
  }

  if (!hashUtils.compareHashData(password, card.password)) {
    throw { type: "Unauthorized" };
  }

  await cardRepository.remove(cardId)

}