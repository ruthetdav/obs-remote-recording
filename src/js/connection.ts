import { updateConnectStatus, updateControlStatus } from "./updateUI";
import { obs } from "./obs-companion";

export async function connectToObs(address: string = "localhost:4444") {
  updateConnectStatus({ connected: false });
  updateControlStatus({ disabled: true, started: false, streaming: false });
  try {
    await obs.connect({ address: address }, (err: Error) => {
      updateConnectStatus({ connected: false, errorMessage: err.message });
    });
  } catch (err) {
    updateConnectStatus({ connected: false, errorMessage: err.description });
  }
}
export async function disconnectFromObs() {
  await obs.disconnect();
  updateConnectStatus({ connected: false });
  updateControlStatus({ disabled: true, started: false, streaming: false });
}

export async function getSceneList(): Promise<string[]> {
  return await(await obs.send("GetSceneList")).scenes.map((s) => s.name);
}

export async function getTransitionList(): Promise<string[]> {
  let transitionList: any[] = await(await obs.send("GetTransitionList"))
      .transitions;
  return await transitionList.map((s) => s.name);
}
