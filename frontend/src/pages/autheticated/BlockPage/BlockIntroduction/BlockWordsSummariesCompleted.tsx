import { Typography } from "@mui/material";
import { useEffect } from "react";
import { getPlayableErrorFromUnknown } from "../../../../accessibility/apiAppMessages";
import { screenReader } from "../../../../accessibility/appReaders";
import useFetchData, {
  UseFetchDataOptions,
} from "../../../../api/useFetchData";
import { genKey } from "../../../../constants";
import { BuildingBlockProgress } from "../../../../context";
import { useFeedbackAudioQueue } from "../../../../context/hooks/useFeedbackAudiQueue";
import ErrorBoundary from "../../../page-components/ErrorBoundary/ErrorBoundary";
import ButtonContinueToBlockQuiz from "../ButtonContinueToBlockQuiz";
import { blockIntroductionPageMessages } from "./appMessages";

const fetchOptioons: UseFetchDataOptions = {
  method: "POST",
};

const BlockWordsSummariesCompleted = (props: {
  blockProgress: BuildingBlockProgress;
}) => {
  const { loading, error, retry } = useFetchData<{}>(
    `blocks/${props.blockProgress.id}/complete-summary`,
    props.blockProgress.lang,
    fetchOptioons
  );

  const { enqueuePlayableMessage } = useFeedbackAudioQueue();

  useEffect(() => {
    if(loading || error) {
      return;
    }
    enqueuePlayableMessage({
      key: `${genKey()}-${
        blockIntroductionPageMessages.blockSummaryCompleted.uniqueName
      }`,
      messages: [blockIntroductionPageMessages.blockSummaryCompleted],
    });
  }, [loading]);

  useEffect(() => {
    if (!error) {
      return;
    }

    enqueuePlayableMessage(error.message);
  }, [error]);

  return (
    <ErrorBoundary error={error} onRetry={retry} loading={loading}>
      <div aria-label="wrapper for section where you're informed you completed the word introduction">
        <Typography
          tabIndex={0}
          variant="subtitle1"
          aria-label={`Congratulations! You completed the words introduction, you can start the words quiz.`}
        >
          Completed! 🎉 You completed the words introduction, you can start the
          words quiz.
        </Typography>
        <ButtonContinueToBlockQuiz
          lang={props.blockProgress.lang}
          blockProgressId={props.blockProgress.id}
        />
      </div>
    </ErrorBoundary>
  );
};

export default BlockWordsSummariesCompleted;
