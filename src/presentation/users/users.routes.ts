import { Router } from "express"
import { UsersController } from "./users.controller";
import { UserDatasourceImpl, UserRepositoryImpl } from "../../infrastructure";

export class UsersRoutes {

  public static routes = () => {
    
    const userDatasource = new UserDatasourceImpl();
    const userRepository = new UserRepositoryImpl(userDatasource);
    const usersController = new UsersController(userRepository);

    const router = Router();
    router.get('/', usersController.getAllUsers );
    router.post('/', usersController.createUser );
    router.put('/:idUser', usersController.updateUser );
    return router;
  }

}