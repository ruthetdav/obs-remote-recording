import { getScenario } from "./scenario";
import { obs } from "./obs-companion";
import { ControlStatus } from "./model";
import { updateControlStatus } from "./updateUI";
import { stopPresentation, setPresentationStartTime, resetTimerUI } from "./presentation";

export async function prepare() {
  let scenario = getScenario();
  await obs.send("SetCurrentScene", {
    "scene-name": scenario.scenes.intro,
  });
  await obs.send("SetCurrentTransition", {
    "transition-name": scenario.transition.name,
  });
  let existingDuration = await obs.send("GetTransitionDuration");
  console.log("transitionDuration", existingDuration);
//  setTransitionDuration(scenario.transition.duration);
}

function setTransitionDuration(duration: number) {
  obs.send("SetTransitionDuration", {
    duration: duration,
  });
}

export async function record() {
  await prepare();
  resetTimerUI();
  await obs.send("StartRecording");
}

export async function stream() {
  await prepare();
  await obs.send("StartStreaming", {});
}

export async function stop() {
  await stopPresentation();
  await setPresentationStartTime(undefined);
  let status = await obs.send("GetStreamingStatus");
  if (status.recording) {
    await obs.send("StopRecording");
  }
  if (status.streaming) {
    await obs.send("StopStreaming");
  }
}

export async function getControlStatus(): Promise<ControlStatus> {
  let scenario = getScenario();
  try {
    let streamingStatus = await obs.send("GetStreamingStatus");
    return {
      disabled: !scenario,
      started: streamingStatus.recording || streamingStatus.streaming,
      streaming: streamingStatus.streaming,
    };
  } catch (err) {
    return {
      disabled: !scenario,
      started: false,
      streaming: false,
    };
  }
}
