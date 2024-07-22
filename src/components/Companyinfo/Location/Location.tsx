import React, { useEffect, useState } from 'react';
import { Box, Checkbox, Stack, Table, Typography, Divider, Button, FormControl, FormLabel, Select, Option } from '@mui/joy';
import { useSelector, useDispatch } from 'react-redux';
import NavigateNextOutlinedIcon from '@mui/icons-material/NavigateNextOutlined';
import NavigateBeforeOutlinedIcon from '@mui/icons-material/NavigateBeforeOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import AddIcon from '@mui/icons-material/Add';
import PublishOutlinedIcon from '@mui/icons-material/PublishOutlined';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import TuneOutlinedIcon from '@mui/icons-material/TuneOutlined';
import { ThunkDispatch } from 'redux-thunk';
import { RootState } from '../../../redux/store';
import { fetchLocation } from '../../../redux/features/LocationSlice';
import EditLocation from './EditLocation';
import AddLocation from './AddLocation';
import DeleteLocation from './DeleteLocation';
import AppView from '../../../components/Common/AppView';

interface LocationProps {
  activeTab: number;
  setActiveTab: (tab: number) => void;
}

const LocationPage: React.FunctionComponent<LocationProps> = ({ activeTab, setActiveTab }) => {
  const dispatch: ThunkDispatch<RootState, void, any> = useDispatch();
  const [matchedSelected, setMatchedSelected] = useState<number[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<any>(null);
  const [open, setOpen] = useState<any>(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const locations = useSelector((state: RootState) => state.location.data);
  const [editOpen, setEditOpen] = useState<boolean>(false);

  const handleEdit = (location: number) => {
    setEditOpen(true);
    setSelectedLocation(location);
  };

  const handleDeleteOpen = () => {
    setDeleteOpen(true);
  };

  const handleDeleteClose = () => {
    setDeleteOpen(false);
    setMatchedSelected([]);
  };

  const handleNext = () => {
    setActiveTab(activeTab + 1);
  };

  const handleBack = () => {
    setActiveTab(activeTab - 1);
  };

  useEffect(() => {
    dispatch(fetchLocation());
  }, [dispatch]);

  return (
    <AppView>
      <Box
        sx={{
          borderRadius: '10px',
          boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
          background: '#ffffff',
          gap: '5px',
          p: 1,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            flexDirection: { xs: 'column', md: 'row' },
            justifyContent: { xs: 'center', md: 'space-between' },
            gap: 2,
            mb: 1,
          }}
        >
          <Box
            sx={{
              textAlign: { xs: 'center', md: 'left' },
            }}
          >
            <Typography
              level="h4"
              sx={{
                fontSize: '20px',
                fontWeight: 500,
                lineHeight: '30px',
                textAlign: { xs: 'center', md: 'left' },
                whiteSpace: 'nowrap',
                mt: 0,
              }}
            >
              <TuneOutlinedIcon
                sx={{
                  fontSize: '1.1rem',
                  color: '#FABC1E',
                  alignItems: 'center',
                }}
              />
              List of Location
            </Typography>
          </Box>

          <Box
            sx={{
              display: 'flex',
              flexDirection: { md: 'row', xs: 'column' },
              gap: 2,
            }}
          >
            <Button
              autoFocus
              variant="solid"
              sx={{
                background: '#388e3c',
                borderRadius: '15px',
                color: 'white',
              }}
              component="label"
              onClick={() => setOpen(true)}
            >
              <AddIcon /> Add New Location
            </Button>

            {matchedSelected.length > 0 && (
              <Button
                onClick={handleDeleteOpen}
                autoFocus
                variant="solid"
                sx={{
                  fontSize: '13px',
                  borderRadius: '15px',
                  background: '#d32f2f',
                  display: 'flex',
                  justifyContent: { md: 'flex-end', xs: 'center' },
                  border: '1px solid red',
                  padding: '.5rem .10rem',
                }}
              >
                <DeleteForeverIcon sx={{ fontSize: '15px' }} />
                Delete Location
              </Button>
            )}

            <Button
              autoFocus
              type="submit"
              variant="solid"
              sx={{
                background: 'black',
                borderRadius: '15px',
                color: 'white',
              }}
            >
              <PublishOutlinedIcon />
              Import Locations
            </Button>
          </Box>
        </Box>

        <Divider />

        <Box>
          <Box sx={{ padding: '10px', marginTop: '10px' }}>
            You may also add Locations. Locations are a subset of Sites. For
            example, the Site may be a building or address. The Location may be
            a specific room, office or floor within the Site. Select a Site and
            add your list of Locations here.
          </Box>

          <Box
            sx={{
              textAlign: { xs: 'center', md: 'left' },
            }}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                flexDirection: { md: 'row', xs: 'column' },
                justifyContent: { xs: 'center', md: 'space-between' },
                marginTop: '1px',
                padding: '10px',
                m: { md: 'none', xs: 'center' },
              }}
            >
              <FormControl
                sx={{
                  display: 'flex',
                  flexDirection: { xs: 'column', md: 'row' },
                  m: { md: 'none', xs: 'center' },
                }}
              >
                <FormLabel
                  sx={{
                    marginTop: '6px',
                    mb: { xs: 1, md: 1 },
                    m: { md: 'none', xs: 'center' },
                  }}
                >
                  Select a Site:
                </FormLabel>

                <Select
                  placeholder="Nothing Selected"
                  sx={{
                    marginLeft: { md: '20px' },
                    alignItems: 'center',
                    background: '#ff5252',
                    color: 'white',
                    borderRadius: '15px',
                  }}
                  required
                >
                  <Option value="Location1">Location1</Option>
                </Select>
              </FormControl>
            </Box>
          </Box>

          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              flexDirection: { md: 'row', xs: 'column' },
              justifyContent: { xs: 'center', md: 'flex-end' },
              padding: '10px',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: { md: 'row' },
                justifyContent: { xs: 'center', md: 'space-between' },
                gap: 1,
              }}
            >
              <Button
                sx={{
                  background: '#FDE8BC',
                  border: '1px solid #C2B083',
                  color: 'black',
                  '&:hover': {
                    background: '#FADFB4',
                  },
                }}
              >
                <NavigateBeforeOutlinedIcon />
              </Button>
              <Button
                sx={{
                  background: '#ffffff',
                  color: 'green',
                  border: '1px solid green ',
                  '&:hover': {
                    color: 'white',
                    background: 'green',
                  },
                }}
              >
                1
              </Button>
              <Button
                sx={{
                  background: '#FDE8BC',
                  border: '1px solid #C2B083',
                  color: 'black',
                  '&:hover': {
                    background: '#FADFB4',
                  },
                }}
              >
                <NavigateNextOutlinedIcon />
              </Button>
            </Box>
          </Box>
        </Box>
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={{ xs: 1, sm: 2, md: 2 }}
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <Box
            sx={{
              overflowX: 'auto',
              fontSize: '14px',
              whiteSpace: 'nowrap',
            }}
          >
            <Table borderAxis="both" style={{ borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <th
                    style={{
                      width: 30,
                      background: '#fff8e6',
                      verticalAlign: 'middle',
                    }}
                  >
                    <Checkbox
                      size="sm"
                      indeterminate={
                        matchedSelected.length > 0 &&
                        matchedSelected.length < locations.length
                      }
                      checked={
                        matchedSelected.length > 0 &&
                        matchedSelected.length === locations.length
                      }
                      onChange={() => {
                        if (
                          matchedSelected.length > 0 &&
                          matchedSelected.length === locations.length
                        ) {
                          setMatchedSelected([]);
                        } else {
                          const newSelecteds = locations.map(
                            (_, index) => index
                          );
                          setMatchedSelected(newSelecteds);
                        }
                      }}
                      sx={{ verticalAlign: 'text-bottom' }}
                    />
                  </th>
                  <th
                    style={{ background: '#fff8e6', verticalAlign: 'middle' }}
                  >
                    Location
                  </th>
                  <th
                    style={{ background: '#fff8e6', verticalAlign: 'middle' }}
                  >
                    Edit
                  </th>
                  <th
                    style={{ background: '#fff8e6', verticalAlign: 'middle' }}
                  >
                    Delete
                  </th>
                </tr>
              </thead>
              <tbody>
                {locations.length > 0 ? (
                  locations.map((location, index) => (
                    <tr key={location.id}>
                      <td>
                        <Checkbox
                          checked={matchedSelected.includes(index)}
                          onChange={() => {
                            const selectedIndex = matchedSelected.indexOf(index);
                            let newSelected: number[] = [];

                            if (selectedIndex === -1) {
                              newSelected = newSelected.concat(matchedSelected, index);
                            } else if (selectedIndex === 0) {
                              newSelected = newSelected.concat(matchedSelected.slice(1));
                            } else if (selectedIndex === matchedSelected.length - 1) {
                              newSelected = newSelected.concat(matchedSelected.slice(0, -1));
                            } else if (selectedIndex > 0) {
                              newSelected = newSelected.concat(
                                matchedSelected.slice(0, selectedIndex),
                                matchedSelected.slice(selectedIndex + 1)
                              );
                            }

                            setMatchedSelected(newSelected);
                          }}
                          color="primary"
                        />
                      </td>
                      <td>{location.location}</td>

                      <td>
                        <Button
                          onClick={() => handleEdit(location)}
                          sx={{
                            fontSize: '13px',
                            background: '#ffffff',
                            color: 'green',
                            display: 'flex',
                            justifyContent: {
                              md: 'flex-end',
                              xs: 'center',
                            },
                            marginLeft: 'none',
                            border: '1px solid green ',
                            borderRadius: '13px',
                            '&:hover': {
                              color: 'white',
                              background: 'green',
                            },
                            padding: '.25rem .55rem',
                          }}
                        >
                          <EditOutlinedIcon sx={{ fontSize: '18px' }} />
                          Edit
                        </Button>
                      </td>

                      <td>
                        <Button
                          sx={{
                            fontSize: '13px',
                            background: '#ffffff',
                            color: '#d32f2f',
                            display: 'flex',
                            justifyContent: { md: 'flex-end', xs: 'center' },
                            marginLeft: 'none',
                            border: '1px solid red ',
                            borderRadius: '13px',
                            '&:hover': {
                              color: 'white',
                              background: '#d32f2f',
                            },
                            padding: '.5rem .15rem',
                          }}
                        >
                          <DeleteForeverIcon sx={{ fontSize: '18px' }} />
                          Delete
                        </Button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} style={{ textAlign: 'center' }}>
                      No Data Found
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          </Box>
        </Stack>
        {open && <AddLocation open={open} setOpen={()=>setOpen(false)} />}
        {editOpen && (
          <EditLocation
            location={selectedLocation}
            editOpen={editOpen}
            setEditOpen={()=>setEditOpen(false)}
          />
        )}

        <Divider />

        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
          <Button
            sx={{
              background: '#388e3c',
              color: 'white',
              '&:hover': { background: '#388e3B' },
              borderRadius: '10px',
            }}
            disabled={activeTab === 0}
            onClick={handleBack}
          >
            Back
          </Button>
          <Button
            sx={{
              background: '#FABC1E',
              color: 'black',
              '&:hover': { background: '#E1A91B' },
              borderRadius: '10px',
            }}
            onClick={handleNext}
          >
            Continue
          </Button>
        </Box>
      </Box>

      <DeleteLocation
        selectedCell={null}
        setMatchedSelected={setMatchedSelected}
        setSelectedCell={() => {}}
        locDatas={{ locationData: [] }}
        setLocDatas={() => {}}
        handleDeleteClose={handleDeleteClose}
        open={deleteOpen}
      />
    </AppView>
  );
};

export default LocationPage;
