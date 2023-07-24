import express, { Request, Response } from "express";

import cors from "cors";
import * as yappy from "yappy-node-back-sdk";
import dotenv from "dotenv";

import {
  PagosBgUrlBody,
  PaymentInfo,
  ValidatorParams,
} from "yappy-node-back-sdk/dist/types/common/main";
import fs from 'fs';

const app: express.Application = express();
app.use(cors());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

dotenv.config();

app.post(
  "/pagosbgurl",
  async (req: Request, res: Response) => {
    const data = req.body;
    const yappyClient = yappy.createClient(
      data.clientId,
      data.clientSecret
    );
    const payment= {
      total: data.total,
      subtotal: data.subtotal,
      shipping: data.shipping,
      discount: data.discount,
      taxes: data.taxes,
      orderId: data.orderId,
      successUrl: data.successUrl,
      failUrl: data.failUrl,
      tel: data.tel,
      domain: 'https://yappymicroservicio.phoenixtechsa.com',
    }
    console.log(payment)

    const response = await yappyClient.getPaymentUrl(payment);
    if (!response.success) {
      res.status(500).send(response);
    } else {
      res.send(response);
    }
  }
);

/* app.post(
  "/pagosbg",
  (req: Request<any, any, any, ValidatorParams>, res: Response) => {
    const success = yappyClient.validateHash(req.query);
    if (success) {
      //Your bussiness logic
	console.log(success);
    }
  }
); */

const port = 4200;
app.listen(port, () => console.log(`Listening on port ${port}`));
