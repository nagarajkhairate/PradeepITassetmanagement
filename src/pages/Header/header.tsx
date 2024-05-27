// import * as React from 'react';
// import Paper from '@mui/material/Paper';
// import InputBase from '@mui/material/InputBase';
// import IconButton from '@mui/material/IconButton';
// import MenuIcon from '@mui/icons-material/Menu';
// import SearchIcon from '@mui/icons-material/Search';
// import DirectionsIcon from '@mui/icons-material/Directions';
// import { Box, Container, Typography,Divider } from '@mui/joy';
// import { CiCircleList } from "react-icons/ci";
// import { RiAddCircleLine } from "react-icons/ri";
// import { BiTime } from "react-icons/bi";
// import { RiPriceTag3Line } from "react-icons/ri";
// import { CgProfile } from "react-icons/cg";
// import { FaAngleDown } from "react-icons/fa";

// const Header = () => {
//     return (
//         <>
//         <Container
//             sx={{
//                 display: 'flex',
//                 justifyContent: 'space-between',
//                 alignItems: 'center',
//                 background:"#f9f9f9",
//                 p:0,
                
//             }}
//             maxWidth={false}    
//             >
//             <Paper
//                 component="form"
//                 sx={{
//                     p: '2px 4px', display: 'flex', alignItems: 'center', width: 400, borderRadius: '10px',
//                     border: '1px solid', borderColor: '#E4E4E4', boxShadow: 'none',m:"23px"
//                 }}
//                 >
//                 <InputBase
//                     sx={{ ml: 1, flex: 1 }}
//                     placeholder="Search type of keywords"
//                     inputProps={{ 'aria-label': 'search google maps' }}
//                     />
//                 <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
//                     <SearchIcon />
//                 </IconButton>

//             </Paper>
            
//             <Box sx={{ display: 'flex', flexDirection: 'row', gap: '10%',paddingLeft:'15%',ml:"100px" }}>
//                 <Typography sx={{ cursor: 'pointer', color: '#767676', fontSize: '100%' }}>
//                     <CiCircleList size={30} />
//                 </Typography>
//                 <Typography sx={{
//                     cursor: 'pointer', color: '#767676', fontSize: '100%'
//                 }}>
//                     <RiAddCircleLine size={30} />
//                 </Typography>
//                 <Typography sx={{ cursor: 'pointer', color: '#767676', fontSize: '100%' }}>
//                     <BiTime size={30} />
//                 </Typography>
//                 <Typography sx={{ cursor: 'pointer', color: '#767676', fontSize: '100%' }}>
//                     <RiPriceTag3Line size={30} />
//                 </Typography>
//             </Box >

//             <Box sx={{
//                 display: 'flex', justifyContent: 'center',
//                 alignItems: 'center', gap: '10%',mr:"50px"
//             }}>
//                 <Typography sx={{ color: '#767676', fontSize: '100%', }}>
//                     <CgProfile size={40} />
//                 </Typography>
//                 <Typography sx={{ fontWeight: 'bold', color: "#1A1A1A", fontSize: '100%', }}>
//                     Pragnya
//                 </Typography>
//                 <Typography sx={{ color: '#767676', fontSize: '100%', paddingTop: "3px", paddingLeft: '10px' }}>
//                     <FaAngleDown size={15} />
//                 </Typography>
//             </Box>
//         </Container >
//         <Divider></Divider>
//         </>
//     );
// }

// export default Header;


import * as React from 'react';
import { useMediaQuery } from '@mui/material';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import { Box, Container, Typography, Divider } from '@mui/material';
import { CiCircleList } from "react-icons/ci";
import { RiAddCircleLine } from "react-icons/ri";
import { BiTime } from "react-icons/bi";
import { RiPriceTag3Line } from "react-icons/ri";
import { CgProfile } from "react-icons/cg";
import { FaAngleDown } from "react-icons/fa";

const Header = () => {
  const isMobile = useMediaQuery('(max-width:600px)');

  return (
    <>
      <Container
        sx={{
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          background: "#f9f9f9",
          p: 0,
          padding: isMobile ? '10px' : '0'
        }}
        maxWidth={false}
      >
        <Paper
          component="form"
          sx={{
            p: '2px 4px',
            display: 'flex',
            alignItems: 'center',
            width: isMobile ? '100%' : 400,
            borderRadius: '10px',
            border: '1px solid',
            borderColor: '#E4E4E4',
            boxShadow: 'none',
            m: isMobile ? '10px 0' : '23px'
          }}
        >
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Search type of keywords"
            inputProps={{ 'aria-label': 'search google maps' }}
          />
          <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
            <SearchIcon />
          </IconButton>
        </Paper>

        <Box sx={{
          display: 'flex',
          flexDirection: 'row',
          gap: isMobile ? '5%' : '10%',
          justifyContent: isMobile ? 'space-around' : 'flex-start',
          width: isMobile ? '100%' : 'auto',
          ml: isMobile ? 0 : '100px'
        }}>
          <Typography sx={{ cursor: 'pointer', color: '#767676', fontSize: '100%' }}>
            <CiCircleList size={30} />
          </Typography>
          <Typography sx={{ cursor: 'pointer', color: '#767676', fontSize: '100%' }}>
            <RiAddCircleLine size={30} />
          </Typography>
          <Typography sx={{ cursor: 'pointer', color: '#767676', fontSize: '100%' }}>
            <BiTime size={30} />
          </Typography>
          <Typography sx={{ cursor: 'pointer', color: '#767676', fontSize: '100%' }}>
            <RiPriceTag3Line size={30} />
          </Typography>
        </Box>
        
        <Box sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '10%',
          mr: isMobile ? 0 : '50px',
          mt: isMobile ? '10px' : 0
        }}>
          <Typography sx={{ color: '#767676', fontSize: '100%' }}>
            <CgProfile size={40} />
          </Typography>
          <Typography sx={{ fontWeight: 'bold', color: "#1A1A1A", fontSize: '100%' }}>
            Pragnya
          </Typography>
          <Typography sx={{ color: '#767676', fontSize: '100%', paddingTop: "3px", paddingLeft: '10px' }}>
            <FaAngleDown size={15} />
          </Typography>
        </Box>
      </Container >
      <Divider />
    </>
  );
}

export default Header;
