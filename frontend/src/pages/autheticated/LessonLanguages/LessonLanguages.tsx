import useFetchData from "../../../api/useFetchData";
import { LanguageDataItem } from "../../../context";
import ErrorBoundary from "../../page-components/ErrorBoundary/ErrorBoundary";
import { LanguageCard } from "./LanguageCard";
import "./LessonLanguages.scss";

export const LessonLanguagesPage = () => {
  const { data, loading, error, retry } =
    useFetchData<LanguageDataItem[]>("lesson-languages");

  return (
    <div className="view dashboard-page-wrapper">
      <ErrorBoundary error={error} onRetry={retry} loading={loading}>
        <div className="view-content view-items">
          {!error &&
            data &&
            data.map((lessonLanguage) => (
              <LanguageCard
                key={lessonLanguage.id}
                lessonLanguage={lessonLanguage}
              />
            ))}
        </div>
      </ErrorBoundary>
    </div>
  );
};
