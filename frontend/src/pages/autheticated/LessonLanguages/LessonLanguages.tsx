import { WithFocusControls } from "../../page-components/accessibility/WithFocusControls";
import useFetchData from "../../../api/useFetchData";
import { LanguageDataItem } from "../../../context";
import ErrorBoundary from "../../page-components/ErrorBoundary/ErrorBoundary";
import { usePageAudioFeedback } from "../../../accessibility/audioSpeaker/hooks/usePageAudioFeedback";
import { langPageMessages } from "./appMessages";
import { LanguageCard } from "./LanguageCard";
import "./LessonLanguages.scss";
import { useHandleVoicePageLanguage } from "./useHandleVoicePageLanguage";

export const LessonLanguagesPage = () => {
  const { data, loading, error, retry } =
    useFetchData<LanguageDataItem[]>("lesson-languages");

  usePageAudioFeedback({
    error,
    loading,
    pageGreeting: langPageMessages.greetingPageLanguages,
    pageDataLoadingMessage: langPageMessages.loadingLanguages,
    pageDataLoadedMessage: langPageMessages.loadedLanguages,
  });

  useHandleVoicePageLanguage(data);

  return (
    <div
      className="view dashboard-page-wrapper"
      aria-label="wrapper for languages selectable items"
    >
      <ErrorBoundary error={error} onRetry={retry} loading={loading}>
        <WithFocusControls direction="horizontal">
          <div className="view-content view-items">
            {!error &&
              data &&
              data.map((lessonLanguage, index) => (
                <LanguageCard
                  key={lessonLanguage.id}
                  index={index}
                  lessonLanguage={lessonLanguage}
                />
              ))}
          </div>
        </WithFocusControls>
      </ErrorBoundary>
    </div>
  );
};
