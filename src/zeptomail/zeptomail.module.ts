import { DynamicModule, Module, Provider } from "@nestjs/common";
import { ZeptomailService } from "./zeptomail.service";
import { SendMailClientOptions } from "zeptomail";
import { ZEPTOMAIL_PROVIDER } from "./zeptomail.config";

@Module({})
export class ZeptomailModule {
  static forRoot(options: SendMailClientOptions & { isGlobal?: boolean }) {
    if (!options.isGlobal) options.isGlobal = false;

    const module: DynamicModule = {
      module: ZeptomailModule,
      providers: [
        {
          provide: ZeptomailService,
          useFactory: () => new ZeptomailService(options),
        },
      ],
      exports: [ZeptomailService],
      global: options.isGlobal,
    };

    return module;
  }

  static forRootAsync(options: {
    useFactory: (
      ...args: any[]
    ) => Promise<SendMailClientOptions> | SendMailClientOptions;
    inject?: any[];
    imports?: any[];
    isGlobal?: boolean;
  }): DynamicModule {
    if (!options.isGlobal) options.isGlobal = false;

    const asyncOptionsProvider: Provider = {
      provide: ZEPTOMAIL_PROVIDER,
      useFactory: options.useFactory,
      inject: options.inject || [],
    };

    const zeptoMailServiceProvider: Provider = {
      provide: ZeptomailService,
      useFactory: (opts: SendMailClientOptions) => new ZeptomailService(opts),
      inject: [ZEPTOMAIL_PROVIDER],
    };

    const dynamicModule: DynamicModule = {
      module: ZeptomailModule,
      providers: [asyncOptionsProvider, zeptoMailServiceProvider],
      exports: [ZeptomailService],
      imports: options.imports || [],
      global: options.isGlobal,
    };

    return dynamicModule;
  }
}
