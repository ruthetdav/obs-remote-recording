import { Scenario } from "./model";
import { updateScenario, updateControlStatus } from "./updateUI";

export async function setScenario(scenario: Scenario) {
  localStorage.setItem("scenario", JSON.stringify(scenario));
  updateScenario(scenario);  
  updateControlStatus({ disabled: false, started: false, streaming: false})
}

export function getScenario(): Scenario | undefined {
  const item = localStorage.getItem("scenario");
  if (item) {
    let scenario: Scenario = JSON.parse(item);
    return scenario;
  }

  return undefined;
}
