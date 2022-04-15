export function sumValueByKey(array: any[], key: string) {

  const keyValues = array.map(el => el[key])

  return keyValues.reduce((current: number, sum: number) => sum + current, 0);
}