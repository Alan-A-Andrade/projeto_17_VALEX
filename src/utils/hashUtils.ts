import bcrypt from 'bcrypt';

export function createHashData(sensibleData: string): string {

  const hash = bcrypt.hashSync(sensibleData, 10)

  return hash

}

export function compareHashData(sensibleData: string, hash: string): boolean {

  const result = bcrypt.compareSync(sensibleData, hash)

  return result

}