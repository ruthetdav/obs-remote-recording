/// <reference types="obs-websocket-js" />
import "bootstrap";
import { connectToObs, disconnectFromObs } from "./connection";
import { enableScenario } from "./updateUI";
import { setScenario } from "./scenario";
import { record, stream, stop } from "./control";
import { startPresentation, stopPresentation } from "./presentation";

export function setupUiHandlers() {
  $("#connect").on("click", () => {
    connectToObs();
  });

  $("#disconnect").on("click", () => {
    disconnectFromObs();
    enableScenario(false);
  });

  $("#applyScenario").on("click", () => {
    setScenario({
      scenes: {
        intro: $("#introScene").val().toString(),
        presentation: $("#presentationScene").val().toString(),
        final: $("#finalScene").val().toString(),
      },
      transition: {
        name: $("#transition").val().toString(),
        duration: $("#duration").val() as number,
      },
    });
  });

  $("#record").on("click", () => {
    record();
  });

  $("#stream").on("click", () => {
    stream();
  });

  $("#stop").on("click", () => {
    stop();
  });

  $("#startPresentation").on("click", () => {
    startPresentation();
  });

  $("#stopPresentation").on("click", () => {
    stopPresentation();
  });
}
