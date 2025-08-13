import { Request, Response } from "express";
import { CreateUserDto, LoginUserDto, UpdateUserDto } from "../../domain/dtos";
import { CreateUser, CustomError, DeleteOneUser, GetAllUsers, GetOneUser, LoginUser, UpdateUser, UserRepository } from "../../domain";

export class UsersController {

  public constructor(
    private readonly userRepository: UserRepository
  ){}

  private handleError = ( error: unknown, res: Response ) => {
    if ( error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message });
    }

    return res.status(500).json({error: 'Internal Server Error'});
  }

  public getAllUsers = ( req: Request, res: Response ) => {
    new GetAllUsers( this.userRepository )
      .execute()
      .then( users => res.status(200).json(users))
      .catch( error => this.handleError(error, res))
  }

  public createUser = (req: Request, res: Response ) => {
    const [ error, createUserDto ] = CreateUserDto.created(req.body);
    if( error ) return res.status(400).json({ error });

    new CreateUser( this.userRepository )
      .execute(createUserDto!)
      .then( user => res.status(201).json(user))
      .catch( error => this.handleError(error, res));
  }

  // public loginUser = (req: Request, res: Response ) => {
  //   const [ error, loginUserDto ] = LoginUserDto.logged(req.body);
  //   if( error ) return res.status(400).json({error});

  //   new LoginUser( this.userRepository )
  //     .execute(loginUserDto!)
  //     .then( userLogged => res.status(200).json(userLogged))
  //     .catch( error => this.handleError(error, res));
  // }

  public getOneUser = ( req: Request, res: Response ) => {
    const { id } = req.params;
    new GetOneUser( this.userRepository)
      .execute(id!)
      .then( user => res.status(200).json(user))
      .catch( error => this.handleError(error, res))
  }

  public deleteOneUser = ( req: Request, res: Response ) => {
    const { id } = req.params;
    new DeleteOneUser(this.userRepository)
      .execute(id!)
      .then( user => res.status(200).json(user))
      .catch( error => this.handleError(error,res));
  }

  public updateUser = (req: Request, res: Response ) => {
    const { id } = req.params;
    const [ error, updatedUserDto ] = UpdateUserDto.updated({ ...req.body, id });
    if( error ) return res.status(400).json({ error });

    new UpdateUser( this.userRepository )
      .execute(updatedUserDto!)
      .then( user => res.status(200).json(user))
      .catch( error => this.handleError(error, res))
  }


}