import { Router } from "express"
import { AuthController } from "./auth.controller";
import { UserDatasourceImpl, UserRepositoryImpl } from "../../infrastructure";

export class AuthRoutes {

  public static routes = () => {
    const router = Router();

    const userDatasource = new UserDatasourceImpl();
    const userRepository = new UserRepositoryImpl(userDatasource);
    const authController = new AuthController(userRepository);

    router.post('/login', authController.login);
    router.post('/register', authController.register);

    return router;
  }

}