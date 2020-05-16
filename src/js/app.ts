import { connectToObs } from "./connection";
import { setupUiHandlers } from "./ui";
import { setupObsHandlers } from "./obs-companion";
import * as ObsWebSocket from "obs-websocket-js";
import { setupClock } from "./clock";
import { setupTimer } from "./presentation";

export const obs = new ObsWebSocket();

$(document).ready(function () {
  setupClock();
  connectToObs();
  setupObsHandlers();
  setupUiHandlers();
  setupTimer();
});
