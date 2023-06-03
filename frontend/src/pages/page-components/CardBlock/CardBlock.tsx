import { Card } from "@mui/material";
import { PropsWithChildren } from "react";

import "./CardBlock.scss";

const CardBlock = (
  props: PropsWithChildren & { disabled?: boolean; onClick?: () => void, ariaLabel: string }
) => {
  const className = `block-card ${
    !props.disabled && props.onClick
      ? "cursor-point"
      : props.disabled
      ? "disabled"
      : ""
  }`;
  return (
    <Card
      tabIndex={0}
      aria-label={props.ariaLabel || ""}
      sx={{ width: 345 }}
      className={className}
      onClick={props.onClick || (() => {})}
    >
      {props.children}
    </Card>
  );
};

export default CardBlock;
