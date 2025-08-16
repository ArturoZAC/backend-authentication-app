import { Request, Response } from 'express';
import { UserRepository } from '../../domain/repositories/user.repository';
import { CustomError, LoginUser, LoginUserDto, RegisterUser, RegisterUserDto } from '../../domain';
import { EmailRepository } from '../../domain/repositories/email.repository';
import { CodeRepository } from '../../domain/repositories/code.repository';

export class AuthController {

  constructor(
    private readonly userRepository: UserRepository,
    private readonly emailRepository: EmailRepository,
    private readonly codeRepository: CodeRepository,
  ){}

  private handleError = ( error: unknown, res: Response ) => {
    if ( error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message });
    }

    return res.status(500).json({error: 'Internal Server Error'});
  }

  public login = ( req: Request, res: Response) => {
    const [ error, loginUserDto ] = LoginUserDto.login(req.body);
    if ( error ) return res.status(400).json({error})

    new LoginUser( this.userRepository )
      .execute(loginUserDto!)
      .then( user => res.status(200).json(user))
      .catch( error => this.handleError(error, res))
  }

  public register = ( req: Request, res: Response) => {
    const { frontBaseUrl } = req.body;
    const [error, registerUserDto] = RegisterUserDto.created( req.body );
    if ( error ) return res.status(400).json({error});

    new RegisterUser(this.userRepository, this.emailRepository, this.codeRepository)
      .execute( registerUserDto!, frontBaseUrl ) 
      .then( user => res.status(201).json(user))
      .catch( error => this.handleError(error,res))
  }

}