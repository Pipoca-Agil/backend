export type TokenPayload = {
  email: string
};

export default interface ITokenGenerator {
  generate (payload: TokenPayload): string
  verify (token: string): TokenPayload
}