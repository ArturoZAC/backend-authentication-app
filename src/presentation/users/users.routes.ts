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
    router.post('/', usersController.createUser ); // register
    /* router.post('/login', usersController.loginUser );  */// login
    router.get('/:id', usersController.getOneUser);
    router.delete('/:id', usersController.deleteOneUser);
    router.put('/:id', usersController.updateUser );
    return router;
  }

}