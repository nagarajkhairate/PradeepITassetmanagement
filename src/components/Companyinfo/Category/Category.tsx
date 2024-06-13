import React from 'react'
import { Box, ButtonGroup, Grid, Sheet } from '@mui/joy'
import { Typography, Divider } from '@mui/joy'
import Button from '@mui/joy/Button'
import { FormControl, FormLabel } from '@mui/joy'
import AddIcon from '@mui/icons-material/Add'
import NavigateNextOutlinedIcon from '@mui/icons-material/NavigateNextOutlined'
import NavigateBeforeOutlinedIcon from '@mui/icons-material/NavigateBeforeOutlined'
import Input from '@mui/joy/Input'
import SignpostOutlinedIcon from '@mui/icons-material/SignpostOutlined'
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import { Select, Option } from '@mui/joy'
import Modal from '@mui/joy/Modal'
import PublishOutlinedIcon from '@mui/icons-material/PublishOutlined'
import { useState } from 'react'
import Category2 from './CategoryEditDelete'
import PlaylistAddCheckOutlinedIcon from '@mui/icons-material/PlaylistAddCheckOutlined'
import AppView from '../../../components/Common/AppView'

type Category = {
  id: number
  categoryName: string
}

interface CategoryProps {
  companyFormData: any;
  setCompanyFormData: any;
  activeTab: number;
  setActiveTab: (tab: number) => void;
}

const Category: React.FunctionComponent<CategoryProps > = (
  {
    companyFormData,
  setCompanyFormData,
    activeTab,
    setActiveTab,
  }
) => {
  const [open, setOpen] = useState<boolean>(false)
  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'))
  const [categoryName, setCategoryName] = useState<string>('')
  const [categories, setCategories] = useState<Category[]>([])

  const handleCategoryChange = (updatedCategories: Category[]) => {
    setCategories(updatedCategories)
    console.log('category: ', JSON.stringify(updatedCategories))
  }

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleAddCategory = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const newCategory: Category = {
      id: categories.length ? categories[categories.length - 1].id + 1 : 1,
      categoryName: categoryName,
    }
    setCategories([...categories, newCategory])
    setCategoryName('') // Clear the input field after adding
    // console.log(newCategory)
    handleClose()
  }


  const handleNextTab = () => {
        setCompanyFormData((prevData: any) => ({ ...prevData, category: Category }));
        setActiveTab(activeTab + 1); 
      };
    
      const handlePrevTab = () => {
        setActiveTab(activeTab - 1);
    };
    

  return (
    <AppView>
      <Typography level="h4" sx={{ display: 'flex', alignItems: 'center' }}>
        <SignpostOutlinedIcon
          style={{ fontSize: '1.4rem', color: '#d32f2f' }}
        />
        Categories
      </Typography>

      <Box
        sx={{
          borderRadius: 'none',
          boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
          background: '#ffffff',
          gap: '5px',
          p:2
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            flexDirection: { xs: 'column', md: 'row' },
            justifyContent: { xs: 'center', md: 'space-between' },
            gap: 2,
            mb: 2,
          }}
        >
          <Box
            sx={{
              textAlign: { xs: 'center', md: 'left' },
            }}
          >
            <Typography
              sx={{
                fontFamily: 'Poppins',
                fontSize: '20px',
                fontWeight: 500,
                lineHeight: '30px',
                textAlign: { xs: 'center', md: 'left' },
                whiteSpace: 'nowrap',
              }}
            >
              <PlaylistAddCheckOutlinedIcon
                style={{ fontSize: '1.4rem', color: '#d32f2f' }}
              />
              List of Categories
            </Typography>
          </Box>

          <Box
            sx={{
              display: 'flex',
              flexDirection: { md: 'row', xs: 'column' },
              gap: 2,
            }}
          >
            <Button
              autoFocus
              variant="solid"
              sx={{
                background: '#388e3c',
                borderRadius: '15px',
                color: 'white',
              }}
              component="label"
              onClick={handleClickOpen}
            >
              <AddIcon /> Add New Category
            </Button>

            <Modal
              aria-labelledby="responsive-dialog-title"
              aria-describedby="modal-desc"
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
              open={open}
              onClose={handleClose}
            >
              <Sheet
                variant="outlined"
                sx={{
                  borderRadius: 'md',
                  maxWidth: 500,
                  p: 3,
                  boxShadow: 'lg',
                }}
              >
                <div>
                  <Typography
                    id="responsive-dialog-title"
                    component="h2"
                    level="h4"
                    textColor="inherit"
                    fontWeight="lg"
                    mb={1}
                  >
                    {'Add a Category'}
                  </Typography>
                  <Divider />

                  <Box sx={{ marginBottom: '10px' }}>
                    <form onSubmit={handleAddCategory}>
                      <FormControl
                        sx={{
                          display: 'flex',
                          flexDirection: 'row',
                          alignItems: 'center',
                        }}
                      ></FormControl>

                      <Box
                        sx={{
                          marginTop: '1px',
                          marginBottom: '15px',
                          padding: '10px',
                        }}
                      >
                        <Typography sx={{ padding: 'none', width: '100%' }}>
                          If you want to add a new category of assets, you’re in
                          the right spot. Add a category for computer equipment,
                          wireless keyboards, or any assets you’re working with.
                        </Typography>
                        <FormControl
                          sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-evenly',
                            marginTop: '10px',
                          }}
                        >
                          <FormLabel
                            sx={{
                              paddingTop: '20px',
                              marginLeft: '20px',
                            }}
                          >
                            Category*:
                          </FormLabel>
                          <Input
                            value={categoryName}
                            onChange={(
                              e: React.ChangeEvent<HTMLInputElement>,
                            ) => setCategoryName(e.target.value)}
                            placeholder="Type here"
                            sx={{
                              marginLeft: '20px',
                              width: '70%',
                              marginTop: '10px',
                            }}
                          />
                        </FormControl>
                      </Box>
                      <Divider />

                      <Button
                        autoFocus
                        type="submit"
                        variant="solid"
                        sx={{
                          background: '#fdd835',
                          color: 'black',
                          marginTop: '25px',
                          marginLeft: '40%',
                        }}
                      >
                        Add
                      </Button>

                      <Button
                        type="button"
                        onClick={handleClose}
                        autoFocus
                        variant="solid"
                        sx={{
                          background: 'black',
                          color: 'white',
                          marginLeft: '50px',
                        }}
                      >
                        Cancel
                      </Button>
                    </form>
                  </Box>
                </div>
              </Sheet>
            </Modal>

            <Button
              autoFocus
              type="submit"
              variant="solid"
              sx={{
                background: 'black',
                borderRadius: '15px',
                color: 'white',
              }}
            >
              <PublishOutlinedIcon />
              Import Categories
            </Button>
          </Box>
        </Box>

        <Divider />

        <Box>
          <Box sx={{ padding: '20px', marginTop: '10px' }}>
            Add the type of groups of assets. To start with, commonly used
            categories have already been created for you. Make them as broad or
            as specific as you want. Categories can be 'laptops and printers',
            'equipment', or 'chairs'. Customize to your particular need.
          </Box>

          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              flexDirection: { md: 'row', xs: 'column' },
              justifyContent: { xs: 'center', md: 'space-between' },
              marginTop: '1px',
              padding: '20px',
            }}
          >
            <FormControl
              sx={{
                display: 'flex',
                flexDirection: { xs: 'column', md: 'row' },
              }}
            >
              <Select
                placeholder="10"
                sx={{
                  marginLeft: { md: '20px' },
                  alignItems: 'center',
                  background: 'none',
                  color: 'black',
                  borderRadius: '15px',
                }}
                required
              >
                <Option value="10">10</Option>
              </Select>

              <FormLabel
                sx={{
                  marginLeft: '10px',
                  marginTop: '6px',
                  mb: { xs: 1, md: 1 },
                }}
              >
                Sub Category
              </FormLabel>
            </FormControl>

            <Box
              sx={{
                display: 'flex',
                flexDirection: { md: 'row' },
                justifyContent: { xs: 'center', md: 'space-between' },
                gap: 1,
              }}
            >
              <Button
                sx={{
                  background: '#FDE8BC',
                  border: '1px solid #C2B083',
                  color: 'black',

                  '&:hover': {
                    background: '#FADFB4',
                  },
                }}
              >
                <NavigateBeforeOutlinedIcon />
              </Button>
              <Button
                sx={{
                  background: '#ffffff',
                  color: 'green',
                  border: '1px solid green ',

                  '&:hover': {
                    color: 'white',
                    background: 'green',
                  },
                }}
              >
                1
              </Button>
              <Button
                sx={{
                  background: '#FDE8BC',
                  border: '1px solid #C2B083',
                  color: 'black',

                  '&:hover': {
                    background: '#FADFB4',
                  },
                }}
              >
                <NavigateNextOutlinedIcon />
              </Button>
            </Box>
          </Box>
        </Box>

        <Box>
          <Category2
            categories={categories}
            onCategoryChange={handleCategoryChange}
          />
        </Box>
        <Divider />

        <Grid xs={12} md={4} >
               <React.Fragment>
               <Box sx={{marginTop: "1px", marginBottom: "15px", padding: "20px" }}>
             <ButtonGroup  
               spacing="1rem"
               aria-label="spacing button group"
               sx={{ paddingLeft: "84%" }}
            >
               <Button sx={{ fontSize: "15px" }}
               onClick={handlePrevTab}
               >
                <NavigateBeforeOutlinedIcon />
                
                   Back
              
              </Button>
              <Button sx={{ background: "#fdd835", fontSize: "15px" }}
              onClick={handleNextTab}               >                   Continue
                  <NavigateNextOutlinedIcon />{" "}
             </Button>
           </ButtonGroup>
            </Box>
              </React.Fragment>
            </Grid>
      </Box>
    </AppView>
  )
}

export default Category





















// import React from "react";
// import { Box, Sheet } from "@mui/joy";
// import { Typography, Divider } from "@mui/joy";
// // import { SlEqualizer } from "react-icons/sl";
// // import { CiGlobe } from "react-icons/ci";
// import Button from "@mui/joy/Button";
// import ButtonGroup from "@mui/joy/ButtonGroup";
// import { FormControl, FormLabel } from "@mui/joy";
// import Grid from "@mui/joy/Grid";
// // import { LiaListUlSolid } from "react-icons/lia";
// import AddIcon from "@mui/icons-material/Add";
// import NavigateNextOutlinedIcon from '@mui/icons-material/NavigateNextOutlined';
// import NavigateBeforeOutlinedIcon from '@mui/icons-material/NavigateBeforeOutlined';
// import Input from "@mui/joy/Input";


// import { useTheme } from "@mui/material/styles";
// import useMediaQuery from "@mui/material/useMediaQuery";
// import { Select, Option } from "@mui/joy";
// import Modal from "@mui/joy/Modal";
// import PublishOutlinedIcon from '@mui/icons-material/PublishOutlined';
// import { useState } from "react";
// import { selectClasses } from "@mui/joy/Select";
// import { Link } from "react-router-dom";
// import { Category2 } from "./CategoryEditDelete";

// interface CategoryProps {}

// interface CategoryProps {
//   companyFormData: any;
//   setCompanyFormData: any;
//   activeTab: number;
//   setActiveTab: (tab: number) => void;
// }

// const Category: React.FunctionComponent<CategoryProps > = (
//   {
//     companyFormData,
//   setCompanyFormData,
//     activeTab,
//     setActiveTab,
//   }
// ) => {
//   const [open, setOpen] = useState<boolean>(false);
//   const theme = useTheme();
//   const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
//   const [category, setCategory] = useState<string>("");
//   const [categories, setCategories] = useState<string[]>([]);

//   const handleClickOpen = () => {
//     setOpen(true);
//   };

//   const handleClose = () => {
//     setOpen(false);
//   };

//   const handleAddCategory = (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     // const newCategory: string = (e.target as any).category.value;
//     const newCategory: string = category;
//     if (categories && Array.isArray(categories)) {
//       // Check if categories is iterable
//       setCategories([...categories, newCategory]);
//     } else {
//       setCategories([newCategory]); // Initialize categories if it's not iterable
//     }
//     handleClose();
//   };

//   // const handleContinue = () => {
//   //   setFormData((prevData) => ({ ...prevData, category }));

//   //   console.log(JSON.stringify(category));
//   // };

//   const handleNextTab = () => {
//     setCompanyFormData((prevData: any) => ({ ...prevData, category: category }));
//     setActiveTab(activeTab + 1); 
//   };

//   const handlePrevTab = () => {
//     setActiveTab(activeTab - 1);
// };


//   return (
//     <div style={{ width: "100%", background: "#f9f9f9" }}>
//       <Typography level="h3" sx={{ display: "flex", alignItems: "center" }}>
//         {/* <SlEqualizer */}
//           {/* style={{ fontSize: 23, color: "red", marginRight: "5px" }} */}
//         {/* />{" "} */}
//         Step4-Categories
//       </Typography>
//       <div style={{ margin: "20px" }}>
//         <Box
//           sx={{
//             borderRadius: "none",
//             boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
//             background: "#ffffff",
//             margin: {
//               xs: "4px",
//               md: "52px",
//             },
//           }}
//         >
//           <Typography>
//             {/* <CiGlobe */}
//               {/* style={{ fontSize: 23, color: "red", marginRight: "5px" }} */}
//             {/* /> */}
//             Header
//           </Typography>
//           <Box
//             fontSize="h5.fontSize"
//             component="div"
//             overflow="hidden"
//             textOverflow="ellipsis"
//             height={70}
//           >
//             <Divider />

//             <Grid
//               container
//               spacing={1}
//               sx={{ flexGrow: 1, paddingTop: "20px", paddingBottom: "10px" }}
//             >
//               <Box>
//                 <Typography>
//                   {/* <LiaListUlSolid size={22} color="red" /> */}
//                   List of Categories
//                 </Typography>
//               </Box>

//               <Box>
//                 <ButtonGroup spacing="1rem" aria-label="spacing button group">
//                   <Box sx={{ borderRadius: "50px" }}>
//                     <Button
//                       sx={{ background: "green", color: "white" }}
//                       onClick={handleClickOpen}
//                     >
//                       <AddIcon /> Add New Category
//                     </Button>

//                     <Modal
//                       aria-labelledby="responsive-dialog-title"
//                       aria-describedby="modal-desc"
//                       sx={{
//                         display: "flex",
//                         justifyContent: "center",
//                         alignItems: "center",
//                       }}
//                       open={open}
//                       onClose={handleClose}
//                     >
//                       <Sheet
//                         variant="outlined"
//                         sx={{
//                           maxWidth: 500,
//                           borderRadius: "md",
//                           p: 3,
//                           boxShadow: "lg",
//                         }}
//                       >
//                         <div>
//                           <Typography
//                             id="responsive-dialog-title"
//                             component="h2"
//                             level="h4"
//                             textColor="inherit"
//                             fontWeight="lg"
//                             mb={1}
//                           >
//                             {"Add a Category"}
//                           </Typography>
//                           <Divider />

//                           <Box sx={{ marginBottom: "10px" }}>
//                             <form onSubmit={handleAddCategory}>
//                               <FormControl
//                                 sx={{
//                                   display: "flex",
//                                   flexDirection: "row",
//                                   alignItems: "center",
//                                 }}
//                               ></FormControl>

//                               <Box
//                                 sx={{
//                                   marginTop: "1px",
//                                   marginBottom: "15px",
//                                   padding: "20px",
//                                 }}
//                               >
//                                 <FormControl
//                                   sx={{
//                                     display: "flex",
//                                     flexDirection: "row",
//                                     justifyContent: "space-evenly",
//                                   }}
//                                 >
//                                   <FormLabel
//                                     sx={{
//                                       paddingTop: "20px",
//                                       marginLeft: "20px",
//                                     }}
//                                   >
//                                     Category*:
//                                   </FormLabel>
//                                   <Input
//                                     value={category}
//                                     onChange={(
//                                       e: React.ChangeEvent<HTMLInputElement>
//                                     ) => setCategory(e.target.value)}
//                                     placeholder="Type here"
//                                     sx={{ marginLeft: "20px", width: "70%" }}
//                                   />
//                                 </FormControl>
//                               </Box>
//                               <Divider />

//                               <Button
//                                 autoFocus
//                                 type="submit"
//                                 variant="solid"
//                                 sx={{
//                                   background: "#fdd835",
//                                   color: "black",
//                                   marginTop: "25px",
//                                   marginLeft: "40%",
//                                 }}
//                               >
//                                 Add
//                               </Button>

//                               <Button
//                                 type="button"
//                                 onClick={handleClose}
//                                 autoFocus
//                                 variant="solid"
//                                 sx={{
//                                   background: "black",
//                                   color: "white",
//                                   marginLeft: "50px",
//                                 }}
//                               >
//                                 Cancel
//                               </Button>
//                             </form>
//                           </Box>
//                         </div>
//                       </Sheet>
//                     </Modal>
//                   </Box>
//                   <form onSubmit={handleAddCategory}>
//                     <Button type="submit">
//                       <PublishOutlinedIcon />
//                       Import Categories
//                     </Button>
//                   </form>
//                 </ButtonGroup>
//               </Box>
//             </Grid>

//             <Divider />
//           </Box>

//           <Box sx={{ marginTop: "20px", padding: "20px" }}>
//             Add your type of groups of assets. To start with, commonly used
//             categories have already been created for you. Make them as broad or
//             as specific as you want. Categories can be 'laptops and printers',
//             'equipments', or 'shairs'. Customize to your paticular need.
//           </Box>

//           <Box>
//             <Select
//               placeholder="10"
//               value={
//                 categories && categories.length > 0
//                   ? String(categories.length)
//                   : ""
//               }
//               onChange={(e: any) => setCategories(e)}
//               sx={{
//                 width: 70,
//                 height: 30,
//                 [`& .${selectClasses.indicator}`]: {
//                   transition: "0.2s",
//                   [`&.${selectClasses.expanded}`]: {
//                     transform: "rotate(-180deg)",
//                   },
//                 },
//                 marginLeft: "20px",
//                 background: "none",
//                 color: "black",
//               }}
//               required
//             >
//               <Option value="10">10</Option>
//               <Option value="15">15</Option>
//               <Option value="20">20</Option>
//             </Select>
//             <Typography sx={{marginTop:'-30px', marginLeft:"10%"}}>categories</Typography>

            
//             <Box
//               sx={{
//                 marginTop: "1px",
//                 marginBottom: "15px",
//                 padding: "20px",
//                 "@media (max-width: 600px)": {
//                   paddingLeft: "5%",
//                   paddingRight: "5%",
//                 },
//               }}
//             >
//               <ButtonGroup
//                 spacing="1rem"
//                 aria-label="spacing button group"
//                 sx={{
//                   paddingLeft: { xs: "20%", md: "80%" },
//                   "@media (max-width: 600px)": {
//                     paddingLeft: "0",
//                     justifyContent: "space-between",
//                   },
//                 }}
//               >
//                 <Button>
//                   <NavigateBeforeOutlinedIcon />
//                 </Button>
//                 <Button sx={{ background: "#fdd835" }}>1</Button>
//                 <Button>
//                   <NavigateNextOutlinedIcon />
//                 </Button>
//               </ButtonGroup>
//             </Box>
//           </Box>

//           <Box>
//             <Category2 categories={categories} />
//           </Box>
//           <Divider />

          
//           <Grid xs={12} md={4} >
//               <React.Fragment>
//               <Box sx={{marginTop: "1px", marginBottom: "15px", padding: "20px" }}>
//             <ButtonGroup  
//               spacing="1rem"
//               aria-label="spacing button group"
//               sx={{ paddingLeft: "84%" }}
//             >
//               <Button sx={{ fontSize: "15px" }}
//               onClick={handlePrevTab}
//               >
//                 <NavigateBeforeOutlinedIcon />
                
//                   Back
              
//               </Button>
//               <Button sx={{ background: "#fdd835", fontSize: "15px" }}
//               onClick={handleNextTab}
//               >
//                   Continue
//                   <NavigateNextOutlinedIcon />{" "}
//               </Button>
//             </ButtonGroup>
//             </Box>
//               </React.Fragment>
//             </Grid>
//         </Box>
//       </div>
//     </div>
//   );
// };

// export default Category;
