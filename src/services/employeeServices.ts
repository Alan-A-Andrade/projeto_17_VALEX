import * as employeeRepository from "../repositories/employeeRepository.js";

export async function findEmployeeById(employeeId: number) {

  const employeeData: employeeRepository.Employee = await employeeRepository.findById(employeeId)

  if (!employeeData) {
    throw { type: "Not_Found" };
  }

  return employeeData
}