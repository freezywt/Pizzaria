import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

interface Payload {
  sub: string;
}

export function isAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const authToken = req.headers.authorization;

  if (!authToken) {
    return res.status(401).end();
  }

  const [, token] = authToken.split(" ")

  try {
    const { sub } = verify(
      token,
      '' // generate token in https://www.md5hashgenerator.com/
    ) as Payload;

    req.user_id = sub;

    return next();
  } catch (err) {
    console.log(err)
    return res.status(404).end();
  }
}
