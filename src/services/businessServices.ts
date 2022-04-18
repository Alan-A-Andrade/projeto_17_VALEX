import * as businessRepository from "../repositories/businessRepository.js"

export async function findBusinessById(businessId: number) {

  const businessData = await businessRepository.findById(businessId)

  if (!businessData) {
    throw { type: "Not_Found" };
  }

  return businessData

}