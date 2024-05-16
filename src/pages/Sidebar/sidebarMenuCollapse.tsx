import { Collapse, List, ListItem, ListItemButton, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
// import { RootState } from '../../../redux/store';
import { useSelector } from 'react-redux';

type Props = {
  item: any;
};

const sidebarMenuCollapse = ({ item }: Props) => {
  const [open, setOpen] = useState(false);

  return (
    <List>
      {open &&
        item.pageSections.map((section: any, index: number) => (
          <ListItem key={index}>
            <Typography variant="subtitle1">{section.sectionName}</Typography>
          </ListItem>
        ))}
    </List>
  );
};

export default sidebarMenuCollapse;

