import { Button, ButtonProps, styled } from "@mui/material";
import { LinkProps } from "react-router";

type Props = ButtonProps & Partial<LinkProps>;

const StyledButton = styled(Button)<Props>(({ theme }) => ({
  "&.Mui-disabled": {
    backgroundColor: theme.palette.grey[600],
    color: theme.palette.text.disabled,
  },
}));

export default StyledButton;
