import React from "react";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";

export default ({
  children,
  onClick,
  tooltip,
  btnClassName,
  tooltipClassName
}) => (
  <Tooltip title={tooltip} className={tooltipClassName}>
    <IconButton onClick={onClick} className={btnClassName} placement="bottom">
      {children}
    </IconButton>
  </Tooltip>
);
