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

const yappyClient = yappy.createClient(
  "6f8bd0f8-cadd-4c38-9eae-3341d3abeeca",
  "QkdfbjVRbTJub21NajFGTDdyRUh1ZWUuM0FkVWdXQmc2SEhRb0Q4V1pQdXdJZkpqOGJrNzBiU1BPeXZubHJxdA=="
);

app.get(
  "/pagosbgurl",
  async (req: Request<any, any, PagosBgUrlBody, any>, res: Response) => {
    const payment= {
      total: 20.17,
      subtotal: 20.00,
      shipping: 0.00,
      discount: 0.00,
      taxes: 0.17,
      orderId: '1234',
      successUrl: 'https://yappymicroservicio.phoenixtechsa.com',
      failUrl: 'https://yappymicroservicio.phoenixtechsa.com',
      tel: '61122345',
      domain: 'https://yappymicroservicio.phoenixtechsa.com',
    }

      
    const response = await yappyClient.getPaymentUrl(payment);
    if (!response.success) {
      res.status(500).send(response);
    } else {
      res.send(response);
    }
  }
);

app.post(
  "/pagosbg",
  (req: Request<any, any, any, ValidatorParams>, res: Response) => {
    const success = yappyClient.validateHash(req.query);
    if (success) {
      //Your bussiness logic
      fs.writeFile('nombre-archivo.txt', 'Contenido del archivo', function (err) {
        if (err) throw err;
        console.log('Archivo creado exitosamente');
      });
      
    }
  }
);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));
