import * as nest from '../lib/logger/nest';
export { setGlobalLogger } from './wrapper';
export { Logger } from './logger';

export * from './wrapper';

export function initLogger() {
  //TODO: add switch case to init log implementation by env config
  nest.initLogger();
}
