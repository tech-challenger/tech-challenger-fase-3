import { Logger as NestLogger } from '@nestjs/common';
import { setGlobalLogger, Logger } from '../../../log';

class WrapperLogger implements Logger {
  private readonly logger: NestLogger;
  constructor(context?: string) {
    this.logger = new NestLogger(context);
  }

  fromContext(context: string): Logger {
    return new WrapperLogger(context);
  }

  trace(message: any, ...optionalParams: any[]) {
    throw new Error('Method not implemented.');
  }

  debug(message: any, ...optionalParams: any[]) {
    this.logger.debug(message, ...optionalParams);
  }
  info(message: any, ...optionalParams: any[]) {
    this.logger.log(message, ...optionalParams);
  }
  warn(message: any, ...optionalParams: any[]) {
    this.logger.warn(message, ...optionalParams);
  }
  error(message: any, ...optionalParams: any[]) {
    this.logger.warn(message, ...optionalParams);
  }
  withFields(keyValues: Map<string, any>): Logger {
    throw new Error('Method not implemented.');
  }
  withField(key: string, value: any): Logger {
    throw new Error('Method not implemented.');
  }
  fields(): Map<string, any> {
    throw new Error('Method not implemented.');
  }
}

export function initLogger() {
  const l = new WrapperLogger();
  setGlobalLogger(l);
}
