import consola from 'consola';
import createDebug from 'debug';

export const debugLog = createDebug('aoc-client');
debugLog.log = consola.debug;
