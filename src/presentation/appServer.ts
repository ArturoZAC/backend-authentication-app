import express, { Router } from "express";
import cors from "cors";

export class AppServer {
  private app = express();

  public constructor(
    private readonly port: number,
    private readonly routes: Router
  ) {}

  public async start() {
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(this.routes);
    this.app.listen(this.port, () => {
      console.log(`Server runnning on port: ${this.port} 🚀`);
    });
  }
}
