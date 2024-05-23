import { Box, Button, ButtonGroup, FormControl, FormLabel, Grid, TextField, Typography } from "@mui/joy";
import SvgIcon from "@mui/joy/SvgIcon";
import { styled } from "@mui/joy";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import Image from "../../components/Common/MaintenanceEmpty";
import Select, { selectClasses } from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';
import Textarea from '@mui/joy/Textarea';
import Table from '@mui/joy/Table';


function createData(
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number,
) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];


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

export function MaintenanceOverdue() {
  return (
    <>
      <Box>
        <Box>
          <Typography level="h4">Maintenance</Typography>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '20px' }}>
  <Button
    type="button"
    variant="solid"
    autoFocus
    sx={{
      background: "#1CCAB8",
      color: "white",
      marginRight: 'auto', // Pushes the button to the left
    }}
  >
    <SettingsOutlinedIcon />
    Search Criteria
  </Button>
  <Box sx={{ marginLeft: 'auto' }}> {/* Pushes the ButtonGroup to the right */}
    <ButtonGroup spacing="0.5rem" aria-label="spacing button group">
      <Button
        variant="solid"
        autoFocus
        sx={{
          background: "#388e3c",
          color: "white",
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
        Import Maintenance
        <VisuallyHiddenInput type="file" />
      </Button>
      <Button
        type="button"
        variant="solid"
        autoFocus
        sx={{
          background: "black",
          color: "white",
        }}
      >
        <SettingsOutlinedIcon />
        Setup Column
      </Button>
    </ButtonGroup>
  </Box>
</Box>


<Grid sx={{ display: "flex", gap: "30px", marginLeft: "5%" }}>
          <Grid>
            <Select
              placeholder="Maintenance Due"
              indicator={<KeyboardArrowDown />}
              sx={{
                width: 240,
                [`& .${selectClasses.indicator}`]: {
                  transition: "0.2s",
                  [`&.${selectClasses.expanded}`]: {
                    transform: "rotate(-180deg)",
                  },
                },
                // marginLeft:'5%',
                marginTop: "20%",
                borderRadius: "16px",
              }}
            >
              <Option value="dog">Dog</Option>
              <Option value="cat">Cat</Option>
              <Option value="fish">Fish</Option>
              <Option value="bird">Bird</Option>
            </Select>
          </Grid>

          <Grid>
            <Select
              placeholder="10"
              indicator={<KeyboardArrowDown />}
              sx={{
                width: 240,
                [`& .${selectClasses.indicator}`]: {
                  transition: "0.2s",
                  [`&.${selectClasses.expanded}`]: {
                    transform: "rotate(-180deg)",
                  },
                },
                marginLeft: "5%",
                marginTop: "20%",
                borderRadius: "16px",
              }}
            >
              <Option value="10">10</Option>
              <Option value="15">15</Option>
              <Option value="20">20</Option>
            </Select>
          </Grid>

          <Grid xs>
            <Box
              sx={{
                marginRight: "6%",
                display: "flex",
                justifyContent: "flex-end",
                // gap: 2,
                alignItems: "flex-end ",
                // flexWrap: 'wrap',
                color: "danger",
                maringTop: "100%",
              }}
            >
              <FormControl>
                <Textarea
                  defaultValue=" Assets that are more than 7 days overdue for maintenance (as indicated by 'overdue time')"
                  minRows={2}
                  sx={{
                    fontFamily: "Poppins, sans-serif",
                    fontStyle: "italic",
                    display: "flex",
                    width: "auto",
                    marginTop: "22%",
                  }}
                />
              </FormControl>
            </Box>
          </Grid>
        </Grid>


        <Box>
        <Table hoverRow>
      <thead>
        <tr style={{ width:'104px'}}>
          <th style={{ width:'10%',}}>Status</th>
          <th>Expires</th>
          <th>Asset Tag Id</th>
          <th>Description</th>
          <th>Title</th>
          <th>Maintenance Details</th>
          <th>Action</th>
        </tr>
      </thead>
    </Table>
        </Box>

        <Box>
            <Image /> 
        </Box>
      </Box>
    </>
  );
}

export default MaintenanceOverdue;
