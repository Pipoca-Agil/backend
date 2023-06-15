import jwt, { Secret, SignOptions, VerifyOptions } from 'jsonwebtoken';
import 'dotenv/config';
import TokenPayload from '../interfaces/TokenPayload';

const { JWT_SECRET } = process.env;
const JWT_OPTIONS: SignOptions & VerifyOptions = { algorithm: 'HS256', expiresIn: '5d' };

export default class TokenHelper {
  private secret: Secret;

  constructor() {
    this.secret = JWT_SECRET as Secret;
  }

  public createToken(payload: TokenPayload): string {
    const token = jwt.sign(payload, this.secret, JWT_OPTIONS);

    return token;
  }

  public verifyToken(token: string): TokenPayload {
    const payload = jwt.verify(token, this.secret) as TokenPayload;

    return payload;
  }
}