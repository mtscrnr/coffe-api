import * as jwt from 'jsonwebtoken';

export type tokenDecoded = {
    _id: string;
    email: string;
    role: string;
}

export default class Token {
    private secret: string;
    private expiresIn: string;

    constructor(
        secret: string = process.env.JWT_SECRET!,
        expiresIn: string = process.env.JWT_EXPIRES_IN!
    ) {
        this.secret = secret
        this.expiresIn = expiresIn
    }

    sign = (payload: object): string => {
        return jwt.sign(payload, this.secret, { expiresIn: this.expiresIn });
    }

    verify = (token: string): object | string => {
        return jwt.verify(token, this.secret);
    }

    decode = (token: string): tokenDecoded | null => {
        const decoded = jwt.decode(token) as tokenDecoded;
        if (!decoded) return null;
        return decoded;
    }
}
