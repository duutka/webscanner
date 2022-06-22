/*** NPM ***/
import React from "react";

/*** MUI ***/
import { CircularProgress, Box } from "@mui/material";

interface IProps {
  isLoading: boolean;
}

export const Waiter = (props: IProps): JSX.Element => {
  if (props.isLoading) {
    return (
      <Box sx={{ display: "flex" }}>
        <CircularProgress />
      </Box>
    );
  } else {
    return <></>;
  }
};
