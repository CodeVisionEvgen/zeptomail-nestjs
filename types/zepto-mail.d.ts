declare module "zeptomail" {
  interface SendMailClientOptions {
    url: string;
    token: string;
  }

  export class SendMailClient {
    constructor(options: SendMailClientOptions);
    sendMail(message: Message): Promise<DataSendMessageResult>;
  }
  export interface Message {
    from: From;
    to: To[];
    reply_to?: ReplyTo[];
    subject: string;
    textbody?: string;
    htmlbody?: string;
    cc?: Cc[];
    bcc?: Bcc[];
    track_clicks?: boolean;
    track_opens?: boolean;
    client_reference?: string;
    mime_headers?: MimeHeaders;
    attachments?: Attachment[];
    inline_images?: InlineImage[];
  }

  export interface From {
    address: string;
    name: string;
  }

  export interface To {
    email_address: EmailAddress;
  }

  export interface EmailAddress {
    address: string;
    name: string;
  }

  export interface ReplyTo {
    address: string;
    name: string;
  }

  export interface Cc {
    email_address: EmailAddress;
  }

  export interface Bcc {
    email_address: EmailAddress;
  }

  export interface MimeHeaders {
    "X-Zylker-User": string;
  }

  export interface Attachment {
    content?: string;
    mime_type?: string;
    name: string;
    file_cache_key?: string;
  }

  export interface InlineImage {
    mime_type?: string;
    content?: string;
    cid: string;
    file_cache_key?: string;
  }

  export interface SendMessageResult {
    data: DataSendMessageResult[];
    message: string;
    request_id: string;
    object: string;
  }

  export interface DataSendMessageResult {
    code: string;
    additional_info: any[];
    message: string;
  }
}
