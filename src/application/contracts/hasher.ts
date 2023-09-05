export default interface IHasher {
  encrypt (password: string): string
  compare (valueToCompare: string, target: string): boolean
}