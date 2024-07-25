import React, { useState, useEffect } from 'react'
import {
  Typography,
  Box,
  Button,
  Select,

  Chip,
  Option,
} from '@mui/joy'
import Table from '@mui/joy/Table'
import SearchIcon from '@mui/icons-material/Search'
import FileUploadIcon from '@mui/icons-material/FileUpload'

import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye'
import { useMediaQuery } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import ListOfAssetsCard from './ListOfAssetsCard'
import { useSelector, useDispatch } from 'react-redux'
import { ThunkDispatch } from '@reduxjs/toolkit'
import { Link } from 'react-router-dom'
import AppView from '../../components/Common/AppView'
import { fetchAssets } from '../../redux/features/AssetSlice'
import { RootState } from '../../redux/store'

const ListOfAssets = () => {
  const assets = useSelector((state: RootState) => state.assets.data)
  const dispatch: ThunkDispatch<RootState, void, any> = useDispatch()
  const [listData, setListData] = useState<any[]>([])
  const theme = useTheme()
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'))

  useEffect(() => {
    dispatch(fetchAssets())
  }, [dispatch])

  useEffect(() => {
    const camelCaseAssets = assets.map((asset: any) => ({
      ...asset,
      assetName: toCamelCase(asset.assetName),
      assetTagId: toCamelCase(asset.assetTagId),
      description: toCamelCase(asset.description),
      brand: toCamelCase(asset.brand),
      status: toCamelCase(asset.status),
    }))
    setListData(camelCaseAssets)
  }, [assets])

  const toCamelCase = (str: string | null | undefined): string => {
    if (!str) return ''
    return str.charAt(0).toUpperCase() + str.slice(1)
  }

  const statusColorMap: Record<string, string> = {
    Available: 'success',
    CheckedOut: 'neutral',
  }

  return (
    <AppView>
      <Typography level="h3">List Of Assets</Typography>
      <Box
        sx={{
          borderRadius: '15px',
          boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
          background: '#ffffff',
          gap: '5px',
          padding: 2,
        }}
      >
        <Box
          sx={{
            mt: '40px',
            width: '100%',
            display: 'flex',
            justifyContent: isSmallScreen ? 'center' : 'space-between',
            flexDirection: { xs: 'column', md: 'row' },
            alignItems: isSmallScreen ? 'center' : 'flex-start',
          }}
        >
          <Box>
            <Button
              type="button"
              variant="solid"
              autoFocus
              sx={{
                background: '#1CCAB8',
                color: 'white',
                borderRadius: '15px',
              }}
            >
              <SearchIcon />
              Search Criteria
            </Button>
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: isSmallScreen ? 'column' : 'row',
              alignItems: isSmallScreen ? 'center' : 'flex-start',
              justifyContent: isSmallScreen ? 'center' : 'flex-start',
              width: isSmallScreen ? '100%' : 'auto',
            }}
          >
            <Button
              variant="solid"
              autoFocus
              sx={{
                background: '#388e3c',
                color: 'white',
                borderRadius: '15px',
                marginTop: '0.1',
              }}
            >
              <FileUploadIcon />
              Export to Excel
            </Button>

            {/* <Link to="/assets/list-of-assets/set-up-columns" style={{ textDecoration: "none" }}>
            <Button
              size="md" // Medium size
              sx={{
                background: "#000000",
                width: "200px",
                borderRadius: "15px",
                paddingInline: "0px",
                m: { xs: "10px", md: "none" },
                "&:hover": {
                  background: "#000000",
                },
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  width: "90%",
                  justifyContent: "space-around",
                  alignItems: "center",
                  marginTop: "0.5rem",
                }}
              >
                <Typography sx={{ color: "white" }}>
                  <SettingsRoundedIcon sx={{ size: "23" }} />
                </Typography>
                <Typography
                  sx={{
                    color: "white",
                    fontWeight: "400",
                    fontSize: "20px",
                    marginTop: "-0.25rem",
                  }}
                >
                  Set Up Column
                </Typography>
              </Box>
            </Button>
          </Link> */}
          </Box>
        </Box>
        <Box sx={{ my: '20px', width: '80px' }}>
          <Select
            placeholder="10"
            sx={{ height: '40px', borderRadius: '15px' }}
          >
            <Option value="10">10</Option>
            <Option value="25">25</Option>
            <Option value="50">50</Option>
          </Select>
        </Box>

        {isSmallScreen ? (
          <ListOfAssetsCard data={listData} />
        ) : (
          <Box
            sx={{
              width: '100%',
              overflowX: 'auto',
            }}
          >
            <Table>
              <thead>
                <tr>
                  {/* <th style={{ background: "#f9f9f9", borderBottom: "none" }}>
                  <Checkbox />
                </th> */}
                  <th
                    style={{
                      background: '#f9f9f9',
                      borderBottom: 'none',
                      color: '#959595',
                    }}
                  >
                    Asset Name
                  </th>
                  <th
                    style={{
                      background: '#f9f9f9',
                      borderBottom: 'none',
                      color: '#959595',
                    }}
                  >
                    Assets Tag ID
                  </th>
                  <th
                    style={{
                      background: '#f9f9f9',
                      borderBottom: 'none',
                      color: '#959595',
                    }}
                  >
                    Description
                  </th>
                  <th
                    style={{
                      background: '#f9f9f9',
                      borderBottom: 'none',
                      color: '#959595',
                    }}
                  >
                    Brand
                  </th>
                  <th
                    style={{
                      background: '#f9f9f9',
                      borderBottom: 'none',
                      color: '#959595',
                    }}
                  >
                    Purchase Date
                  </th>
                  <th
                    style={{
                      background: '#f9f9f9',
                      borderBottom: 'none',
                      color: '#959595',
                    }}
                  >
                    Cost
                  </th>
                  <th
                    style={{
                      background: '#f9f9f9',
                      borderBottom: 'none',
                      color: '#959595',
                    }}
                  >
                    Status
                  </th>
                  <th
                    style={{
                      background: '#f9f9f9',
                      borderBottom: 'none',
                      color: '#959595',
                    }}
                  >
                    Serial No.
                  </th>
                  <th
                    style={{
                      background: '#f9f9f9',
                      borderBottom: 'none',
                      color: '#959595',
                    }}
                  >
                    Action
                  </th>
                </tr>
              </thead>

              <tbody
                style={{
                  background: 'white',
                  boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
                }}
              >
                {listData.length > 0 ? (
                  listData.map((item: any, index: number) => (
                    <tr key={index}>
                      {/* <td>
                    <Checkbox />
                  </td> */}
                      <td>{item.assetName}</td>
                      <td>{item.assetTagId}</td>
                      <td>{item.description}</td>
                      <td>{item.brand}</td>
                      <td>{item.purchaseDate}</td>
                      <td>{item.cost}</td>
                      <td>
                        <Chip
                          variant="soft"
                          size="sm"
                          color={
                            statusColorMap[
                              item.status as keyof typeof statusColorMap
                            ] as 'success' | 'neutral'
                          }
                        >
                          {item.status}
                        </Chip>
                      </td>
                      <td>{item.serialNumber}</td>
                      <td style={{ cursor: 'pointer' }}>
                        <Link
                          to={`/assets/view-an-asset/${item.id}`}
                          style={{ color: 'inherit' }}
                        >
                          <RemoveRedEyeIcon
                            sx={{ size: '20', color: 'black' }}
                          />
                        </Link>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={9} style={{ textAlign: 'center' }}>
                      No data Found
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          </Box>
        )}
      </Box>
    </AppView>
  )
}

export default ListOfAssets
