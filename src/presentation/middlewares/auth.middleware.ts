import { NextFunction, Request, Response } from "express";
import { JwtAdapter } from "../../config/adapters";
import { UserRepository } from "../../domain";

export class AuthMiddleware {

  public constructor(
    private readonly userRepository: UserRepository,
  ){}

  public validateJWT = async( req: Request, res: Response, next: NextFunction) => {

    const authorization = req.headers.authorization;
    if ( !authorization ) return res.status(401).json({error: 'Token not provided'});
    if ( !authorization.startsWith("Bearer ")) return res.status(401).json({ error: 'Invalid Bearer Token'});

    const token = authorization.split(" ")[1] || '';

    try {
      const payload = await JwtAdapter.verifyJWT<{ id: string }>(token);
      if( !payload ) return res.status(401).json({ error: "Invalid token"});

      // console.log({payload});

      const user = await this.userRepository.findById(payload.id);
      // console.log({user});
      const { password, ...restProperties} = user;

      (req as any).userId = restProperties.id;
      
      next();
    } catch (error) {
      return res.status(500).json({error: 'Internal Server Error'});
    }
  }
}