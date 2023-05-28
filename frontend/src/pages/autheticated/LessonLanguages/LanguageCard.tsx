import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import { useNavigate } from "react-router";
import { useCallback } from "react";
import "./LessonLanguages.scss";
import { LanguageDataItem } from "../../../context";
import CardBlock from "../../page-components/CardBlock/CardBlock";

export const LanguageCard = (props: {
  lessonLanguage: LanguageDataItem;
}) => {
  const navigate = useNavigate();
  const { lessonLanguage } = props;

  const navigateToLessonSets = useCallback(() => {
    navigate(`/stories/${lessonLanguage.id}`);
  }, [lessonLanguage]);

  return (
    <CardBlock onClick={navigateToLessonSets}>
      <CardHeader
        title={props.lessonLanguage.name}
      />
      <CardMedia
        component="img"
        height="320"
        image={props.lessonLanguage.imageUrl}
        // TODO: what alt to use here -> should devine some property for this one
        alt={props.lessonLanguage.alt}
      />
    </CardBlock>
  );
};
