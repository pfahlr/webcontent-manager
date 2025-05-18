import {
  Roarr as log,
} from 'roarr';


const LOGLEV_TRACE = 10;
const LOGLEV_DEBUG = 20;
const LOGLEV_INFO = 30;
const LOGLEV_WARN = 40;
const LOGLEV_ERROR = 50;
const LOGLEV_FATAL = 60;
const LOGLEV = LOGLEV_TRACE;

//override for browser
globalThis.ROARR.write = (message) => {
  const payload = JSON.parse(message);
  if (payload.context.logLevel >= LOGLEV) {
    console.log(payload);
  }
}

log.print_data = function(data, level) {
  if(level >= LOGLEV)
    console.log(data)
}

log.trace_data = function(data) { 
  log.print_data(data, 10); 
}
log.debug_data = function(data) {
  log.print_data(data, 20);
}
log.info_data = function(data) { 
  log.print_data(data, 30); 
}
log.warn_data = function(data) {
  log.print_data(data, 40);
}
log.error_data = function(data) { 
  log.print_data(data, 50); 
}
log.fatal_data = function(data) {
  log.print_data(data, 60);
}


export default log;