import { Box, Button, Checkbox, FormControl, FormLabel, Input, Modal, Sheet, Stack, Table, Typography } from "@mui/joy";
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';


interface DataProps {
    matchedSelected: number[];
    setMatchedSelected: React.Dispatch<React.SetStateAction<number[]>>;
    dataBase: { data: string[] };
    setDataBase: React.Dispatch<React.SetStateAction<{ data: string[] }>>;
    editOpen: boolean;
    setEditOpen: React.Dispatch<React.SetStateAction<boolean>>;
    deleteOpen: boolean;
    setDeleteOpen: React.Dispatch<React.SetStateAction<boolean>>;
    selectedCell: number | null;
    setSelectedCell: React.Dispatch<React.SetStateAction<number | null>>;
    handleCheckboxChange: (index: number) => void;
    handleEdit: () => void;
    handleEditButton: (e: React.FormEvent<HTMLFormElement>) => void;
    handleDeleteButton: () => void;
    handleDeleteSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    handleEditClose: () => void;
    handleDeleteOpen: () => void;
    handleDeleteClose: () => void;
  }

const DataBaseEdit: React.FC<DataProps>= ({ matchedSelected,
    setMatchedSelected,
    dataBase,
    setDataBase,
    editOpen,
    setEditOpen,
    deleteOpen,
    setDeleteOpen,
    selectedCell,
    setSelectedCell,
    handleCheckboxChange,
    handleEdit,
    handleEditButton,
    handleDeleteButton,
    handleDeleteSubmit,
    handleEditClose,
    handleDeleteOpen,
    handleDeleteClose,
  })=>{
    return(
        <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={{ xs: 1, sm: 2, md: 2 }}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  paddingRight: "40px",
                  marginTop: "60px",
                  overflowX: "auto",
                }}
              >
                <Table
                  borderAxis="both"
                  style={{ width: "100%", minWidth: "300px" }}
                >
                  <thead>
                    <tr>
                      <th style={{ width: 30 }}>
                        <Checkbox
                          size="sm"
                          indeterminate={
                            matchedSelected.length > 0 &&
                            matchedSelected.length < dataBase.data.length
                          }
                          checked={
                            matchedSelected.length > 0 &&
                            matchedSelected.length === dataBase.data.length
                          }
                          onChange={(event) => {
                            const isChecked = event.target.checked;
                            setMatchedSelected(
                              isChecked
                                ? dataBase.data.map((_, index) => index)
                                : []
                            );
                          }}
                          color={
                            matchedSelected.length > 0 &&
                            matchedSelected.length === dataBase.data.length
                              ? "primary"
                              : undefined
                          }
                          sx={{ verticalAlign: "text-bottom" }}
                        />
                      </th>
                      <th>Category</th>
                      <th>Edit</th>
                      <th>Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dataBase.data.map((Custom, index) => (
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
                          <Button onClick={handleEdit}>
                            <EditOutlinedIcon />
                            Edit
                          </Button>
                        </td>
                        <td>
                          <Button onClick={handleDeleteButton}>
                            <DeleteForeverIcon />
                            Delete
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>

                <Modal
                  open={editOpen}
                  onClose={handleEditClose}
                  aria-labelledby="responsive-dialog-title"
                  aria-describedby="modal-desc"
                  sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                >
                    <Sheet
          variant="outlined"
          sx={{
            maxWidth: 500,
            borderRadius: 'md',
            p: 3,
            boxShadow: 'lg',
          }}
        >
                  <div>
                    <Typography id="responsive-dialog-title" component="h2"
            level="h4"
            textColor="inherit"
            fontWeight="lg"
            mb={1}>
                      {"Edit the Customs here"}
                    </Typography>

                    <form onSubmit={handleEditButton}>
                      <FormControl
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "space-evenly",
                        }}
                      >
                        <FormLabel
                          sx={{ paddingTop: "30px", marginLeft: "20px" }}
                        >
                          Category*
                        </FormLabel>
                        <Input
                          variant="outlined"
                          type="text"
                          id="Custom"
                          name="Custom"
                          required
                          sx={{ width: "70%", marginLeft: "10px" }}
                          defaultValue={
                            selectedCell !== null
                              ? dataBase.data[selectedCell]
                              : ""
                          }
                        />
                      </FormControl>
                      <Button
              autoFocus
              type="submit"
              variant="solid"
              sx={{
                background: "#fdd835",
                color: "black",
                marginTop: "25px",
                marginLeft: "30%",
              }}
            >
              Update
            </Button>

            <Button
              type="button"
              onClick={handleEditClose}
              autoFocus
              variant="solid"
              sx={{ background: "black",
              color: "white", marginLeft: "50px" }}
            >
              Cancel
            </Button>
                    </form>
                  </div>
                  </Sheet>
                </Modal>

                <Modal
                  open={deleteOpen}
                  onClose={() => setDeleteOpen(false)}
                  aria-labelledby="responsive-dialog-title"
                  aria-describedby="modal-desc"
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                >
                      <Sheet
          variant="outlined"
          sx={{
            maxWidth: 500,
            borderRadius: 'md',
            p: 3,
            boxShadow: 'lg',
          }}
        >
                  <div>
                    <Typography id="responsive-dialog-title" component="h2"
            level="h4"
            textColor="inherit"
            fontWeight="lg"
            mb={1}>
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
                        <Input
                          variant="outlined"
                          type="text"
                          id="Custom"
                          name="Custom"
                          required
                          sx={{ width: "92%", marginLeft: "20px" }}
                          defaultValue={
                            selectedCell !== null
                              ? dataBase.data[selectedCell]
                              : ""
                          }
                        />
                      </FormControl>
                      <Button
              autoFocus
              type="submit"
              variant="solid"
              sx={{
                background: "#fdd835",
                color: "black",
                marginTop: "25px",
                marginLeft: "40%",
              }}
            >
              Confirm Delete
            </Button>

            <Button
              type="button"
              onClick={handleDeleteClose}
              autoFocus
              variant="solid"
              sx={{ background: "black",
              color: "white", marginTop: "25px", marginLeft: "10px" }}
            >
              Cancel
            </Button>
                    </form>
                  </div>
                  </Sheet>
                </Modal>
              </Stack>
    )
}
export default DataBaseEdit;