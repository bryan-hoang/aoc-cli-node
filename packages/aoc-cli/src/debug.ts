import consola from 'consola';
import createDebug from 'debug';

export const debugLog = createDebug('aoc');
debugLog.log = consola.debug;
