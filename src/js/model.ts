export interface ConnectionStatus {
  connected: boolean;
  errorMessage?: string;
}

export interface ScenarioScenes {
  intro: string;
  presentation: string;
  final: string;
}

export interface Transition {
  name: string;
  duration: number;
}

export interface Scenario {
  scenes: ScenarioScenes;
  transition: Transition;
}

export interface ControlStatus {
  disabled: boolean;
  started: boolean;
  streaming: boolean;
}

export enum PresentationStep {
  intro = 0,
  presentationRequested,
  presentationReady,
  finalRequested,
  finalReady
}

export interface PresentationStatus {
  step: PresentationStep;
  presentationStartTime?: Date;
}
