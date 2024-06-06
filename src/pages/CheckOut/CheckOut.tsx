import React, { useState } from 'react'
import {
  Typography,
  Box,
  Button,
  Checkbox,
  Modal,
  Input,
  Table,
  Sheet,
} from '@mui/joy'
import SearchIcon from '../../Assets/search.svg'
import CheckOutForm from './CheckOutForm'
import MaintenanceEmpty from '../../components/Common/MaintenanceEmpty'
import AppView from '../../components/Common/AppView'
import AppButton from '../../components/Common/AppButton'

const assets = [
  {
    id: 'BBC-BLR-BKS-1000',
    description: 'HP laptop',
    status: 'Checked Out',
    assignedTo: 'Sanjana H',
    site: 'Hubli',
    location: 'Gokul RD/hubli',
    leaseTo: '',
  },
  {
    id: 'BBC-BLR-BKS - 1001',
    description:
      '12th Gen, Intel Core i3-N305 Processor 1.8 GHz (6MB Cache, up to 3.8 GHz turbo boost, 8 cores, 8 threads)',
    status: 'Checked Out',
    assignedTo: 'Kavita G',
    site: 'Hubli',
    location: 'Gokul RD',
    leaseTo: '',
  },
  {
    id: 'BBC-BLR-BKS - 1001',
    description:
      '12th Gen, Intel Core i3-N305 Processor 1.8 GHz (6MB Cache, up to 3.8 GHz turbo boost, 8 cores, 8 threads)',
    status: 'Checked Out',
    assignedTo: 'Kavita G',
    site: 'Hubli',
    location: 'Gokul RD',
    leaseTo: '',
  },
  {
    id: 'BBC-BLR-BKS - 1001',
    description:
      '12th Gen, Intel Core i3-N305 Processor 1.8 GHz (6MB Cache, up to 3.8 GHz turbo boost, 8 cores, 8 threads)',
    status: 'Checked Out',
    assignedTo: 'Kavita G',
    site: 'Hubli',
    location: 'Gokul RD',
    leaseTo: '',
  },
  {
    id: 'BBC-BLR-BKS-1002',
    description:
      '12th Gen, Intel Core i3-N305 Processor 8/18 GHz (8MB Cache, up to 3.8 GHz Turbo boost, 8 cores, 8 threads)',
    status: 'Checked Out',
    assignedTo: 'Shruti K',
    site: 'Bagalkot',
    location: 'Old Bagalkot',
    leaseTo: '',
  },
  {
    id: 'BBC-BLR-BKS-1002',
    description:
      '12th Gen, Intel Core i3-N305 Processor 8/18 GHz (8MB Cache, up to 3.8 GHz Turbo boost, 8 cores, 8 threads)',
    status: 'Checked Out',
    assignedTo: 'Shruti K',
    site: 'Bagalkot',
    location: 'Old Bagalkot',
    leaseTo: '',
  },
]

const CheckOut: React.FC = () => {
  const [open, setOpen] = useState(false)
  const [searchKeyword, setSearchKeyword] = useState('')
  const [selectedAssets, setSelectedAssets] = useState<string[]>([])
  const [remainingAssets, setRemainingAssets] = useState(assets)

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchKeyword(event.target.value)
  }

  const handleCheckboxChange = (id: string) => {
    setSelectedAssets((prevSelectedAssets) =>
      prevSelectedAssets.includes(id)
        ? prevSelectedAssets.filter((assetId) => assetId !== id)
        : [...prevSelectedAssets, id],
    )
  }

  const handleAddToList = () => {
    const addedAssets = remainingAssets.filter((asset) =>
      selectedAssets.includes(asset.id),
    )
    setRemainingAssets(
      remainingAssets.filter((asset) => !selectedAssets.includes(asset.id)),
    )
    handleClose()
  }

  const filteredAssets = assets.filter((asset) =>
    asset.description.toLowerCase().includes(searchKeyword.toLowerCase()),
  )

  const selectedAssetData = assets.filter((asset) =>
    selectedAssets.includes(asset.id),
  )

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
          onClick={handleOpen}
          sx={{
            backgroundColor: '#13B457',
            color: 'white',
            '&:hover': { backgroundColor: 'darkgreen' },
          }}
        >
          + Select Assets
        </Button>
      </Box>

      {selectedAssetData.length > 0 ? (
        <CheckOutForm selectedAssets={selectedAssetData} />
      ) : (
        <Box>
          <MaintenanceEmpty />
        </Box>
      )}

      <Modal open={open} onClose={handleClose} sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Box
          sx={{
            background: '#fff',
            padding: 2,
            borderRadius: '10px',
            width: '80%'
          }}
        >
          <Typography level="h4" sx={{ marginBottom: 2 }}>
            Select Assets
          </Typography>
          <Box
            sx={{
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              marginRight: '20px',
              marginBottom: '20px',
            }}
          >
            <Input
              placeholder="Search type of keywords"
              value={searchKeyword}
              onChange={handleSearchChange}
              sx={{
                width: '300px',
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
          <Sheet
        
        sx={{ 
          width: '100%',
          borderRadius: 'sm',
          flexShrink: 1,
          height: '70vh',
          overflow: 'auto',
          '&::-webkit-scrollbar': {
            width: '6px', 
          },
          '&::-webkit-scrollbar-track': {
            background: '#f1f1f1', 
          },
          '&::-webkit-scrollbar-thumb': {
            background: '#888', 
            borderRadius: '10px', 
          },
          '&::-webkit-scrollbar-thumb:hover': {
            background: '#555', 
          },
        }}
      >
            <Table
              aria-labelledby="tableTitle"
          stickyHeader
        
          sx={{
            fontSize: '10px',
            border: '1px solid #f2f2f2',
          }}
            >
              <thead>
                <tr>
                  <th
                    style={{
                      width: 20,
                      border: '1px solid #f2f2f2',
                      background: '#fff8e6',
                    }}
                  >
                    <Checkbox size="sm" />
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
                </tr>
              </thead>
              <tbody>
                {filteredAssets.map((asset, index) => (
                  <tr key={index}>
                    <td
                      style={{
                        
                        border: '1px solid #f2f2f2',
                        
                      }}
                      color="#FFFFFF33"
                    >
                      <Checkbox
                      size="sm"
                        checked={selectedAssets.includes(asset.id)}
                        onChange={() => handleCheckboxChange(asset.id)}
                      />
                    </td>
                    <td
                      style={{  border: '1px solid #f2f2f2' }}
                      color="#4880FF"
                    >
                      {asset.id}
                    </td>
                    <td style={{  border: '1px solid #f2f2f2' }}>
                      {asset.description}
                    </td>
                    <td
                      style={{  border: '1px solid #f2f2f2' }}
                      color="#13B457"
                    >
                      {asset.status}
                    </td>
                    <td style={{  border: '1px solid #f2f2f2' }}>
                      {asset.assignedTo}
                    </td>
                    <td style={{  border: '1px solid #f2f2f2' }}>
                      {asset.site}
                    </td>
                    <td style={{  border: '1px solid #f2f2f2' }}>
                      {asset.location}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Sheet>
          <Box sx={{ display: 'flex', mt: 2, justifyContent: 'flex-end' }}>
            <AppButton
            
              onClick={handleClose}
            
              size='sm'
            >
              Cancel
            </AppButton>
            <AppButton onClick={handleAddToList} size='sm'>
              Add to List
            </AppButton>
          </Box>
        </Box>
      </Modal>
    </AppView>
  )
}

export default CheckOut