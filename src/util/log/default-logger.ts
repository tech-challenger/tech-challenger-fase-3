import { Logger } from './logger';

export class DefaultLogger implements Logger {
  constructor(private readonly context?: string) {}

  fromContext(context: string): Logger {
    return new DefaultLogger(context);
  }

  trace(message: any, ...optionalParams: any[]) {
    console.log(`TRACE ${this.context} ${message}`, ...optionalParams);
  }

  debug(message: any, ...optionalParams: any[]) {
    console.debug(`DEBUG ${this.context} ${message}`, ...optionalParams);
  }
  info(message: any, ...optionalParams: any[]) {
    console.info(`INFO ${this.context} ${message}`, ...optionalParams);
  }
  warn(message: any, ...optionalParams: any[]) {
    console.warn(`WARN ${this.context} ${message}`, ...optionalParams);
  }
  error(message: any, ...optionalParams: any[]) {
    console.error(`ERROR ${this.context} ${message}`, ...optionalParams);
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
