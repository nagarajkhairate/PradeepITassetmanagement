import React from 'react'
import { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Divider,
  Checkbox,
} from "@mui/joy";
import { Select, MenuItem } from "@mui/material";
import {
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  IconButton,
} from "@mui/material";
import { BsLink45Deg } from "react-icons/bs";
import { AiOutlineClose } from "react-icons/ai";


const Linking = () => {
  const [assetParent, setAssetParent] = React.useState<string[]>([]);
  const [assetChild, setAssetChild] = React.useState<string[]>([]);
  const [open, setOpen] = useState(false);


  const openPopUp = () => {
    setOpen(true);
  };

  const closePopUp = () => {
    setOpen(false);
  };

  const handleParentChange = (event: SelectChangeEvent<typeof personName>) => {
    const {
      target: { value },
    } = event;
    setAssetParent(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  const handleChildChange = (event: SelectChangeEvent<typeof personName>) => {
    const {
      target: { value },
    } = event;
    setAssetChild(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  return (
    <>
       <Box sx={{ paddingBottom: "20px" }}>
                <Typography level="h4">Linking</Typography>
              </Box>
              <Divider></Divider>
              <Box sx={{ mt: "20px", display: "flex", gap: "15px" }}>
                <Checkbox />
                <Box>
                  <Typography>Transact as a whole</Typography>
                </Box>
              </Box>
              <Box sx={{ mt: "10px" }}>
                <Typography>
                  Select this checkbox to indicate that this asset and its
                  linking assets should be audited/check-out/checked-in,etc.,as
                  a group
                </Typography>
                <Button
                  onClick={openPopUp}
                  sx={{
                    paddingY: "10px",
                    mt: "10px",
                    mr: "10px",
                    background: "#13b457",
                    borderRadius: "15px",
                    "&:hover": {
                      backgroundColor: "#0d903f",
                    },
                  }}
                >
                  {" "}
                  <BsLink45Deg size={23} /> Link Parent Asset
                </Button>
                <Dialog open={open} onClose={closePopUp} fullWidth>
                  <DialogTitle>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <Typography variant="h6">
                        Link as Asset as Parent
                      </Typography>
                      <IconButton onClick={closePopUp}>
                        <AiOutlineClose />
                      </IconButton>
                    </Box>
                  </DialogTitle>
                  <Divider></Divider>
                  <DialogContent>
                    <Box
                      sx={{
                        display: "flex",
                        gap: "15px",
                        alignItems: "center",
                        width: "100%",
                        justifyContent: "center",
                        mb: "25px",
                      }}
                    >
                      Assets
                      <Select
                        value={assetParent}
                        onChange={handleParentChange}
                        displayEmpty
                        renderValue={(selected) => {
                          if (
                            selected?.length === 0 ||
                            selected === undefined
                          ) {
                            return "Search Asset Tag ID or Description";
                          }
                          return selected;
                        }}
                        sx={{ borderRadius: "15px" }}
                      >
                        <MenuItem value="" disabled>
                          Search Asset Tag ID or Description
                        </MenuItem>
                        <MenuItem value="Asset 1asdfasdfa adasfd">
                          Asset 1
                        </MenuItem>
                        <MenuItem value="Asset 2 adfa sdfasfadf ">
                          Asset 2
                        </MenuItem>
                        <MenuItem value="Asset 3 asdf asfdasfaf">
                          Asset 3
                        </MenuItem>
                        <MenuItem value="Asset 4 asdfasdfasfasf ">
                          Asset 3
                        </MenuItem>
                        <MenuItem value="Asset 5 afadfasdfasdff">
                          Asset 3
                        </MenuItem>
                      </Select>
                    </Box>
                    <Divider></Divider>
                  </DialogContent>
                  <DialogActions>
                    <Box
                      sx={{
                        paddingBottom: "10px",
                        display: "flex",
                        gap: "5px",
                      }}
                    >
                      <Button
                        sx={{
                          background: "rgb(245,193,67)",
                          "&:hover": {
                            backgroundColor: "rgb(245,193,67)",
                          },
                        }}
                      >
                        Link
                      </Button>
                      <Button
                        onClick={closePopUp}
                        sx={{
                          background: "white",
                          color: "black",
                          border: "1px solid black",
                          "&:hover": {
                            backgroundColor: "white",
                          },
                        }}
                      >
                        Cancel
                      </Button>
                    </Box>
                  </DialogActions>
                </Dialog>
                <Button
                  onClick={openPopUp}
                  sx={{
                    paddingY: "10px",
                    background: "#13b457",
                    borderRadius: "15px",
                    "&:hover": {
                      backgroundColor: "#0d903f", // Slightly darker color on hover
                    },
                  }}
                >
                  <BsLink45Deg size={23} /> Link Child Asset
                </Button>
                <Dialog open={open} onClose={closePopUp} fullWidth>
                  <DialogTitle>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <Typography variant="h6">
                        Link as Asset as Child
                      </Typography>
                      <IconButton onClick={closePopUp}>
                        <AiOutlineClose />
                      </IconButton>
                    </Box>
                  </DialogTitle>
                  <Divider></Divider>
                  <DialogContent>
                    <Box
                      sx={{
                        display: "flex",
                        gap: "15px",
                        alignItems: "center",
                        width: "100%",
                        justifyContent: "center",
                        mb: "25px",
                      }}
                    >
                      Assets
                      <Select
                        value={assetChild}
                        onChange={handleChildChange}
                        displayEmpty
                        renderValue={(selected) => {
                          if (
                            selected?.length === 0 ||
                            selected === undefined
                          ) {
                            return "Search Asset Tag ID or Description";
                          }
                          return selected;
                        }}
                        sx={{ borderRadius: "15px" }}
                      >
                        <MenuItem value="" disabled>
                          Search Asset Tag ID or Description
                        </MenuItem>
                        <MenuItem value="Asset 1asdfasdfa adasfd">
                          Asset 1
                        </MenuItem>
                        <MenuItem value="Asset 2 adfa sdfasfadf ">
                          Asset 2
                        </MenuItem>
                        <MenuItem value="Asset 3 asdf asfdasfaf">
                          Asset 3
                        </MenuItem>
                        <MenuItem value="Asset 4 asdfasdfasfasf ">
                          Asset 3
                        </MenuItem>
                        <MenuItem value="Asset 5 afadfasdfasdff">
                          Asset 3
                        </MenuItem>
                      </Select>
                    </Box>
                    <Divider></Divider>
                  </DialogContent>
                  <DialogActions>
                    <Box
                      sx={{
                        paddingBottom: "10px",
                        display: "flex",
                        gap: "5px",
                      }}
                    >
                      <Button
                        sx={{
                          background: "rgb(245,193,67)",
                          "&:hover": {
                            backgroundColor: "rgb(245,193,67)",
                          },
                        }}
                      >
                        Link
                      </Button>
                      <Button
                        onClick={closePopUp}
                        sx={{
                          background: "white",
                          color: "black",
                          border: "1px solid black",
                          "&:hover": {
                            backgroundColor: "white",
                          },
                        }}
                      >
                        Cancel
                      </Button>
                    </Box>
                  </DialogActions>
                </Dialog>
              </Box>
    </>
  )
}

export default Linking
