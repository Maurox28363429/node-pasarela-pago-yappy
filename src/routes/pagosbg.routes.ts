import { Application } from "express";
import { Request } from "express";
import { ValidatorParams } from "yappy-node-back-sdk/dist/types/common/main";
import PagosBgController from "../controllers/pagosbg.controller.js";

export class PagosBgRoutes {
  public pagosbg: PagosBgController = new PagosBgController();

  public routes(app: Application): void {
    app
      .route("/pagosbgurl")
      .post((req, res) => this.pagosbg.getUrl(req, res));

    app
      .route("/pagosbg")
      .get((req: Request<any, any, any, ValidatorParams>, res) =>
        this.pagosbg.updateOrderStatus(req, res)
      );
  }
}
