import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
// import { RootState } from '../../../redux/store'
// import useColorSelector from '../../../configs/useColorSelector'
import {
  ListItem,
  ListItemButton,
  ListItemContent,
  Typography,
  Box,
} from "@mui/joy";
import { Collapse } from "@mui/material";
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import ExtensionIcon from '@mui/icons-material/Extension';
import HomeIcon from '@mui/icons-material/Home';
import FlagIcon from '@mui/icons-material/Flag';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile'; 
import BuildIcon from '@mui/icons-material/Build';
import SettingsIcon from '@mui/icons-material/Settings';
import { useState } from "react";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';



const SidebarItem = ({ item }: any) => {
  //   const styleConfigs = useColorSelector()
  //   const { appState } = useSelector((state: RootState) => state.appState)

  const getIcon = (pageName: any) => {
    switch (pageName) {
      case "Dashboard":
        return <HomeIcon />;
      case "Alerts":
        return <FlagIcon />;
      case "Assets":
        return <ExtensionIcon />;
      case "Lists":
        return <FormatListBulletedIcon />;
      case "Reports":
        return <InsertDriveFileIcon />;
      case "Tools":
        return <BuildIcon />;
      case "Advanced":
        return <ExtensionIcon />;
      case "SetUp":
        return <SettingsIcon />;
      case "Help/Support":
        return <ExtensionIcon />;
    }
  };

  const [open, setOpen] = useState(false); // State to track expansion
  const handleItemClick = (event:any) => {
    if (item.children) {
      event.preventDefault()
      setOpen(!open); // Toggle expansion state

    }
}
  return item && item.path ? (
    <>
      <ListItemButton
        component={Link}
        to={item.children ? "#" : item.path || "#"}
        onClick={handleItemClick} // Handle click to toggle expansion
        color="none"
        sx={{
            mt:"10px", 
          width: "112%",
          "&:hover": {
            background: "#FEF8E8",
            borderLeft: "5px solid #FABC1E",
          },
          "&:active": {
            backgroundColor: "#FCEEB0", // Slightly darker color on click
          },
        }}
      >
        <ListItemContent
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: "20px",
            justifyContent: "flex-start",
            alignItems: "center",
            width: "100%",
            cursor: "pointer",
            paddingLeft: "15px",
            position: "relative",
          }}
        >
          <Typography level="title-lg" sx={{ paddingTop: "4px" }}>
            {getIcon(item.pageName)}
          </Typography>
          <Typography level="title-md" sx={{ paddingTop: "0px" }}>
            {item.pageName}
          </Typography>
          {item.arrow && (
            <Typography
              level="title-lg"
              sx={{ position: "absolute", right: "1px", paddingTop: "4px" }}
            >
              {open ? <KeyboardArrowDownIcon /> : <KeyboardArrowRightIcon />}
            </Typography>
          )}
        </ListItemContent>
      </ListItemButton>
      {item.children && (
        <Collapse in={open} timeout="auto" unmountOnExit>
          {item.children.map((child: any, index: number) => (
            <ListItem
              key={index + `${item.pageName}`}
              sx={{
                mb:"8px",
                pl: 8,
                width: "112%",
                cursor: "pointer",
                "&:hover": {
                  background: "#F8F8F8",
                },
                "&:active": {
                  background: "#F0F0F0",
                },
              }}
            >
            <Link to={child.path} style={{textDecoration:"none",color:"inherit"}}>
              {" "}
              {/* Adjust padding as needed */}
              <Box sx={{ display: "flex", alignItems: "center", gap: "8px" }}>
                {child.icon}
                <Typography> {child.name}</Typography>
              </Box>
            </Link>
            </ListItem>
          ))}
        </Collapse>
      )}
    </>
  ) : null;
};

export default SidebarItem;