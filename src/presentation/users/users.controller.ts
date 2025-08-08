import { Request, Response } from "express";
import { CreateUserDto, UpdateUserDto } from "../../domain/dtos";
import { CreateUser, CustomError, GetUsers, UserRepository } from "../../domain";

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
    new GetUsers( this.userRepository )
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

  public updateUser = (req: Request, res: Response ) => {

    const idUser = req.params.idUser;
    const [ error, updatedUserDto ] = UpdateUserDto.updated({ ...req.body, idUser });
    if( error ) return res.status(400).json({ error });

    console.log(updatedUserDto);
    res.status(200).json(updatedUserDto);
  }


}