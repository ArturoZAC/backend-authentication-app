import { envs } from "./config/envs";
import { AppRouter } from "./presentation/appRoutes";
import { AppServer } from "./presentation/appServer";

function App (){
  const server = new AppServer( envs.PORT,  AppRouter.routes());
  server.start();
}
(() => {
  App();
})();