import { Request, Response } from "express";
import { YappyPayment } from "yappy-node-back-sdk";
import {
  PagosBgUrlBody,
  PaymentInfo,
  ValidatorParams,
} from "yappy-node-back-sdk/dist/types/common/main";
import * as yappy from "yappy-node-back-sdk";

export default class PagosBgController {
  private yappyClient: YappyPayment;

  constructor() {
    this.yappyClient = yappy.createClient(
      "6f8bd0f8-cadd-4c38-9eae-3341d3abeeca",
      "QkdfbjVRbTJub21NajFGTDdyRUh1ZWUuM0FkVWdXQmc2SEhRb0Q4V1pQdXdJZkpqOGJrNzBiU1BPeXZubHJxdA=="
    );
  }

  public async getUrl(
    req: Request<any, any, PagosBgUrlBody, any>,
    res: Response
  ) {
    const response = await this.yappyClient.getPaymentUrl(req.body, false);
    if (!response.success) {
      res.status(401).send(response);
    } else {
      res.send(response);
    }
  }

  public updateOrderStatus(
    req: Request<any, any, any, ValidatorParams>,
    res: Response
  ) {
    const success = this.yappyClient.validateHash(req.query);
    if (success) {
      console.log(req.query);
      res.status(200).send({ succes: success });
    } else {
      res.status(406).send({ succes: success });
    }
  }
}
