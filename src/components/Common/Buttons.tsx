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
    <>
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

<Box
sx={{
  display: 'flex',
  flexDirection: { xs: 'column', md: 'row' },
  justifyContent: { xs: 'center', md: 'flex-end' },
  gap: 2,
  marginTop: '20px',
}}
>
<Button
  variant="solid"
  sx={{
    background: '#388e3c',
    color: 'white',
    borderRadius: '10px',
  }}
  component="label"
  // onClick={handlePrevTab}
>
  {/* <NavigateBeforeOutlinedIcon /> */}
  Back
</Button>
<Button
  variant="solid"
  sx={{
    background: '#FABC1E',
    color: 'black',
    '&:hover': { background: '#E1A91B' },
    borderRadius: '10px',
  }}
  component="label"
  // onClick={handleNextTab}
>
  Continue
  <NavigateNextOutlinedIcon />{' '}
</Button>
</Box>
    </>
  );
}
export default Buttons;
