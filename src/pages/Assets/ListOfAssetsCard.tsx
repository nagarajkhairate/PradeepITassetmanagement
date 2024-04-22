import React from 'react'
import { Typography, Box, Button,List,ListItem,ListItemContent ,ListItemDecorator,ListDivider,Chip} from "@mui/joy";
import { SlEye } from "react-icons/sl";

const data = [
  {
    AssetTagID:"BBC-BLR-BKS - 1014",
    Description:"HP Pavillion 14-ek 1074TU Intel core i5 13th gen(14inch, 16GB, 512GB windows 11 home, MS Office 2021, Intel UHD,FHD IPS Display)",
    Brand:"HP Pavilion",
    PurchaseDate:"06/03/2024",
    Cost:"70,800.00",
    Status:"Checked In",
    SerialNo:"8CG3250PAR",
    AssignedTo:"Piya V"
  },
  {
    AssetTagID:"BBC-BLR-BKS - 10e4",
    Description:"HP Pavillion 14-ek 1074TU Intel core i5 13th gen(14inch, 16GB, 512GB windows 11 home, MS Office 2021, Intel UHD,FHD IPS Display)",
    Brand:"HP Pavilion",
    PurchaseDate:"06/03/2024",
    Cost:"70,865.00",
    Status:"Checked In",
    SerialNo:"8CG3250PAR",
    AssignedTo:"Riya V"
  },

]

const ListOfAssetsCard = () => {
  return (
    <>
    <Box 
    sx={{ display: { xs: 'block', sm: 'none' } }}
    >
      <List size="sm" sx={{background:"white",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
    borderRadius:"15px",
    }}>
      <ListItem 
      sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'start',
            }}
            >
      <ListItemContent sx={{ display: 'flex', gap: 2, alignItems: 'start' }}>
        <ListItemDecorator>
          <img src="" alt="sdf" />
        </ListItemDecorator>
        <div>
          <Typography fontWeight={600}>{data[0].AssignedTo} </Typography>
          <Typography sx={{mb:0.5}}>{data[0].Description} </Typography>
          <Typography level="body-xs">{data[0].AssetTagID} </Typography>
          <Box sx={{display:"flex",gap:0.5,mb:1}}>
          <Typography level="body-xs">{data[0].PurchaseDate} </Typography>
          <Typography level="body-xs">&bull;</Typography>
          <Typography level="body-xs">{data[0].SerialNo} </Typography>
          </Box>
          <Box>
          {data[0].Cost} 
          </Box>
          <Box>
          <SlEye/>
          </Box>
        </div>
      </ListItemContent>
      <Chip color="primary" size='md'>
      {data[0].Status} 
      </Chip>
      </ListItem>
      <ListDivider/>
      </List>
      <List size="sm" sx={{background:"white",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
    borderRadius:"15px",
    }}>
      <ListItem 
      sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'start',
            }}
            >
      <ListItemContent sx={{ display: 'flex', gap: 2, alignItems: 'start' }}>
        <ListItemDecorator>
          <img src="" alt="sdf" />
        </ListItemDecorator>
        <div>
          <Typography fontWeight={600}>{data[1].AssignedTo} </Typography>
          <Typography sx={{mb:0.5}}>{data[1].Description} </Typography>
          <Typography level="body-xs">{data[1].AssetTagID} </Typography>
          <Box sx={{display:"flex",gap:0.5,mb:1}}>
          <Typography level="body-xs">{data[1].PurchaseDate} </Typography>
          <Typography level="body-xs">&bull;</Typography>
          <Typography level="body-xs">{data[1].SerialNo} </Typography>
          </Box>
          <Box>
          {data[1].Cost} 
          </Box>
          <Box>
          <SlEye/>
          </Box>
        </div>
      </ListItemContent>
      <Chip color="primary" size='md'>
      {data[1].Status} 
      </Chip>
      </ListItem>
      <ListDivider/>
      </List>
      
    </Box>
    
    </>
  )
}

export default ListOfAssetsCard
