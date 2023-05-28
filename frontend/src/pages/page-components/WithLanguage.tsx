import { PropsWithChildren, useEffect } from "react";
import { useParams } from "react-router";
import { languages } from "../../constants";
import { Language } from "../../context";
import { useContextActions } from "../../context/hooks/useContextActions";

export const WithLanguage = (props: PropsWithChildren) => {
  const { lang } = useParams<{ lang: string }>();
  const { updateLanguage } = useContextActions();

  useEffect(() => {
    const match = languages.find((i) => i.id === lang);
    if (match) {
      updateLanguage(lang as Language);
      return;
    }
    updateLanguage(undefined);
  }, [lang]);
  return <>{props.children}</>;
};
