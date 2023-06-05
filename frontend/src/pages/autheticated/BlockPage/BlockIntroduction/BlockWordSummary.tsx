import { Button } from "@mui/material";
import { useRef, useState, useCallback, useEffect } from "react";
import { Word } from "../../../../context";
import { VolumeUp as PlayIcon } from "@mui/icons-material";

export const BlockWordSummary: React.FC<{ word: Word; next: () => void }> = (
  props
) => {
  const timeoutRef = useRef<NodeJS.Timeout>();
  const [isListening, setIsListening] = useState(false);
  const listenWord = useCallback(() => {
    setIsListening(true);

    timeoutRef.current = setTimeout(() => {
      setIsListening(false);
    }, 2000);
  }, []);

  useEffect(() => {
    return () => clearTimeout(timeoutRef.current);
  }, []);

  return (
    <div aria-label={`wrapper for word to learn`}>
      {/* TODO: play word audio when this is focused/clicked */}
      <h2
        tabIndex={0}
        aria-label={`word to learn the foreign word which means translation ${props.word.shortTranslation} - ${props.word.longTranslation}. Press play.`}
        lang="ru"
      >
        {props.word.text}
      </h2>
      <p
        tabIndex={0}
        aria-label={`Meaning: ${props.word.shortTranslation} - ${props.word.longTranslation}`}
      >
        {props.word.shortTranslation} - {props.word.longTranslation}
      </p>

      <div style={{ margin: "30px 0" }}>
        <div>
          <Button
            tabIndex={0}
            aria-label="Play the word translation."
            
            style={{ marginBottom: "20px" }}
            variant="contained"
            startIcon={<PlayIcon aria-hidden="true" />}
            onClick={listenWord}
            color={isListening ? "secondary" : "primary"}
          >
            Play word
          </Button>
        </div>
        <div>
          {/* TODO: play something after new word is retrieved and displayed */}
          <Button tabIndex={0} aria-label="Next word" variant="contained" onClick={props.next}>
            Next word
          </Button>
        </div>
      </div>
    </div>
  );
};
