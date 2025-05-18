import {
  logger,
  consoleTransport,
  fileAsyncTransport,
} from "react-native-logs";
import RNFS from "react-native-fs";

var log = logger.createLogger({
  transport: __DEV__ ? consoleTransport : fileAsyncTransport,
  severity: __DEV__ ? "debug" : "error",
  transportOptions: {
    colors: {
      info: "blueBright",
      warn: "yellowBright",
      error: "redBright",
    },
    FS: RNFS,
  },
});

export default log;