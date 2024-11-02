import { Injectable } from "@nestjs/common";
import { SendMailClient, SendMailClientOptions } from "zeptomail";
@Injectable()
export class ZeptomailService extends SendMailClient {
  constructor(options: SendMailClientOptions) {
    super(options);
  }
}
