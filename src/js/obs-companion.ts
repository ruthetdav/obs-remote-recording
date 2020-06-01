/// <reference types="obs-websocket-js" />
import "bootstrap";
import { getSceneList, getTransitionList, connectToObs } from "./connection";
import {
  updateConnectStatus,
  enableScenario,
  updateScenario,
  updateControlStatus,
  updatePresentationStatus,
} from "./updateUI";
import { getScenario } from "./scenario";
import * as ObsWebSocket from "obs-websocket-js";
import { getControlStatus } from "./control";
import { PresentationStep } from "./model";
import { getPresentationStatus, setPresentationStartTime, updateTimerStatus } from "./presentation";

export const obs = new ObsWebSocket();

export function setupObsHandlers() {
  interface Named {
    name: string;
  }

  obs.on("ConnectionOpened", async () => {
    updateConnectStatus({ connected: true });
    let allScenes = await getSceneList();
    let allTransitions = await getTransitionList();
    updateScenario(getScenario(), allScenes, allTransitions);
    enableScenario(true);
    updateControlStatus(await getControlStatus());
    updatePresentationStatus(await getPresentationStatus());
    updateTimerStatus();
  });

  obs.on("RecordingStarted", async () => {
    updateControlStatus(await getControlStatus());
  });

  obs.on("RecordingStopped", async () => {
    updateControlStatus(await getControlStatus());
  });

  obs.on("StreamStarted", async () => {
    updateControlStatus(await getControlStatus());
  });

  obs.on("StreamStopped", async () => {
    updateControlStatus(await getControlStatus());
  });

  obs.on("SwitchScenes", async (data) => {
    let scenario = getScenario();
    if (data["scene-name"] === scenario.scenes.presentation) {
      setPresentationStartTime(new Date())      
    } else {
      setPresentationStartTime(undefined);
    }
    updatePresentationStatus(await getPresentationStatus())
  })

  obs.on("Heartbeat", async (data) => {
    // TODO: Ajouter les indicateurs
  });
}
