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

  const handleSearchChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearchKeyword(event.target.value)
    },
    [],
  )

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
  }, [dispatch])

  useEffect(() => {
    setGetAllAssets(assets)
  }, [assets])

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
            width: '50%',
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
              height: '50vh',
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
                fontSize: '15px',
                border: '1px solid #f2f2f2',
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
                      >
                        <Checkbox
                          size="sm"
                          checked={selectedAssetIds.includes(asset.id)}
                          onChange={() => handleCheckboxChange(asset.id)}
                        />
                      </td>
                      <td style={{ border: '1px solid #f2f2f2' }}>
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
                        {asset.assignedTo}
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
          <Box sx={{ display: 'flex', mt: 2, justifyContent: 'flex-end' }}>
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
