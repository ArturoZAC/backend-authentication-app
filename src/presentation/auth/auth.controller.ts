import { Request, Response } from 'express';
import { UserRepository } from '../../domain/repositories/user.repository';

export class AuthController {

  constructor(
    private readonly userRepository: UserRepository
  ){}

  public login = ( req: Request, res: Response) => {
    

  }


}