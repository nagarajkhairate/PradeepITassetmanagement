import { Typography, Radio, RadioGroup, Divider, Grid } from "@mui/joy";
import { AiFillDatabase } from "react-icons/ai";
import ButtonGroup from "@mui/joy/ButtonGroup";
import React, { useState, useEffect } from "react";
import { Box } from "@mui/joy";
import Table from "@mui/joy/Table";
import Checkbox from "@mui/joy/Checkbox";
import Button from "@mui/joy/Button";
import { FormControl } from "@mui/joy";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import NavigateNextOutlinedIcon from '@mui/icons-material/NavigateNextOutlined';
import NavigateBeforeOutlinedIcon from '@mui/icons-material/NavigateBeforeOutlined';
import DataBaseAdd from "./DataBaseAdd";
import DataBaseEdit from "./DataBaseEdit";

const initialData = {
  data: ["Buldings", "computer Equipments", "transfer"],
};

const tableData = [
  {
    id: 1,
    title: "Asset Tag ID",
    name: "assetId",

    option: [
      {
        id: 1,
        value: "Yes",
      },
    ],
    description:
      "This field holds the unique asset id number that your company assigns to identify each asset. These are generally sequentially numbered labels with barcodes.",
    example: "A-1001",
  },
  {
    id: 2,
    title: "Asset Description",
    name: "assetDec",
    option: [
      {
        id: 1,
        value: "Yes",
      },
    ],

    description: "Description of the asset.",
    example: "HP - Envy Desktop - 12GB Memory - 2TB Hard Drive",
  },

  {
    id: 3,
    title: "Purchase Date",
    name: "PurchasedDate",
    option: [
      {
        id: 1,
        value: "Yes",
      },
      {
        id: 2,
        value: "No",
      },
    ],

    description: "Date asset was purchased",
    example: "08/22/2014",
  },

  {
    id: 4,
    title: "Cost",
    name: "cost",
    option: [
      {
        id: 1,
        value: "Yes",
      },
      {
        id: 2,
        value: "No",
      },
    ],
    description: "Cost of the asset",
    example: "Bs225.75",
  },

  {
    id: 5,
    title: "Purchased From",
    name: "PurchasedForm",
    option: [
      {
        id: 1,
        value: "Yes",
      },
      {
        id: 2,
        value: "No",
      },
    ],
    description: "Vendor/Supplier name",
    example: "Amazon",
  },
  {
    id: 6,
    title: "Brand",
    name: "brand",
    option: [
      {
        id: 1,
        value: "Yes",
      },
      {
        id: 2,
        value: "No",
      },
    ],
    description: "Manufacturer of the asset",
    example: "HP",
  },
  {
    id: 7,
    title: "Model",
    name: "Model",
    option: [
      {
        id: 1,
        value: "Yes",
      },
      {
        id: 2,
        value: "No",
      },
    ],
    description: "Model name of the asset",
    example: "Envy",
  },
  {
    id: 8,
    title: "Serial No",
    name: "Yes",
    option: [
      {
        id: 1,
        value: "Yes",
      },
      {
        id: 2,
        value: "No",
      },
    ],
    description: "Manufacturer's serial number",
    example: "	HG9C3X",
  },
];

interface DataBaseProps {
  companyFormData: any;
  setCompanyFormData: any;
  activeTab: number;
  setActiveTab: (tab: number) => void;
}

const DataBase: React.FunctionComponent<DataBaseProps >  = ({
  companyFormData,
  setCompanyFormData,
  activeTab,
  setActiveTab,
}) => {
  const [matchedSelected, setMatchedSelected] = useState<number[]>([]);
  const [dataBase, setDataBase] = useState<{ data: string[] }>(initialData);
  const [selectedCell, setSelectedCell] = useState<number | null>(null);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  // const [formData, setFormData] = useState([]);

  const addCustomField = (custom: string) => {
    setDataBase({ ...dataBase, data: [...dataBase.data, custom] });
  };

  const deleteCustomField = (index: number) => {
    const updatedData = dataBase.data.filter((_, idx) => idx !== index);
    setDataBase({ ...dataBase, data: updatedData });
  };

  const handleClickEditOpen = () => {
    setEditOpen(true);
  };

  const handleEditClose = () => {
    setEditOpen(false);
    setSelectedCell(null);
  };

  const handleEditButton = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const Custom = (e.target as HTMLFormElement).Custom.value;
    if (selectedCell !== null) {
      const updatedData = dataBase.data.map((item, index) =>
        index === selectedCell ? Custom : item
      );
      setDataBase({ ...dataBase, data: updatedData });
      handleEditClose();
    }
  };

  const handleCheckboxChange = (index: number) => {
    setMatchedSelected((prevSelected) =>
      prevSelected.includes(index)
        ? prevSelected.filter((item) => item !== index)
        : [...prevSelected, index]
    );
    setSelectedCell(index);
  };

  const handleDeleteButton = () => {
    if (selectedCell !== null) {
      handleDeleteOpen();
    }
  };

  const handleDeleteSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const updatedData = dataBase.data.filter(
      (_, index) => index !== selectedCell
    );
    setDataBase({ ...dataBase, data: updatedData });
    setMatchedSelected([]);
    setDeleteOpen(false);
  };

  const handleDeleteOpen = () => {
    setDeleteOpen(true);
  };

  const handleDeleteClose = () => {
    setDeleteOpen(false);
    setMatchedSelected([]);
  };

  useEffect(() => {
    setDataBase(initialData);
  }, []);

  const handleEdit = () => {
    if (selectedCell !== null) {
      handleClickEditOpen();
    }
  };

  const HandleRadioSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setCompanyFormData((prevData: any) => ({ ...prevData, [name]: value }));
  };



  const handleNextTab = () => {
    setCompanyFormData((prevData: any) => ({ ...prevData, dataBase : dataBase}));
    setActiveTab(activeTab + 1); 
  };

  const handlePrevTab = () => {
    setActiveTab(activeTab - 1);
};

  return (
    <>
      <div style={{ width: "100%", background: "#f9f9f9" }}>
        <div style={{ margin: "52px" }}>
          <Box
            sx={{
              borderRadius: "16px",
              boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
              background: "#ffffff",
              margin: {
                xs: "8px",
                md: "52px",
              },
              p: "20px",
            }}
          >
            <Box sx={{ ml: "20px", p: "10px" }}>
              <Typography>
                <AiFillDatabase color="brown" />
                Asset Database Fields
              </Typography>
            </Box>

            <Box sx={{ ml: "20px", py: "10px" }}>
              <Box>
                <Typography level="body-xs">
                  Fill in the appropriate fields for your assets. Asset Tag ID
                  and Asset Description are the only required fields. Check the
                  boxes next to the field names you want to include.
                </Typography>
              </Box>

              <Box sx={{ mt: "10px", overflowX: "auto" }}>
                <Table borderAxis="both" style={{ width: "100%" }}>
                  <thead>
                    <tr>
                      <th style={{ width: 30 }}>
                        <Checkbox />
                      </th>
                      <th style={{ minWidth: 180 }}>Field Name</th>
                      <th style={{ minWidth: 200 }}>Date Required</th>
                      <th style={{ minWidth: 400 }}>Description</th>
                      <th style={{ minWidth: 150 }}>Example</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tableData &&
                      tableData.map((data, index) => (
                        <tr key={index}>
                          <td>
                            <Checkbox />
                          </td>
                          <td>{data.title}</td>
                          <td>
                            <FormControl>
                              <RadioGroup
                                defaultValue="outlined"
                                name="radio-buttons-group"
                              >
                                {data.option &&
                                  data.option.map((option, index) => (
                                    <Radio
                                      name={data.name}
                                      onChange={HandleRadioSelect}
                                      key={index}
                                      value={option.value}
                                      label={option.value}
                                      variant="outlined"
                                    />
                                  ))}
                              </RadioGroup>
                            </FormControl>
                          </td>
                          <td>{data.description}</td>
                          <td>{data.example}</td>
                        </tr>
                      ))}
                  </tbody>
                </Table>
                <Divider sx={{ my: "30px" }}></Divider>
              </Box>
            </Box>

            <b>Asset Custom Fields</b>
            <Box sx={{ marginBottom: "2px" }}>
              Add custom fields to join the standard fields that we provided.
              Feel free to get creative.
            </Box>

            <Box>
              <DataBaseAdd
                dataBase={dataBase}
                setDataBase={setDataBase}
                addCustomField={addCustomField}
                deleteCustomField={deleteCustomField}
              />

              <DataBaseEdit
                matchedSelected={matchedSelected}
                setMatchedSelected={setMatchedSelected}
                dataBase={dataBase}
                setDataBase={setDataBase}
                editOpen={editOpen}
                setEditOpen={setEditOpen}
                deleteOpen={deleteOpen}
                setDeleteOpen={setDeleteOpen}
                selectedCell={selectedCell}
                setSelectedCell={setSelectedCell}
                handleCheckboxChange={handleCheckboxChange}
                handleEdit={handleEdit}
                handleEditButton={handleEditButton} 
                handleDeleteButton={handleDeleteButton} 
                handleDeleteSubmit={handleDeleteSubmit} 
                handleEditClose={handleEditClose} 
                handleDeleteOpen={handleDeleteOpen} 
                handleDeleteClose={handleDeleteClose}
              />
            </Box>

            <Divider sx={{ marginTop: "3%" }} />

            <Grid xs={12} md={4} >
              <React.Fragment>
              <Box sx={{marginTop: "1px", marginBottom: "15px", padding: "20px" }}>
            <ButtonGroup  
              spacing="1rem"
              aria-label="spacing button group"
              sx={{ paddingLeft: "84%" }}
            >
              <Button sx={{ fontSize: "15px" }}
              onClick={handlePrevTab}
              >
                <NavigateBeforeOutlinedIcon />
                
                  Back
              
              </Button>
              <Button sx={{ background: "#fdd835", fontSize: "15px" }}
              onClick={handleNextTab}
              >
                  Continue
                <NavigateNextOutlinedIcon />{" "}
              </Button>
            </ButtonGroup>
            </Box>
              </React.Fragment>
            </Grid>
          </Box>
        </div>
      </div>
    </>
  );
};

export default DataBase;
