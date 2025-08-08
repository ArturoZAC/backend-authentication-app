import express, { Router } from 'express'

export class AppServer {

  private app = express();

  public constructor(
    private readonly port: number,
    private readonly routes: Router,
  ){}

  public async start() {

    this.app.use( express.json() );
    this.app.use( express.urlencoded() );
    this.app.use( this.routes );
    this.app.listen( this.port, () => {
      console.log(`Server runnning on port: ${this.port}`);
    })
  }

}