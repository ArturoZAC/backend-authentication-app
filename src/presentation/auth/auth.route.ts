import { Router } from "express"
import { AuthController } from "./auth.controller";
import { UserDatasourceImpl, UserRepositoryImpl } from "../../infrastructure";
import { EmailRepositoryImpl } from "../../infrastructure/repositories/email.repository.impl";
import { EmailDatasourceImpl } from "../../infrastructure/datasource/email.datasource.impl";

export class AuthRoutes {

  public static routes = () => {
    const router = Router();

    const emailDatasource = new EmailDatasourceImpl();
    const emailRepository = new EmailRepositoryImpl(emailDatasource);
    const userDatasource = new UserDatasourceImpl();
    const userRepository = new UserRepositoryImpl(userDatasource);
    const authController = new AuthController(userRepository, emailRepository);

    router.post('/login', authController.login);
    router.post('/register', authController.register);

    return router;
  }

}