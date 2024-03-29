import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import { useNavigate } from "react-router";
import { useCallback } from "react";
import "./LessonLanguages.scss";
import { LanguageDataItem } from "../../../context";
import CardBlock from "../../page-components/CardBlock/CardBlock";
import { LanguageNavigateToStoriesState } from "./LanguageNavigateToStoriesState";

export const LanguageCard = (props: {
  lessonLanguage: LanguageDataItem;
  index: number;
}) => {
  const navigate = useNavigate();
  const { lessonLanguage } = props;

  const navigateToLessonSets = useCallback(() => {
    const navigationState: LanguageNavigateToStoriesState = {
      lessonLanguage,
    };
    navigate(`/stories/${lessonLanguage.id}`, {
      state: navigationState,
    });
  }, [lessonLanguage]);

  const cardAriaLabel = `${props.index + 1} ${
    props.lessonLanguage.name
  }: Go to lessons in ${props.lessonLanguage.name}, press enter.`;

  return (
    <CardBlock ariaLabel={cardAriaLabel} onClick={navigateToLessonSets}>
      <CardHeader
        aria-label={cardAriaLabel}
        title={props.lessonLanguage.name}
      />
      <div className="card-image-container">
        <CardMedia
          component="img"
          width="100%"
          height="100%"
          image={props.lessonLanguage.imageUrl}
          alt={`${props.lessonLanguage.name}: ${props.lessonLanguage.alt}, press enter to go to lessons.`}
        />
      </div>
    </CardBlock>
  );
};
