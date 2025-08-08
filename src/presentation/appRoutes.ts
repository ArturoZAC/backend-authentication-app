import { Router } from "express"
import { UsersRoutes } from "./users/users.routes";

export class AppRouter {

  public static routes = () => {
    const router = Router();
    router.use('/api/users', UsersRoutes.routes() )
    return router;
  }

}