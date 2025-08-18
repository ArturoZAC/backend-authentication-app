import { Router } from "express"
import { UsersController } from "./users.controller";
import { UserDatasourceImpl, UserRepositoryImpl } from "../../infrastructure";
import { AuthMiddleware } from "../middlewares/auth.middleware";

export class UsersRoutes {

  public static routes = () => {
    
    const userDatasource = new UserDatasourceImpl();
    const userRepository = new UserRepositoryImpl(userDatasource);
    const usersController = new UsersController(userRepository);
    const authMiddleware = new AuthMiddleware(userRepository);

    const router = Router();
    router.get('/', [authMiddleware.validateJWT], usersController.getAllUsers );
    router.post('/', usersController.createUser);
    router.get('/:id', usersController.getOneUser);
    router.delete('/:id', usersController.deleteOneUser);
    router.put('/:id', usersController.updateUser );
    return router;
  }

}