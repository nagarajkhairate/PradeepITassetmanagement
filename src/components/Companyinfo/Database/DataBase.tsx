import { Typography, Radio, RadioGroup, Divider, Grid } from "@mui/joy";
// import { AiFillDatabase } from "react-icons/ai";
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
import AppView from "../../Common/AppView";
import SignpostOutlinedIcon from '@mui/icons-material/SignpostOutlined'

const dataBaseTable = [
  {
    id: 1,
    title: "Asset Tag ID",
    name: "assetId",
    option: [
      {
        id: 1,
        value: "yes",
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
        value: "yes",
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
        value: "yes",
      },
      {
        id: 2,
        value: "no",
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
        value: "yes",
      },
      {
        id: 2,
        value: "no",
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
        value: "yes",
      },
      {
        id: 2,
        value: "no",
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
        value: "yes",
      },
      {
        id: 2,
        value: "no",
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
        value: "yes",
      },
      {
        id: 2,
        value: "no",
      },
    ],
    description: "Model name of the asset",
    example: "Envy",
  },
  {
    id: 8,
    title: "Serial No",
    name: "SerialNo",
    option: [
      {
        id: 1,
        value: "yes",
      },
      {
        id: 2,
        value: "no",
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
  id:number
}

const DataBase: React.FunctionComponent<DataBaseProps> = ({
  companyFormData,
  setCompanyFormData,
  activeTab,
  setActiveTab,
}) => {
  const [matchedSelected, setMatchedSelected] = useState<number[]>([]);
  const [dataBase, setDataBase] = useState<{ data: string[];dataBaseTable: any[] }>({ data: [], dataBaseTable });
  const [selectedCell, setSelectedCell] = useState<number | null>(null);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [eventForm, setEventForm] = useState<any>({})

  const addCustomField = (custom: string) => {
    setDataBase({ ...dataBase, data: [...dataBase.data, custom] });
  };

  // const addCustomField = (custom: string) => {
  //   const updatedDataBase = { ...dataBase, data: [...dataBase.data, custom] };
  //   setDataBase(updatedDataBase);
  //   console.log(JSON.stringify(updatedDataBase, null, 2)); // Log formatted JSON
  // };

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

  const handleEdit = () => {
    if (selectedCell !== null) {
      handleClickEditOpen();
    }
  };

  const HandleRadioSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setCompanyFormData((prevData: any) => ({ ...prevData, [name]: value }));
  };

  // const HandleRadioSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const { name, value } = event.target;
  //   const updatedTableData = dataBase.dataBaseTable.map((item) =>
  //     item.name === name ? { ...item, selectedOption: value } : item
  //   );
  //   setDataBase({ ...dataBase, dataBaseTable: updatedTableData });
  //   setCompanyFormData((prevData: any) => ({ ...prevData, [name]: value }));
  // };

  // const handleNextTab = () => {
  //   setCompanyFormData((prevData: any) => ({ ...prevData, dataBase : dataBase}));
  //   setActiveTab(activeTab + 1); 
  //   // console.log(JSON.stringify(dataBase));
  // };

  const handleNextTab = () => {
    const transformedTableData = dataBase.dataBaseTable.reduce((acc, item) => {
      acc[item.name] = companyFormData[item.name] || "no";
      return acc;
    }, {});
    setCompanyFormData((prevData: any) => ({
      ...prevData,
      dataBase: {
        data: dataBase.data,
        dataBaseTable: transformedTableData,
      },
    }

      ));
      console.log(JSON.stringify(dataBase, null, 2))
    setActiveTab(activeTab + 1);
  };
  console.log(JSON.stringify(companyFormData))


  const handlePrevTab = () => {
    setActiveTab(activeTab - 1);
};



  return (
    <AppView>
      <Typography
        level="h4"
        sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
      >
        <SignpostOutlinedIcon
          style={{ fontSize: '1.4rem', color: '#d32f2f' }}
        />
        Database
      </Typography>

          <Box
            sx={{
              borderRadius: 'none',
              boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
              background: '#ffffff',
              gap: '5px',
              p: 2,
            }}
          >
            <Box 
            sx={{
              textAlign: { xs: 'center', md: 'left' },
            }}
            >
            <Typography
        level="h4"
        sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
      >
       Asset Database Fields
      </Typography>
            </Box>
            
            <Box sx={{
              textAlign: { xs: 'center', md: 'left',  },
            }}>
              <Box
              sx={{mt:3}}
              >
                <Typography level="body-xs">
                  Fill in the appropriate fields for your assets. Asset Tag ID
                  and Asset Description are the only required fields. Check the
                  boxes next to the field names you want to include.
                </Typography>
              </Box>

              <Box sx={{ mt: "10px", overflowX: "auto" }}>
                <Table borderAxis="both" >
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
                    {dataBase.dataBaseTable.map((data, index) => (
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
                                {data.option.map((opt:any) => (
                                    <Radio
                                      name={data.name}
                                      onChange={HandleRadioSelect}
                                      key={opt.id}
                                      value={opt.value}
                                      label={opt.value}
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
  companyFormData={companyFormData} 
  setCompanyFormData={setCompanyFormData} 
  activeTab={activeTab} 
  setActiveTab={setActiveTab} 
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

            <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              flexDirection: { md: 'row', xs: 'column' },
              justifyContent: { xs: 'center', md: 'flex-end' },
              gap: '5px',
              mt:4
            }}
        >
         
          <Button
            variant="solid"
            sx={{
              background: '#388e3c',
              color: 'white',
              borderRadius:'15px'
            }}
            component="label"
            onClick={handlePrevTab}
          >
            <NavigateBeforeOutlinedIcon />
                
                Back
          </Button>
          <Button
            variant="solid"
            sx={{
              background: "#fdd835",
              color: 'white',
              borderRadius:'15px'
            }}
            component="label"
              onClick={handleNextTab} 
          >
             Continue
             <NavigateNextOutlinedIcon />{" "}
          </Button>
          </Box>
          </Box>
    </AppView>
  );
};

export default DataBase;
