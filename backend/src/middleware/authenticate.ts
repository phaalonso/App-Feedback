import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';

const extractToken = (req: Request) => {
  const authorization = req.headers.authorization || ''
  return authorization.replace('Bearer ', '')
}

export default {
  validate(req: Request, res: Response, next: NextFunction) {
    const token = extractToken(req);

    if (!token) {
	  return res.status(401).json({ 
		  auth: false, message: "No token provided." 
	  });
	}
	
    try {
      jwt.verify(token, process.env.TOKEN_ACESSO as jwt.Secret);
      return next();
    } catch (err) {
      if (err instanceof jwt.TokenExpiredError) {
        return res
          .status(401)
          .json({ auth: false, message: "The session ended." });
      }

		console.error(err);
    }
	  return res.status(500).json({ 
		  auth: false, message: "Failed to authenticate token." 
	  });
  },
};
