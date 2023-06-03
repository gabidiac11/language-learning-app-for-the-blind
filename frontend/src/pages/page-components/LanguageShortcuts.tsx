import { Language } from "../../context";
import { FlagCircle } from "@mui/icons-material";
import { languages } from "../../constants";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";

export const LanguageShortcuts = ({ lang }: { lang?: Language }) => {
  const match = languages.find((i) => i.id === lang);
  if (!match) {
    return <></>;
  }
  return (
    <Link
      tabIndex={0}
      to={`/stories/${lang}`}
      aria-label={`link to page: all lesson stories for ${match.name} language`}
      style={{ display: "flex", alignItems: "center", color: "white", marginLeft: "5px" }}
    >
      <FlagCircle
        aria-hidden="true"
        htmlColor="white"
        className="outline-none"
        style={{ marginRight: "7px" }}
      />
      <Typography aria-hidden="true" variant="h6">{match.name}</Typography>
    </Link>
  );
};
