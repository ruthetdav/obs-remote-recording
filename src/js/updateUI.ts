import {
  ConnectionStatus,
  Scenario,
  ControlStatus,
  PresentationStatus,
  PresentationStep,
} from "./model";

import Mousetrap from "mousetrap";

export function updateConnectStatus(status: ConnectionStatus) {
  if (status.connected) {
    $("#connected").show();
    $("#disconnected").hide();
    $("#connect").hide();
    $("#disconnect").show();
    $("#connect_success").show();
    $("#connect_error").hide();
  } else {
    $("#connected").hide();
    $("#disconnected").show();
    $("#connect").show();
    $("#disconnect").hide();
    $("#connect_success").hide();
    if (status.errorMessage) {
      $("#connect_error").text("Déconnecté: " + status.errorMessage);
    } else {
      $("#connect_error").text("Déconnecté");
    }
    $("#connect_error").show();
  }
}

export function enableScenario(enabled: boolean) {
  $("#scenario").prop("disabled", enabled ? "false" : "true");
}

export function updateScenario(
  scenario?: Scenario,
  allScenes?: string[],
  allTransitions?: string[]
) {
  if (allScenes) {
    $("#introScene").empty();
    $("#presentationScene").empty();
    $("#finalScene").empty();
    allScenes.forEach((scene, index) => {
      $("#introScene").append(
        $("<option>", {
          text: scene,
          selected:
            (scenario && scene === scenario.scenes.intro) ||
            (allScenes.length == 3 && index == 0),
        })
      );
      $("#presentationScene").append(
        $("<option>", {
          text: scene,
          selected:
            (scenario && scene === scenario.scenes.presentation) ||
            (allScenes.length == 3 && index == 1),
        })
      );
      $("#finalScene").append(
        $("<option>", {
          text: scene,
          selected:
            (scenario && scene === scenario.scenes.final) ||
            (allScenes.length == 3 && index == 2),
        })
      );
    });
  }
  if (allTransitions) {
    $("#transition").empty();
    allTransitions.forEach((t, index) => {
      $("#transition").append(
        $("<option>", {
          text: t,
          selected: scenario && t === scenario.transition.name,
        })
      );
    });
  }
  if (scenario) {
    $("#duration").val(scenario.transition.duration);
  } else {
  }
}

export function updateControlStatus(status: ControlStatus) {
  if (status.started) {
    $("#recording-on").show();
    $("#recording-off").hide();
    $("#record").hide();
    $("#stream").hide();
    $("#stop").show();
    $("#recording").show();
    if (status.streaming) {
      $("#cast-connected").show();
      $("#streaming").show();
    } else {
      $("#cast-connected").hide();
      $("#streaming").hide();
    }
    $("#stopped").hide();
  } else {
    $("#recording-on").hide();
    $("#recording-off").show();
    $("#cast-connected").hide();
    $("#record").show();
    $("#record").prop("disabled", status.disabled);
    $("#stream").show();
    $("#stream").prop("disabled", status.disabled);
    $("#stop").hide();
    $("#recording").hide();
    $("#streaming").hide();
    $("#stopped").show();
  }
}

export function updatePresentationStatus(status?: PresentationStatus) {
  if (!status) {
    $("#presentationTextCannotStart").show();
    $("#presentationTextCannotStart").children().show();
    $("#presentationTextCanStart").hide();
    $("#presentationTextStarted").hide();
    $("#presentationTextStopped").hide();
    $("#startPresentation").hide();
    $("#stopPresentation").hide();
    $("#iconCannotPresent").hide();
    $("#iconCanPresent").hide();
    $("#iconIsFilmed").hide();
    Mousetrap.reset();
    return;
  }
  switch (status.step) {
    case PresentationStep.intro:
      $("#presentationTextCannotStart").hide();
      $("#presentationTextCannotStart").children().hide();
      $("#presentationTextCanStart").show();
      $("#presentationTextStarted").hide();
      $("#presentationTextStopped").hide();
      $("#startPresentation").show();
      $("#stopPresentation").hide();
      $("#iconCannotPresent").hide();
      $("#iconCanPresent").hide();
      $("#iconIsFilmed").hide();
      Mousetrap.bind("enter", (e) => {
        $("#startPresentation").trigger("click");
        return false;
      });
      break;
    case PresentationStep.presentationRequested:
      $("#presentationTextCannotStart").hide();
      $("#presentationTextCanStart").show();
      $("#presentationTextStarted").hide();
      $("#presentationTextStopped").hide();
      $("#startPresentation").hide();
      $("#stopPresentation").hide();
      $("#iconCannotPresent").show();
      $("#iconCanPresent").hide();
      $("#iconIsFilmed").show();
      Mousetrap.reset();
      break;
    case PresentationStep.presentationReady:
      $("#presentationTextCannotStart").hide();
      $("#presentationTextCanStart").hide();
      $("#presentationTextStarted").show();
      $("#presentationTextStopped").hide();
      $("#startPresentation").hide();
      $("#stopPresentation").show();
      $("#iconCannotPresent").hide();
      $("#iconCanPresent").show();
      $("#iconIsFilmed").show();
      Mousetrap.bind("enter", (e) => {
        $("#stopPresentation").trigger("click");
        return false;
      });
      break;
    case PresentationStep.finalRequested:
      $("#presentationTextCannotStart").hide();
      $("#presentationTextCanStart").hide();
      $("#presentationTextStarted").show();
      $("#presentationTextStopped").hide();
      $("#startPresentation").hide();
      $("#stopPresentation").hide();
      $("#iconCannotPresent").hide();
      $("#iconCanPresent").show();
      $("#iconIsFilmed").show();
      Mousetrap.reset();
      break;
    case PresentationStep.finalReady:
      $("#presentationTextCannotStart").hide();
      $("#presentationTextCanStart").hide();
      $("#presentationTextStarted").hide();
      $("#presentationTextStopped").show();
      $("#startPresentation").hide();
      $("#stopPresentation").hide();
      $("#iconCannotPresent").show();
      $("#iconCanPresent").hide();
      $("#iconIsFilmed").hide();
      Mousetrap.reset();
      break;
  }
}

export function updateTimerUI(values: string) {
  $("#chrono").html(values);
}
