
import * as companyRepository from "../repositories/companyRepository.js";

export async function findCompanyByKey(apiKey: string) {

  const companyData = await companyRepository.findByApiKey(apiKey)

  if (!companyData) {
    throw { type: "Unauthorized" };
  }

  return companyData
}