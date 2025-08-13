import { Router } from "express"
import { UsersRoutes } from "./users/users.routes";
import { AuthRoutes } from "./auth/auth.route";

export class AppRouter {

  public static routes = () => {
    const router = Router();
    router.use('/api/users', UsersRoutes.routes() );
    router.use('/api/auth', AuthRoutes.routes() );
    return router;
  }

}