
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
// import { RootState } from '../../../redux/store'

// import useColorSelector from '../../../configs/useColorSelector'
import { ListItem, ListItemButton, ListItemContent, Typography } from '@mui/joy'
import { IoIosArrowForward } from 'react-icons/io';
import { LiaPuzzlePieceSolid } from 'react-icons/lia';
import { BiHome } from "react-icons/bi";
import { AiOutlineFlag } from "react-icons/ai";
import { CiCircleList } from "react-icons/ci";
import { PiFileTextLight } from "react-icons/pi";
import { AiOutlineTool } from "react-icons/ai";
import { IoSettingsOutline } from "react-icons/io5";

const SidebarItem = ({ item }: any) => {
    //   const styleConfigs = useColorSelector()
    //   const { appState } = useSelector((state: RootState) => state.appState)

    const getIcon = (pageName: any) => {
        switch (pageName) {
            case 'Dashboard':
                return <BiHome />
            case 'Alerts':
                return <AiOutlineFlag />
            case 'Assets':
                return <LiaPuzzlePieceSolid />
            case 'Lists':
                return <CiCircleList />
            case 'Reports':
                return <PiFileTextLight />
            case 'Tools':
                return <AiOutlineTool />
            case 'Advanced':
                return <LiaPuzzlePieceSolid />
            case 'SetUp':
                return <IoSettingsOutline />
            case 'Help/Support':
                return <LiaPuzzlePieceSolid />

        }

    }

    return item && item.path ? (
    
            <ListItemButton
                component={Link}
                to={item.path}
                // sx={{width:'150%'}}
                sx={{
                    width: '115%', // Ensuring 100% width
                    // '&:hover': {
                    //     backgroundColor: 'rgba(0, 0, 0, 0.04)', // Change background color on hover
                    // },
                }}

            >

                {/* <ListItemContent>
          <Typography level="title-sm">{item.pageName}</Typography>
        </ListItemContent> */}
                <ListItemContent
                    sx={{

                        display: 'flex',
                        flexDirection: 'row',
                        gap: '20px',
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                        width: '100%',
                        cursor: 'pointer',
                        paddingLeft: '15px',
                        position: 'relative',
                        // paddingLeft: '5px', // Adjust the padding as needed
                        '&:hover': {
                            // position:'absolute',
                                
                            borderLeft: '5px solid',
                            borderColor: '#FABC1E',
                        },

                    }}
                >

                    

                    <Typography level="title-lg" sx={{
                        paddingTop: '4px'

                    }}>{getIcon(item.pageName)}</Typography>




                    <Typography level="title-md" sx={{
                        paddingTop: '0px'
                    }}>{item.pageName}</Typography>
                    {item.arrow &&
                        <Typography level="title-lg" sx={{
                            position: 'absolute',
                            right: '1px',
                            paddingTop: '4px'

                        }}><IoIosArrowForward />
                        </Typography>

                    }


                </ListItemContent>
            </ListItemButton>

        
    ) : null;
};

export default SidebarItem;
