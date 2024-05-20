import { Link } from "react-router-dom";
import { Box, Button, ButtonGroup } from "@mui/joy";
import { MouseEventHandler } from "react";
import NavigateNextOutlinedIcon from '@mui/icons-material/NavigateNextOutlined';

interface ButtonsProps {
  handleContinue: MouseEventHandler<HTMLAnchorElement>;
  toLink: string;
}

export function Buttons({ handleContinue, toLink }: ButtonsProps) {
  return (
    <Box sx={{ marginTop: "1px", marginBottom: "15px", padding: "20px" }}>
      <ButtonGroup
        spacing="1rem"
        aria-label="spacing button group"
        sx={{
          paddingLeft: "82%",
          "@media (max-width: 600px)": {
            paddingLeft: "30%",
          },
        }}
      >
        <Button
          sx={{
            background: "#fdd835",
            color: "black",
            marginRight: "-10px",
            "@media (max-width: 600px)": {
              marginRight: 0,
              marginLeft: "auto",
            },
          }}
        >
          <Link
            to={toLink}
            style={{ textDecoration: "none", color: "inherit" }}
            onClick={handleContinue}
          >
            Continue
          </Link>
          <NavigateNextOutlinedIcon />{" "}
        </Button>
      </ButtonGroup>
    </Box>
    
  );
}
export default Buttons;
