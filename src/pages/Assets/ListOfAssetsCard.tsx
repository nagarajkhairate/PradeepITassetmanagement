import React from 'react';
import { Typography, Box, List, ListItem, ListItemContent, ListItemDecorator, ListDivider, Chip } from "@mui/joy";
import VisibilityIcon from '@mui/icons-material/Visibility';

interface AssetItem {
  AssetTagID: string;
  Description: string;
  Brand: string;
  PurchaseDate: string;
  Cost: string;
  Status: string;
  SerialNo: string;
  AssignedTo: string;
}

interface Props {
  data: AssetItem[];
}

const ListOfAssetsCard: React.FC<Props> = ({ data }) => {
  return (
    <>
      <Box
        sx={{ display: { xs: 'block', sm: 'none' } }}
      >
        {data.map((item, index) => (
          <React.Fragment key={index}>
            <List size="sm" sx={{ background: "white", boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)", borderRadius: "15px" }}>
              <ListItem sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                <ListItemContent sx={{ display: 'flex', gap: 2, alignItems: 'start' }}>
                  <ListItemDecorator>
                    <img src="" alt="" /> {/* If you have images, you can use them here */}
                  </ListItemDecorator>
                  <div>
                    <Typography fontWeight={600}>{item.AssignedTo}</Typography>
                    <Typography sx={{ mb: 0.5 }}>{item.Description}</Typography>
                    <Typography level="body-xs">{item.AssetTagID}</Typography>
                    <Box sx={{ display: "flex", gap: 0.5, mb: 1 }}>
                      <Typography level="body-xs">{item.PurchaseDate}</Typography>
                      <Typography level="body-xs">&bull;</Typography>
                      <Typography level="body-xs">{item.SerialNo}</Typography>
                    </Box>
                    <Box>
                      {item.Cost}
                    </Box>
                    <Box>
                      <VisibilityIcon />
                    </Box>
                  </div>
                </ListItemContent>
                <Chip color="primary" size='md'>
                  {item.Status}
                </Chip>
              </ListItem>
            </List>
            {index < data.length - 1 && <ListDivider />} {/* Add divider except for the last item */}
          </React.Fragment>
        ))}
      </Box>
    </>
  )
}

export default ListOfAssetsCard;
