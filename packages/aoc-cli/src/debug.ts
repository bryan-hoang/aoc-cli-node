import consola from 'consola';
import createDebug from 'debug';

export const debugLog = createDebug('aoc-cli');
debugLog.log = consola.debug;
