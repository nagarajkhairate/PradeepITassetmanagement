import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Table,
  Divider,
  Menu,
  MenuButton,
  Dropdown,
  Chip,
  IconButton,
} from "@mui/joy";
import PrintIcon from '@mui/icons-material/Print';
import EditIcon from '@mui/icons-material/Edit';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Link, useNavigate } from "react-router-dom";
import AppView from "../../components/Common/AppView";
import HPLaptopImg from "../../Assets/hp-15.png"
import moreOptionsConfig from "./moreOptionsConfig";
import CheckOutOption from "../CheckOut/CheckOutOption";
import { fetchCheckOut } from "../../redux/features/CheckOutSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { ThunkDispatch } from "redux-thunk";

interface AssetInfoProps {
  id:string,
  assets:any
}

interface Option {
  label: string;
  icon: React.ElementType; 
  divider?: boolean;
}
const ViewAssetInfo: React.FC<AssetInfoProps> = ({ id, assets }) => {
  const dispatch: ThunkDispatch<RootState, void, any> = useDispatch()
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const checkOut = useSelector((state: RootState) => state.checkOut.data);

  useEffect(() => {
    dispatch(fetchCheckOut());
  }, [dispatch]);

  const openPopUp = () => {
    setOpen(true);
  };

  const closePopUp = () => {
    setOpen(false);
  };
  const openDropdown = () => {
    setOpen(true);
  };

  const closeDropdown = () => {
    setOpen(false);
  };
 
  const handleAssignAssetId = ()=>{
    setOpen((prevData: any) => ({
      ...prevData,
     assetId:assets[0].id
   }))
  }

  const handleMenuItemClick = (option: any) => {
    if (option.label === "Check Out") {
      openPopUp();
    } else if (option.path) {
      navigate(option.path);
    }
     handleAssignAssetId()
  };

  const statusColorMap: Record<string, string> = {
    Available: "success",
    CheckedOut: "neutral",
  };

  const getAssignTo = (id:any) => {
    const assignment = checkOut && checkOut.find(assign => assign.assetId === id);
    console.log(assignment)
    return assignment ? assignment.assignedTo : null;
  };
  
  return (
    <AppView>
      <Box
        sx={{
          borderRadius: "16px",
          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
          background: "#ffffff",
          padding: "20px",
          mt: "30px",
        }}
      >
        <Box
          sx={{
            my: 2,
            display: "flex",
            gap: "5px",
            flexDirection: { xs: "column", md: "row" },
          }}
        >
          <Button
            sx={{
              background: "#767676",
              borderRadius: "15px",
              padding: "10px",
              paddingX: "35px",
              "&:hover": {
                backgroundColor: "#555555",
              },
            }}
          >
            <PrintIcon sx={{ size: "23" }} /> Print
          </Button>
          <Link to={`/assets/edit-an-asset/${id}`} >
            <Button
              sx={{
                background: "#767676",
                borderRadius: "15px",
                "&:hover": {
                  backgroundColor: "#555555",
                },
                height: '100%',
                width: "100%"
              }}
            >
              <EditIcon sx={{ size: "23" }} /> Edit Asset
            </Button>
          </Link>
          <Dropdown>
        <MenuButton
          sx={{
            background: "#13b457",
            borderRadius: "15px",
            "&:hover": {
              backgroundColor: "#0d903f",
            },
            color: "#ffffff",
          }}
        >
          More Actions <KeyboardArrowDownIcon />
        </MenuButton>
        <Menu>
          {moreOptionsConfig.map((option, index) =>
            option.divider ? (
              <Divider key={index} />
            ) : (
              <IconButton key={index} sx={{ color: "#000000" }} onClick={() => handleMenuItemClick(option)}>
                {React.createElement(option.icon)}
                {option.label}
              </IconButton>
            )
          )}
        </Menu>
      </Dropdown>

      <CheckOutOption open={open} closePopUp={closePopUp} />
          {/* <CheckOutOption open={open} />  */}
        </Box>
        <Box
          sx={{
            display: "flex",
            gap: "30px",
            width: "100%",
            justifyContent: "space-evenly",
            flexDirection: { xs: "column", md: "row" },
          }}
        >
          <Box
            sx={{
              border: "1px solid black",
              width: { xs: "100%", md: "280px" },
              height: "265px",
            }}
          >
            <img
              src={HPLaptopImg}
              style={{ width: "100%", height: "200px" }}
              alt=""
            />
          </Box>
          <Box
            sx={{
              height: "265px",
              width: { md: "450px", xs: "100%" },
              border: "1px solid black",
              overflowX: "auto",
            }}
          >
            <Table borderAxis="both">
              <tbody>
              <tr>
                  <th scope="row">Asset Name</th>
                  <td>{assets.assetName}</td>
                </tr>
                <tr>
                  <th scope="row">Asset Tag ID</th>
                  <td>{assets.assetTagId}</td>
                </tr>
                <tr>
                  <th scope="row">Purchase Date</th>
                  <td>{assets.purchaseDate}</td>
                </tr>
                <tr>
                  <th scope="row">Cost</th>
                  <td>{assets.cost}</td>
                </tr>
                <tr>
                  <th scope="row">Brand</th>
                  <td>{assets.brand}</td>
                </tr>
                <tr>
                  <th scope="row">Model</th>
                  <td>{assets.model}</td>
                </tr>
              </tbody>
            </Table>
          </Box>
          <Box
            sx={{
              width: { md: "450px", xs: "100%" },
              border: "1px solid black",
              overflowX: "auto",
            }}
          >
            <Table borderAxis="both">
              <tbody>
                 <tr>
                  <th scope="row">Site</th>
                  <td>{assets.site.name}</td>
                </tr>
                <tr>
                  <th scope="row">Location</th>
                  <td>{assets.location.name}</td>
                </tr>
                <tr>
                  <th scope="row">Category</th>
                  <td>{assets.category.name}</td>
                </tr>
                <tr>
                  <th scope="row">Department</th>
                  <td>{assets.department.name}</td>
                </tr>
                <tr>
                  <th scope="row">Assigned To</th>
                  <td>{getAssignTo(assets.assignedTo)}</td>
                </tr>
                <tr>
                  <th scope="row">Status</th>
                  <td>
                  <Chip
          variant="soft"
          size="sm"
          color={statusColorMap[assets.status as keyof typeof statusColorMap] as 'success' | 'neutral'}
        >
          {assets.status}
        </Chip>
                </td>
                </tr> 
              </tbody>
            </Table>
          </Box>
        </Box>
        </Box>
    </AppView>
  );
};

export default ViewAssetInfo;



// interface Asset {
//   // discription:string;
//   assetTagId: string;
//   purchaseDate: string;
//   cost: string;
//   brand: string;
//   model: string;
//   site: string;
//   location: string;
//   category: string;
//   department: string;
//   assignedTo: string;
//   status: string;
// }

// const data: Asset[] = [
//   {
//     // "discription":"HP Pavillion 14-ek 1074TU Intel core i5 13th gen(14inch, 16GB, 512GB
//     //   windows 11 home, MS Office 2021, Intel UHD,FHD IPS Display)",
//     assetTagId: "BBC-BLR-BKS-1029",
//     purchaseDate: "06/02/2024",
//     cost: "₹36,0000.00",
//     brand: "Asus VivoBook",
//     model: "VivoBook Go 14",
//     site: "Banashankari ",
//     location: "Bangalore",
//     category: "Computer Equipment",
//     department: "	RPO",
//     assignedTo: "Mr.X",
//     status: "Available",
//   },
// ];

// const EditAssetInfo: React.FC = (props: any) => {
//   const [assetInfodata, setAssetInfodata] = useState(props?.assetInfo || {});
//   const handleUpadtes = (updatedFielddata: any) => {
//     //{"assetTagId":e.target?.value}
//     // TO-Do -  update based on user changes
//     setAssetInfodata((prevState: any) => ({
//       ...prevState,
//       ...updatedFielddata,
//     }));
//   };
//   const handleSubmitAssetInfo = () => {
//     props?.dataUpdater({ assetInfo: assetInfodata }, "assetInfo");
//   };

//   const [open, setOpen] = useState(false);
//   const openPopUp = () => {
//     setOpen(true);
//   };

//   const closePopUp = () => {
//     setOpen(false);
//   };


//   return (
//     <>
//       <Box
//         sx={{
//           borderRadius: "16px",
//           boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
//           background: "#ffffff",
//           padding: "20px",
//           mt:"30px"
//         }}
//       >
//         <Box>
//           <Typography>
//             HP Pavillion 14-ek 1074TU Intel core i5 13th gen(14inch, 16GB, 512GB
//             windows 11 home, MS Office 2021, Intel UHD,FHD IPS Display)
//           </Typography>
//         </Box>
//         <Box
//           sx={{
//             my: 2,
//             display: "flex",
//             gap: "5px",
//             flexDirection: { xs: "column", md: "row" },
//           }}
//         >
//           <Button
//             sx={{
//               background: "#767676",
//               borderRadius: "15px",
//               padding: "10px",
//               paddingX: "35px",
//               "&:hover": {
//                 backgroundColor: "#555555", // Slightly darker color on hover
//               },
//             }}
//           >
//             {" "}
//             <PrintIcon size={23} /> Print
//           </Button>
//           <Button
//             sx={{
//               background: "#767676",
//               borderRadius: "15px",
//               "&:hover": {
//                 backgroundColor: "#555555", // Slightly darker color on hover
//               },
//             }}
//           >
//             {" "}
//             <EditIcon size={23} /> Edit Asset
//           </Button>
//           <Dropdown>
//             <MenuButton
//               sx={{
//                 background: "#13b457",
//                 borderRadius: "15px",
//                 "&:hover": {
//                   backgroundColor: "#0d903f", // Slightly darker color on hover
//                 },
//                 color: "#ffffff",
//               }}
//             >
//             More Action <KeyboardArrowDownIcon size={23} />{" "}
//             </MenuButton>
//             <Menu>
//               <MenuItem onClick={openPopUp}>
//                 <PersonIcon />
//                 Check Out
//               </MenuItem>
//               <MenuItem>
//                 <SendIcon /> Lease
//               </MenuItem>
//               <MenuItem>
//                 <ThumbDownIcon /> Lost/Minning
//               </MenuItem>
//               <MenuItem>
//                 <BuildIcon /> Repair
//               </MenuItem>
//               <Divider></Divider>
//               <MenuItem>
//                 <BrokenImageIcon /> Broken
//               </MenuItem>
//               <MenuItem>
//                 <RecyclingIcon /> Dispose
//               </MenuItem>
//               <MenuItem>
//                 <FavoriteIcon /> Donate
//               </MenuItem>
//               <MenuItem>
//                 <SellIcon /> Sell
//               </MenuItem>
//               <Divider></Divider>
//               <MenuItem>
//                 <DeleteIcon /> Delete
//               </MenuItem>
//               <MenuItem>
//                 <EmailIcon /> Email
//               </MenuItem>
//               <MenuItem>
//                 <ContentCopyIcon /> Replicate
//               </MenuItem>
//             </Menu>
//           </Dropdown>
//           <CheckOutDialog  closePopUp={closePopUp} open={open}/>
//         </Box>
//         <Box
//           sx={{
//             display: "flex",
//             gap: "30px",
//             width: "100%",
//             justifyContent: "space-evenly",
//             flexDirection: { xs: "column", md: "row" },
//           }}
//         >
//           <Box
//             sx={{
//               border: "1px solid black",
//               width: { xs: "100%", md: "280px" },
//               height: "250px",
//             }}
//           >
//             <img
//               src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg"
//               style={{ width: "100%", height: "200px" }}
//               alt=""
//             />
//           </Box>
//           <Box
//             sx={{
//               height: "265px",
//               width: { md: "450px", xs: "100%" },
//               border: "1px solid black",
//               overflowX: "auto",
//             }}
//           >
//             <Table borderAxis="both" sx={{}}>
//               <tbody>
//                 <tr>
//                   <th scope="row">Asset Tag ID</th>
//                   {/* <td>{data[0].assetTagId}</td> */}
//                   <td
//                     onChange={(e: any) =>
//                       handleUpadtes({ assetTagId: e.target?.value })
//                     }
//                   >
//                   {assetInfodata?.assetTagId}
//                   </td>
//                 </tr>
//                 <tr>
//                   <th scope="row">Purchase Date</th>
//                   {/* <td>{data[0].purchaseDate}</td> */}
//                   <td>{assetInfodata?.purchaseDate}</td>
//                 </tr>
//                 <tr>
//                   <th scope="row">Cost </th>
//                   {/* <td>{data[0].cost}</td> */}
//                   <td>{assetInfodata?.cost}</td>
//                 </tr>
//                 <tr>
//                   <th scope="row">Brand</th>
//                   {/* <td>{data[0].brand}</td> */}
//                   <td>{assetInfodata?.brand}</td>
//                 </tr>
//                 <tr>
//                   <th scope="row">Model</th>
//                   {/* <td>{data[0].model}</td> */}
//                   <td>{assetInfodata?.model}</td>
//                 </tr>
//               </tbody>
//             </Table>
//           </Box>
//           <Box
//             sx={{
//               width: { md: "450px", xs: "100%" },
//               border: "1px solid black",
//               overflowX: "auto",
//             }}
//           >
//             <Table borderAxis="both">
//               <tbody>
//                 <tr>
//                   <th scope="row">Site</th>
//                   {/* <td>{data[0].site}</td> */}
//                   <td>{assetInfodata?.site}</td>
//                 </tr>
//                 <tr>
//                   <th scope="row">Location</th>
//                   {/* <td>{data[0].location}</td> */}
//                   <td>{assetInfodata?.location}</td>
//                 </tr>
//                 <tr>
//                   <th scope="row">Category </th>
//                   {/* <td>{data[0].category}</td> */}
//                   <td>{assetInfodata?.category}</td>
//                 </tr>
//                 <tr>
//                   <th scope="row">Department</th>
//                   {/* <td>{data[0].department}</td> */}
//                   <td>{assetInfodata?.department}</td>
//                 </tr>
//                 <tr>
//                   <th scope="row">Assigned To</th>
//                   {/* <td>{data[0].assignedTo}</td> */}
//                   <td>{assetInfodata?.assignedTo}</td>
//                 </tr>
//                 <tr>
//                   <th scope="row">Status</th>
//                   {/* <td>{data[0].status}</td> */}
//                   <td>{assetInfodata?.status}</td>
//                 </tr>
//               </tbody>
//             </Table>
//           </Box>
//         </Box>
//       </Box>
//     </>
//   );
// };

// export default EditAssetInfo;
