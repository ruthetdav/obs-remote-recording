import { PresentationStatus, PresentationStep } from "./model";
import { obs } from "./obs-companion";
import { getControlStatus } from "./control";
import { getScenario } from "./scenario";
import { updatePresentationStatus, updateTimerUI } from "./updateUI";
import  Timer from "easytimer.js";

export async function setPresentationStartTime(date?: Date) {
  if (date) {
    localStorage.setItem("presentationStartTime", JSON.stringify(date));
  } else {
    localStorage.removeItem("presentationStartTime");
  }
  updateTimerStatus();
}

export function getPresentationStartTime(): Date | undefined {
  const item = localStorage.getItem("presentationStartTime");
  if (item) {
    let presentationStartTime: Date = new Date(JSON.parse(item));
    return presentationStartTime;
  }

  return undefined;
}

export async function getPresentationStatus(): Promise<
  PresentationStatus | undefined
> {
  let controlStatus = await getControlStatus();
  if (!controlStatus.started) {
    return undefined;
  }
  let scenario = getScenario();
  let currentScene = await obs.send("GetCurrentScene");
  switch (currentScene.name) {
    case scenario.scenes.intro:
      return {
        step: PresentationStep.intro,
        presentationStartTime: undefined,
      };
    case scenario.scenes.presentation:
      return {
        step: PresentationStep.presentationReady,
        presentationStartTime: getPresentationStartTime(),
      };
    case scenario.scenes.final:
      return {
        step: PresentationStep.finalReady,
        presentationStartTime: undefined,
      };
  }
}

export async function startPresentation() {
  let scenario = getScenario();
  await obs.send("SetCurrentScene", {
    "scene-name": scenario.scenes.presentation,
  });
  updatePresentationStatus({
    step: PresentationStep.presentationRequested,
    presentationStartTime: undefined
  });
}

export async function stopPresentation() {
  let scenario = getScenario();
  await obs.send("SetCurrentScene", {
    "scene-name": scenario.scenes.final,
  });
  updatePresentationStatus({
    step: PresentationStep.finalRequested,
    presentationStartTime: undefined,
  });
}

var timer = new Timer();
export function setupTimer() {
  updateTimerUI(timer.getTimeValues().toString());
  timer.addEventListener("secondsUpdated", function (e: any) {
    updateTimerUI(timer.getTimeValues().toString());
  });
}

export function resetTimerUI() {
    updateTimerUI("00:00:00");
}

export function updateTimerStatus() {
  let presentationStartTime = getPresentationStartTime();
  if (!presentationStartTime) {
    timer.stop();
  } else {
    timer.start({
      precision: "seconds",
      startValues: { seconds: ((new Date()).getTime() - presentationStartTime.getTime()) / 1000 },
    });
  }
}
