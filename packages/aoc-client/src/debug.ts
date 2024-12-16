import consola from 'consola';
import createDebug from 'debug';

export const debugLog: createDebug.Debugger = createDebug('aoc-client');
debugLog.log = consola.debug;
