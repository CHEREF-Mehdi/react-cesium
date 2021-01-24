import React from "react";
import { Typography, TypographyProps } from "@material-ui/core";

export interface ErrorTypographyProps extends TypographyProps {
  error?: string;
}

export const ErrorTypography: React.FC<ErrorTypographyProps> = ({
  error,
  ...typographyProps
}) => {
  return (
    <Typography
      variant="subtitle1"
      style={{ display: error ? "block" : "none" }}
      {...typographyProps}
    >
      {error}
    </Typography>
  );
};
