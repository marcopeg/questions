import React from "react";
import { Typography, Button as MUIButton } from "@mui/material";
import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";

import CenteredLayout from "../layouts/CenteredLayout";
import { removeLoadable } from "../state/with-loadable";
import { useAuth } from "../state/with-auth";

interface ErrorViewProps {
  error: Error;
}

const Button = styled(({ color, variant, ...props }: any) => (
  <MUIButton color="primary" variant="contained" {...props} />
))({
  borderWidth: 1,
  borderStyle: "solid",
  backgroundColor: "#D43A45",
  borderColor: "#D43A45",
  color: "white",
  "&:hover": {
    borderColor: "#FFFFFF",
    backgroundColor: "#D43A45"
  }
});

const ErrorView: React.FC<ErrorViewProps> = ({ error }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/", { replace: true });
    logout();
  };

  return (
    <CenteredLayout bgcolor="#FF4B5C" color="#fff">
      <Typography variant="h1">Ooooops!</Typography>
      <Typography variant="body1">{error.message}</Typography>

      <Button onClick={handleClick} sx={{ mt: 4 }}>
        Not much I can do about it
      </Button>
    </CenteredLayout>
  );
};

export default removeLoadable(ErrorView);
