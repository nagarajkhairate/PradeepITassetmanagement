import React, { useEffect, useState, useCallback, useMemo } from 'react'
import {
  Typography,
  Box,
  Button,
  Checkbox,
  Modal,
  Input,
  Table,
  Sheet,
  Chip,
  Divider,
} from '@mui/joy'
import SearchIcon from '../../Assets/search.svg'
import CheckOutForm from './CheckOutForm'
import MaintenanceEmpty from '../../components/Common/MaintenanceEmpty'
import AppView from '../../components/Common/AppView'
import AppButton from '../../components/Common/AppButton'
import { fetchAssets } from '../../redux/features/AssetSlice'
import { ThunkDispatch } from 'redux-thunk'
import { RootState } from '../../redux/store'
import { useDispatch, useSelector } from 'react-redux'
import { fetchEmployee } from '../../redux/features/EmployeeSlice'
import { fetchCheckOut } from '../../redux/features/CheckOutSlice'

interface Asset {
  id: string
  assetTagId: string
  description: string
  status: string
  assignedTo: string
  site: { name: string }
  location: { name: string }
  leaseTo: string
}

const CheckOut: React.FC = () => {
  const [open, setOpen] = useState(false)
  const dispatch: ThunkDispatch<RootState, void, any> = useDispatch()
  const [searchKeyword, setSearchKeyword] = useState('')
  const [selectedAssetIds, setSelectedAssetIds] = useState<string[]>([])
  const assets = useSelector((state: RootState) => state.assets.data)
  const [getAllAssets, setGetAllAssets] = useState<Asset[] | undefined>()
  const [selectedAssets, setSelectedAssets] = useState<Asset[]>()
  const allSelected = assets.length > 0 && assets.every(asset => selectedAssetIds.includes(asset.id));
  const employees = useSelector((state: RootState)=>state.addEmployee.data)
  const checkOut = useSelector((state: RootState) => state.checkOut.data);

  const handleSearchChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearchKeyword(event.target.value)
    },
    [],
  )

  const handleSelectAllChange = (event:any) => {
    if (event.target.checked) {
      setSelectedAssetIds(assets.map(asset => asset.id));
    } else {
      setSelectedAssetIds([]);
    }
  };

  const handleCheckboxChange = useCallback((id: string) => {
    setSelectedAssetIds((prevSelectedAssets) =>
      prevSelectedAssets.includes(id)
        ? prevSelectedAssets.filter((assetId) => assetId !== id)
        : [...prevSelectedAssets, id],
    )
  }, [])

  const handleAddToList = useCallback(() => {
    setSelectedAssets(
      getAllAssets?.filter((asset) => selectedAssetIds.includes(asset.id)),
    )
    setGetAllAssets((prevData) =>
      prevData?.filter((asset) => !selectedAssetIds.includes(asset.id)),
    )
    setOpen(false)
  }, [getAllAssets, selectedAssetIds])

  const statusColorMap: Record<string, string> = useMemo(
    () => ({
      Available: 'success',
      CheckedOut: 'neutral',
    }),
    [],
  )

  useEffect(() => {
    dispatch(fetchAssets())
    dispatch(fetchEmployee())
    dispatch(fetchCheckOut())
  }, [dispatch])

  useEffect(() => {
    setGetAllAssets(assets)
  }, [assets])


  const getEmployeName = (empId: number) =>{
    const employeeName = employees && employees.find(emp => emp.id === empId);
    console.log(checkOut)
    return employeeName ? employeeName.empName: null;
  }

  const getAssignTo = (id:any) => {
    const assignment = checkOut && checkOut.find(assign => assign.assetId === id);
    console.log(checkOut)
    return assignment ? getEmployeName(assignment.assignedTo): null;
  };

  return (
    <AppView>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          flexDirection: { md: 'row', xs: 'column' },
          justifyContent: { xs: 'center', md: 'space-between' },
          gap: '5px',
        }}
      >
        <Typography level="h4">Check-Out</Typography>
        <Button
          onClick={() => setOpen(true)}
          sx={{
            backgroundColor: '#13B457',
            color: 'white',
            '&:hover': { backgroundColor: 'darkgreen' },
          }}
        >
          + Select Assets
        </Button>
      </Box>

      {selectedAssets && selectedAssets.length > 0 ? (
        <CheckOutForm selectedAssets={selectedAssets} />
      ) : (
        <Box>
          <MaintenanceEmpty />
        </Box>
      )}

<Modal
  open={open}
  onClose={() => setOpen(false)}
  sx={{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }}
>
  <Box
    sx={{
      background: '#fff',
      padding: 2,
      borderRadius: '10px',
      width: '90%', // Adjust width for mobile view
      maxWidth: '600px', // Ensure the modal doesn't get too wide
      height: '80vh', // Adjust height to ensure overflow effect
      display: 'flex',
      flexDirection: 'column',
    }}
  >
    <Typography level="h4" sx={{ marginBottom: 2, position: 'sticky', top: 0, background: '#fff', zIndex: 1 }}>
      Select Assets
    </Typography>
    <Divider sx={{ position: 'sticky', top: 40, background: '#fff', zIndex: 1 }} />
    <Box
      sx={{
        // position: 'relative',
        display: 'flex',
        alignItems: 'center',
        marginBottom: '20px',
        marginTop: '20px',
        position: 'sticky',
        top: 60,
        background: '#fff',
        zIndex: 1,
      }}
    >
      <Input
        placeholder="Search type of keywords"
        value={searchKeyword}
        onChange={handleSearchChange}
        sx={{
          width: '100%',
          paddingLeft: '40px',
          height: '20px',
          borderColor: '#7676764D',
          lineHeight: '24px',
          fontSize: '10px',
          border: '1px solid #7676764D',
        }}
      />
      <Box
        component="img"
        src={SearchIcon}
        alt="Search Icon"
        sx={{
          position: 'absolute',
          left: '10px',
          height: '20px',
        }}
      />
    </Box>
    <Box
      sx={{
        flexGrow: 1,
        overflow: 'auto',
      }}
    >
      <Sheet
        sx={{
          width: '100%',
          borderRadius: 'sm',
          flexShrink: 1,
          height: '100%', 
          overflow: 'auto',
        }}
      >
        <Table
          aria-labelledby="tableTitle"
          stickyHeader
          sx={{
            fontSize: '15px',
            border: '1px solid #f2f2f2',
            minWidth: "700px",
          }}
        >
          <thead>
            <tr>
              <th
                style={{
                  width: 30,
                  border: '1px solid #f2f2f2',
                  background: '#fff8e6',
                }}
              >
                <Checkbox size="sm" onChange={handleSelectAllChange} checked={allSelected} />
              </th>
              <th
                style={{
                  border: '1px solid #f2f2f2',
                  background: '#fff8e6',
                }}
              >
                Asset Tag ID
              </th>
              <th
                style={{
                  border: '1px solid #f2f2f2',
                  background: '#fff8e6',
                }}
              >
                Description
              </th>
              <th
                style={{
                  border: '1px solid #f2f2f2',
                  background: '#fff8e6',
                }}
              >
                Status
              </th>
              <th
                style={{
                  border: '1px solid #f2f2f2',
                  background: '#fff8e6',
                }}
              >
                Assigned to
              </th>
              <th
                style={{
                  border: '1px solid #f2f2f2',
                  background: '#fff8e6',
                }}
              >
                Site
              </th>
              <th
                style={{
                  border: '1px solid #f2f2f2',
                  background: '#fff8e6',
                }}
              >
                Location
              </th>
              <th
                style={{
                  border: '1px solid #f2f2f2',
                  background: '#fff8e6',
                }}
              >
                Lease To
              </th>
            </tr>
          </thead>
          <tbody>
            {assets &&
              assets.map((asset) => (
                <tr key={asset.id}>
                  <td
                    style={{
                      border: '1px solid #f2f2f2',
                    }}
                    color="#FFFFFF33"
                  >
                    <Checkbox
                      size="sm"
                      checked={selectedAssetIds.includes(asset.id)}
                      onChange={() => handleCheckboxChange(asset.id)}
                    />
                  </td>
                  <td style={{ border: '1px solid #f2f2f2' }} color="#4880FF">
                    {asset.assetTagId}
                  </td>
                  <td style={{ border: '1px solid #f2f2f2' }}>
                    {asset.description}
                  </td>
                  <td style={{ border: '1px solid #f2f2f2' }}>
                    <Chip
                      variant="soft"
                      size="sm"
                      color={
                        statusColorMap[
                          asset.status as keyof typeof statusColorMap
                        ] as 'success' | 'neutral'
                      }
                    >
                      {asset.status}
                    </Chip>
                  </td>
                  <td style={{ border: '1px solid #f2f2f2' }}>
                  {getAssignTo(asset.id)}
                  </td>
                  <td style={{ border: '1px solid #f2f2f2' }}>
                    {asset.site.name}
                  </td>
                  <td style={{ border: '1px solid #f2f2f2' }}>
                    {asset.location.name}
                  </td>
                  <td style={{ border: '1px solid #f2f2f2' }}>
                    {asset.leaseTo}
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      </Sheet>
    </Box>
    <Divider />
    <Box sx={{ display: 'flex', mt: 2, justifyContent: 'flex-end', position: 'sticky', bottom: 0, background: '#fff', zIndex: 1 }}>
      <AppButton onClick={() => setOpen(false)} size="sm">
        Cancel
      </AppButton>
      <AppButton onClick={handleAddToList} size="sm">
        Add to List
      </AppButton>
    </Box>
  </Box>
</Modal>

    </AppView>
  )
}

export default CheckOut
