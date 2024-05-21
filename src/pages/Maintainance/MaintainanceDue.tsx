import { Box, Button, ButtonGroup, Grid, Typography } from "@mui/joy";
import EmptyPage from "../../components/Common/EmptyPage";
import SvgIcon from "@mui/joy/SvgIcon";
import { styled } from "@mui/joy";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";

const VisuallyHiddenInput = styled("input")`
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  height: 1px;
  overflow: hidden;
  position: absolute;
  bottom: 0;
  left: 0;
  white-space: nowrap;
  width: 1px;
`;

export function MaintainanceDue() {
  return (
    <>
      <Box>
        <Typography level="h4">Maintainances</Typography>
      </Box>

      <Grid container spacing={2} sx={{ flexGrow: 1, marginTop: "4%" }}>
        <Grid xs={4}>
        <Button
              type="button"
              variant="solid"
              autoFocus
              sx={{
                background: "#1CCAB8",
                color: "white",
                marginTop: "20px",
                marginLeft: "30px",
              }}
            >
              <SettingsOutlinedIcon />
              Search Criteria
            </Button>
        </Grid>
        <Grid xs={8}>
          <ButtonGroup spacing="0.5rem" aria-label="spacing button group">
            <Button
                 variant="solid"
                 autoFocus
                 sx={{
                   background: '#388e3c',
                   color: "white",
                   marginTop: "20px",
                   marginLeft: "30px",
                 }}
              component="label"
              role={undefined}
              tabIndex={-1}
              color="neutral"
              startDecorator={
                <SvgIcon>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
                    />
                  </svg>
                </SvgIcon>
              }
            >
              Export to Excel
              <VisuallyHiddenInput type="file" />
            </Button>
            <Button
              
              variant="solid"
              autoFocus
              sx={{
                background: "#2196f3",
                color: "white",
                marginTop: "20px",
                marginLeft: "30px",
              }}
              component="label"
              role={undefined}
              tabIndex={-1}
              color="neutral"
              startDecorator={
                <SvgIcon>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
                    />
                  </svg>
                </SvgIcon>
              }
            >
              Import Maintainance
              <VisuallyHiddenInput type="file" />
            </Button>
            <Button
              type="button"
              variant="solid"
              autoFocus
              sx={{
                background: "black",
                color: "white",
                marginTop: "20px",
                marginLeft: "30px",
              }}
            >
              <SettingsOutlinedIcon />
              Setup Column
            </Button>
          </ButtonGroup>
        </Grid>
      </Grid>

      {/* <Box>
        <EmptyPage />
      </Box> */}
    </>
  );
}

export default MaintainanceDue;
