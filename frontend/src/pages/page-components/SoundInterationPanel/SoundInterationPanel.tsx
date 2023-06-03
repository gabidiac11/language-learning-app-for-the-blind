import { MicRounded as Mic, Speaker } from "@mui/icons-material";
import "./SoundInterationPanel.scss";

export const SoundInterationPanel = () => {
  return (
    <div aria-label="Sound controls" className="sound-interaction-panel">
      <button tabIndex={0} className="no-btn mic-btn" aria-label="Mic, Click to record your command">
        <Mic htmlColor="white"/>
      </button>
      <button tabIndex={0} className="no-btn" aria-label="Speaker">
        <Speaker htmlColor="white" />
      </button>
    </div>
  );
};
