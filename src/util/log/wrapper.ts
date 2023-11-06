import { DefaultLogger } from './default-logger';
import { Logger } from './logger';

let l = new DefaultLogger();

export function setGlobalLogger(logger: Logger) {
  l = logger;
}

export function fromContext(context: string) {
  return l.fromContext(context);
}

export function trace(message: any, ...optionalParams: any[]) {
  return l.trace(message, ...optionalParams);
}

export function debug(message: any, ...optionalParams: any[]) {
  return l.debug(message, ...optionalParams);
}

export function info(message: any, ...optionalParams: any[]) {
  return l.info(message, ...optionalParams);
}

export function warn(message: any, ...optionalParams: any[]) {
  return l.warn(message, ...optionalParams);
}

export function error(message: any, ...optionalParams: any[]) {
  return l.error(message, ...optionalParams);
}

export function withFields(keyValues: Map<string, any>) {
  return l.withFields(keyValues);
}

export function WithField(key: string, value: any) {
  return l.withField(key, value);
}
