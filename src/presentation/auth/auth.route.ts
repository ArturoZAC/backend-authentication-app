import { Router } from "express";
import { AuthController } from "./auth.controller";
import { UserDatasourceImpl, UserRepositoryImpl } from "../../infrastructure";
import { EmailRepositoryImpl } from "../../infrastructure/repositories/email.repository.impl";
import { EmailDatasourceImpl } from "../../infrastructure/datasource/email.datasource.impl";
import { CodeDatasourceImpl } from "../../infrastructure/datasource/code.datasource.impl";
import { CodeRepositoryImpl } from "../../infrastructure/repositories/code.repository.impl";
import { AuthMiddleware } from "../middlewares/auth.middleware";

export class AuthRoutes {
  public static routes = () => {
    const router = Router();

    const emailDatasource = new EmailDatasourceImpl();
    const emailRepository = new EmailRepositoryImpl(emailDatasource);
    const codeDatasource = new CodeDatasourceImpl();
    const codeRepository = new CodeRepositoryImpl(codeDatasource);
    const userDatasource = new UserDatasourceImpl();
    const userRepository = new UserRepositoryImpl(userDatasource);
    const authController = new AuthController(
      userRepository,
      emailRepository,
      codeRepository
    );

    const authMiddleware = new AuthMiddleware(userRepository);

    router.post("/login", authController.login);
    router.post("/register", authController.register);
    router.get("/verify/:code", authController.verifyEmail);
    router.post("/reset_password/email", authController.resetPasswordWithEmail);
    router.post("/reset_password/:code", authController.resetPassword);
    router.get(
      "/renew_token",
      [authMiddleware.validateJWT],
      authController.renewToken
    );

    return router;
  };
}
