import React from 'react'

import {
  Typography,
  Box,
  List,
  ListItem,
  ListItemContent,
  ListItemDecorator,
  ListDivider,
  Chip,
  IconButton,
} from '@mui/joy'

import VisibilityIcon from '@mui/icons-material/Visibility'

import { Link } from 'react-router-dom'

interface AssetItem {
  assetTagId: string

  description: string

  brand: string

  purchaseDate: string

  cost: string

  status: string

  serialNumber: string

  assignedTo: string

  id: string
}

interface Props {
  data: AssetItem[]
}

const ListOfAssetsCard: React.FC<Props> = ({ data }) => {
  return (
    <Box sx={{ display: { xs: 'block', sm: 'none' } }}>
      {data.map((item, index) => (
        <React.Fragment key={index}>
          <List
            size="sm"
            sx={{
              background: 'white',
              boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
              borderRadius: '15px',
              mb: 2,
            }}
          >
            <ListItem
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'start',
              }}
            >
              <ListItemContent
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 2,
                  alignItems: 'start',
                }}
              >
                <Typography fontWeight={600}>{item.assignedTo}</Typography>

                <Typography sx={{ mb: 0.5 , fontWeight:"bold"}}>{item.description}</Typography>

                <Typography level="body-xs" fontWeight="bold" >
                  Tag ID: {item.assetTagId}
                </Typography>

                <Box sx={{ display: 'flex', gap: 0.5, mb: 1 }}>
                  <Typography level="body-xs">Brand: {item.brand}</Typography>

                  <Typography level="body-xs">
                    Purchase Date: {item.purchaseDate}
                  </Typography>

                  <Typography level="body-xs">
                    Serial No: {item.serialNumber}
                  </Typography>
                </Box>

                <Typography level="body-xs">&bull;</Typography>

                <Typography level="body-xs" fontWeight="bold">Cost: {item.cost}</Typography>

                <Box>{item.cost}</Box>

                <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                  <IconButton
                    component={Link}
                    to={`/assets/view-an-asset/${item.id}`}
                  >
                    <VisibilityIcon sx={{color:'black'}}/>
                  </IconButton>

                  <Chip color="primary" size="md">
                    {item.status}
                  </Chip>
                </Box>
              </ListItemContent>

              {/* <Chip color="primary" size="md">
                {item.status}
              </Chip> */}
            </ListItem>
          </List>
          {index < data.length - 1 && <ListDivider />}{' '}
          {/* Add divider except for the last item */}
        </React.Fragment>
      ))}
    </Box>
  )
}

export default ListOfAssetsCard
