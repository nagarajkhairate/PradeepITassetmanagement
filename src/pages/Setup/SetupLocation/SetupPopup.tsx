import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormLabel,
  Input,
  Modal,
  Sheet,
  Stack,
  Table,
  Typography,
} from "@mui/joy";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

interface SetupPopupProps {
  location: { locationData: string[] };
  matchedSelected: number[];
  handleCheckboxChange: (index: number) => void;
  handleEdit: () => void;
  handleDeleteButton: () => void;
  handleEditClose: () => void;
  handleEditButton: (e: React.FormEvent<HTMLFormElement>) => void;
  editOpen: boolean;
  deleteOpen: boolean;
  setDeleteOpen: (open: boolean) => void;
  handleDeleteSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  selectedCell: number | null;
  handleDeleteClose: () => void;
  setMatchedSelected: (selected: number[]) => void;
}

export function SetupPopup({
  location,
  matchedSelected,
  handleCheckboxChange,
  handleEdit,
  handleDeleteButton,
  handleEditClose,
  handleEditButton,
  editOpen,
  deleteOpen,
  setDeleteOpen,
  handleDeleteSubmit,
  handleDeleteClose,
  setMatchedSelected,
  selectedCell,
}: SetupPopupProps) {
  return (
    <Stack
      direction={{ xs: "column", sm: "row" }}
      spacing={{ xs: 1, sm: 2, md: 2 }}
      sx={{
        display: "flex",
        justifyContent: "space-between",
        // paddingRight: "40px",
        paddingRight: { xs: "0", sm: "40px" },
        marginTop: "60px",
      }}
    >
      <Table
        borderAxis="both"
        style={{ width: "100%", borderCollapse: "collapse" }}
      >
        <thead>
          <tr>
            <th style={{ width: 30 }}>
              <Checkbox
                size="sm"
                indeterminate={
                  matchedSelected.length > 0 &&
                  matchedSelected.length < location.locationData.length
                }
                checked={
                  matchedSelected.length > 0 &&
                  matchedSelected.length === location.locationData.length
                }
                onChange={(event) => {
                  const isChecked = event.target.checked;
                  setMatchedSelected(
                    isChecked ? location.locationData.map((_, index) => index) : []
                  );
                }}
                color={
                  matchedSelected.length > 0 &&
                  matchedSelected.length === location.locationData.length
                    ? "primary"
                    : undefined
                }
                sx={{ verticalAlign: "text-bottom" }}
              />
            </th>
            <th>Location</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {location.locationData.map((Custom, index) => (
            <tr key={index}>
              <td>
                <Checkbox
                  checked={matchedSelected.includes(index)}
                  onChange={() => handleCheckboxChange(index)}
                  color="primary"
                />
              </td>
              <td>{Custom}</td>
              <td>
                <Button onClick={handleEdit} variant="plain" color="neutral">
                  <EditOutlinedIcon />
                  Edit
                </Button>
              </td>
              <td>
                <Button
                  onClick={handleDeleteButton}
                  variant="plain"
                  color="danger"
                >
                  <DeleteForeverIcon />
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Box sx={{ background: "white" }}>
        <Modal
          aria-labelledby="responsive-dialog-title"
          aria-describedby="modal-desc"
          open={editOpen}
          onClose={handleEditClose}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Sheet
            variant="outlined"
            sx={{
              maxWidth: 500,
              borderRadius: "md",
              p: 3,
              boxShadow: "lg",
            }}
          >
            <div>
              <Typography
                id="responsive-dialog-title"
                component="h2"
                level="h4"
                textColor="inherit"
                fontWeight="lg"
                mb={1}
              >
                {"Edit the Customs here"}
              </Typography>

              <form onSubmit={handleEditButton}>
                <FormControl
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-evenly",
                    alignItems: "center",
                  }}
                >
                  <FormLabel sx={{ paddingTop: "30px", marginLeft: "20px" }}>
                    Category*
                  </FormLabel>
                  <Input
                    variant="outlined"
                    type="text"
                    id="Custom"
                    name="Custom"
                    required
                    // sx={{ width: "70%", marginLeft: "10px", marginTop:'25px' }}
                    sx={{
                      width: { xs: "100%", sm: "70%" },
                      marginLeft: "10px",
                      marginTop: "25px",
                    }}
                    defaultValue={
                      selectedCell !== null ? location.locationData[selectedCell] : ""
                    }
                  />
                </FormControl>
                <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
                  <Button
                    autoFocus
                    type="submit"
                    variant="solid"
                    sx={{
                      background: "#fdd835",
                      color: "black",
                      // marginTop: "25px",
                      // marginLeft: "30%",
                      mt: "25px",
                    }}
                  >
                    Update
                  </Button>

                  <Button
                    type="button"
                    onClick={handleEditClose}
                    autoFocus
                    variant="solid"
                    sx={{
                      background: "black",
                      color: "white",
                      mt: "25px",
                      ml: 2,
                    }}
                  >
                    Cancel
                  </Button>
                </Box>
              </form>
            </div>
          </Sheet>
        </Modal>
      </Box>

      <Modal
        aria-labelledby="responsive-dialog-title"
        aria-describedby="modal-desc"
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
        open={deleteOpen}
        onClose={() => setDeleteOpen(false)}
      >
        <Sheet
          variant="outlined"
          sx={{
            maxWidth: 500,
            borderRadius: "md",
            p: 3,
            boxShadow: "lg",
          }}
        >
          <div>
            <Typography
              id="responsive-dialog-title"
              component="h2"
              level="h4"
              textColor="inherit"
              fontWeight="lg"
              mb={1}
            >
              {"Edit the Customs here"}
            </Typography>

            <form onSubmit={handleDeleteSubmit}>
              <FormControl
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-evenly",
                }}
              >
                <Box sx={{ marginBottom: "20px", padding: "20px" }}>
                  Are you sure you want to delete this Category?
                </Box>
                {/* <Input
                variant="outlined"
                type="text"
                id="Custom"
                name="Custom"
                required
                sx={{ width: "92%", marginLeft: "15px", marginTop:'-20px' }}
                defaultValue={
                  selectedCell !== null ? location.data[selectedCell] : ""
                }
              /> */}
              </FormControl>
              <Button
                autoFocus
                type="submit"
                variant="solid"
                sx={{
                  background: "#fdd835",
                  color: "black",
                  // marginTop: "25px",
                  // marginLeft: "40%",
                  mt: "25px",
                }}
              >
                Confirm Delete
              </Button>

              <Button
                type="button"
                onClick={handleDeleteClose}
                autoFocus
                variant="solid"
                sx={{
                  background: "black",
                  color: "white",
                  //  marginTop: "25px", marginLeft: "10px"
                  mt: "25px",
                  ml: 2,
                }}
              >
                Cancel
              </Button>
            </form>
          </div>
        </Sheet>
      </Modal>
    </Stack>
  );
}
export default SetupPopup;
