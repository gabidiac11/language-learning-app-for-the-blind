import { Microphone } from "../Microphone/Microphone";
import "./SoundInterationPanel.scss";
import { Speaker } from "../Speaker/Speaker";

export const SoundInterationPanel = () => (
  <div aria-label="Sound controls" className="flex sound-interaction-panel">
    <Speaker />
    <Microphone />
  </div>
);
