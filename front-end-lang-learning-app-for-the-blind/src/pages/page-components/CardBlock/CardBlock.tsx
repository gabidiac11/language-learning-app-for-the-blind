import { Card } from "@mui/material";
import { PropsWithChildren } from "react";

import "./CardBlock.scss";

const CardBlock = (
  props: PropsWithChildren & { disabled?: boolean; onClick?: () => void }
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
      sx={{ maxWidth: 345, minWidth: 300 }}
      className={className}
      onClick={props.onClick || (() => {})}
    >
      {props.children}
    </Card>
  );
};

export default CardBlock;
