import { Button, FormControl, FormLabel, Grid, Input, Modal, Sheet, Typography } from "@mui/joy";
import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";


interface DataAddProps {
    dataBase: { data: string[] };
    setDataBase: React.Dispatch<React.SetStateAction<{ data: string[] }>>;
    addCustomField: (custom: string) => void;
    deleteCustomField: (index: number) => void;
  }

const DataBaseAdd = ({
    dataBase,
    setDataBase,
    addCustomField,
  }: DataAddProps) => {
    const [open, setOpen] = useState(false);
    const [custom, setCustom] = useState("");

    const handleAddSkill = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const custom = (e.target as HTMLFormElement).custom.value;
        addCustomField(custom);
        addSkill(custom);
      };

      const addSkill = (custom: string) => {
        setDataBase({ ...dataBase, data: [...dataBase.data, custom] });
        handleClose();
      };

      const handleClickOpen = () => {
        setOpen(true);
      };

      const handleClose = () => {
        setOpen(false);
      };
    
    return(
        <Grid container spacing={8} columns={16} sx={{ flexGrow: 1 }}>
                <Grid xs={8}>
                  <React.Fragment>
                    <Button
                      onClick={handleClickOpen}
                      sx={{
                        marginTop: "25px",
                        marginLeft: "10%",
                        background: "green",
                        color: "white",
                      }}
                    >
                      <AddIcon />
                      Add Custom Fields
                    </Button>

                    <Modal
                      aria-labelledby="responsive-dialog-title"
                      aria-describedby="modal-desc"
                      open={open}
                      onClose={handleClose}
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
                        <Typography id="responsive-dialog-title"
                         component="h2"
                         level="h4"
                         textColor="inherit"
                         fontWeight="lg"
                         mb={1}>
                          {"Add Custom Fields here"}
                        </Typography>

                        <form onSubmit={handleAddSkill}>
                          <FormControl>
                            <FormLabel
                              sx={{ paddingTop: "30px", marginLeft: "20px" }}
                            >
                              Skill*
                            </FormLabel>
                            <Input
                              variant="outlined"
                              type="text"
                              id="custom"
                              name="custom"
                              required
                              sx={{ width: "95%", marginLeft: "20px" }}
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
              Add
            </Button>

            <Button
              type="button"
              onClick={handleClose}
              autoFocus
              variant="solid"
              sx={{ background: "black",
              color: "white", marginLeft: "25px" }}
            >
              Cancel
            </Button>
                        </form>
                      </div>
                      </Sheet>
                    </Modal>
                  </React.Fragment>
                </Grid>
              </Grid>
    )
}
export default DataBaseAdd;