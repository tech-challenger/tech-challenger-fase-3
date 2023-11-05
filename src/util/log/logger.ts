type Fields = Map<string, any>;

export interface Logger {
  fromContext(context: string): Logger;

  trace(message: any, ...optionalParams: any[]): void;

  debug(message: any, ...optionalParams: any[]): void;

  info(message: any, ...optionalParams: any[]): void;

  warn(message: any, ...optionalParams: any[]): void;

  error(message: any, ...optionalParams: any[]): void;

  withFields(keyValues: Map<string, any>): Logger;

  withField(key: string, value: any): Logger;

  fields(): Fields;
}
