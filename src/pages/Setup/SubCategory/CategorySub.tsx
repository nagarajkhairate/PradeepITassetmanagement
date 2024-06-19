import React from "react";
import { Box, Sheet } from "@mui/joy";
import { Typography, Divider } from "@mui/joy";
import Button from "@mui/joy/Button";
import { FormControl, FormLabel } from "@mui/joy";
import AddIcon from "@mui/icons-material/Add";
import NavigateNextOutlinedIcon from "@mui/icons-material/NavigateNextOutlined";
import NavigateBeforeOutlinedIcon from "@mui/icons-material/NavigateBeforeOutlined";
import Input from "@mui/joy/Input";
import SignpostOutlinedIcon from "@mui/icons-material/SignpostOutlined";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Select, Option } from "@mui/joy";
import Modal from "@mui/joy/Modal";
import PublishOutlinedIcon from "@mui/icons-material/PublishOutlined";
import { useState } from "react";
import { selectClasses } from "@mui/joy/Select";
import CategorySubEdit from "./CategorySubEdit";
import PlaylistAddCheckOutlinedIcon from "@mui/icons-material/PlaylistAddCheckOutlined";
import { KeyboardArrowDown } from "@mui/icons-material";
import AppView from "../../../components/Common/AppView";
import CategorySubAdd from "./CategorySubAdd";
import { ThunkDispatch } from "redux-thunk";
import { RootState } from "../../../Redux/store";
import { useDispatch, useSelector } from "react-redux";
import { addSubCategory, fetchSubCategory } from "../../../Redux/features/CategorySubSlice";

type SubCategory = {
  id: number
  subCategory: string
}


const CategorySub: React.FunctionComponent = () => {
  const dispatch: ThunkDispatch<RootState, void, any> = useDispatch()
  const [open, setOpen] = useState<boolean>(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [subCategory, setSubCategory] = useState<string>("");
  const [categories, setCategories] = useState<SubCategory[]>([]);

  const subCategories = useSelector((state: RootState) => state.subCategories.data)
  // const dispatch = useDispatch<AppDispatch>()
  console.log(subCategories)

  const handleCategoryChange = (updatedCategories: SubCategory[]) => {
    setCategories(updatedCategories);
    console.log("subCategory: ", JSON.stringify(updatedCategories));
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAddCategory = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const newCategory: SubCategory = {
      id: categories.length ? categories[categories.length - 1].id + 1 : 1,
      subCategory: subCategory,
    }
    setCategories([...categories, newCategory])
    dispatch(addSubCategory(newCategory))
    setSubCategory('') // Clear the input field after adding
    handleClose()
  }

  
  React.useEffect(() => {
    dispatch(fetchSubCategory())
  }, [])

  return (
    <AppView>
      <Typography level="h3" sx={{ display: "flex", alignItems: "center" }}>
        <SignpostOutlinedIcon
          style={{ fontSize: "1.4rem", color: "#d32f2f"}}
        />
        Sub Categories
      </Typography>

          <Box
            sx={{
              borderRadius: "10px",
              boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
              background: "#ffffff",
              gap:'5px',
              p:1
            }}
          >

            <Box
              sx={{
                display: "flex",
                alignItems: 'center',
                flexDirection: { xs: "column", md: "row" },
                justifyContent: { xs: 'center', md: 'space-between' },
                gap: 2,
                mb: 2,
              }}
            >
                <Box
                  sx={{
                    textAlign: { xs: "center", md: "left" },
                  }}
                >
                  <Typography
                    sx={{
                      fontFamily: "Poppins",
                      fontSize: "20px",
                      fontWeight: 500,
                      lineHeight: "30px",
                      textAlign: { xs: "center", md: "left" },
                      whiteSpace: "nowrap",
                    }}
                  >
                    <PlaylistAddCheckOutlinedIcon
                      style={{ fontSize: "1.4rem", color: "#d32f2f" }}
                    />
                    List of Sub Categories
                  </Typography>
                </Box>

                <Box
                 sx={{
                  display: "flex",
                  flexDirection: { md: 'row', xs: 'column' },
                  gap: 2,
                  // marginTop: "10px",
                }}
                >
                  <Button
                    autoFocus
                    variant="solid"
                    sx={{
                      background: "#388e3c",
                      borderRadius: '15px',
                      color: "white",   
                    }}
                    onClick={handleClickOpen}
                  >
                    <AddIcon /> Add New Sub Category
                  </Button>

                  <Button
                    autoFocus
                    type="submit"
                    variant="solid"
                    sx={{
                      background: "black",
                      borderRadius: '15px',
                      color: "white",
                    }}
                  >
                    <PublishOutlinedIcon />
                    Import Sub Categories
                  </Button>
                </Box>
              </Box>
         

            <Divider />

            <Box>
              <Box sx={{ padding: "20px", marginTop: "10px" }}>
              You may also add Sub Categories. Sub Categories are a subset of Categories. For example, the Sub Categories may be different types of Categories. The Sub Category may be a specific type or name within the Category. Select a Category and add your list of Sub Categories here.
              </Box>


              <Box 
        sx={{ 
          display: 'flex',
          alignItems: 'center',
          flexDirection: { md: 'row', xs: 'column' },
          justifyContent: { xs: 'center', md: 'space-between' },
          // marginTop: "1px", 
 
          padding: "20px" 
        }}
        >
          <FormControl
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              
            }}
          >
            <FormLabel 
            sx={{ 
              
              marginTop: "6px",
              mb: { xs: 1, md: 1 } }}>
              Select a Site:
            </FormLabel>

            <Select
              placeholder="Nothing Selected"
              sx={{
                marginLeft: { md: "20px" },
              alignItems:'center',
                background: "#ff5252",  
                color: "white",
                borderRadius: '15px',
              }}
              required
              // value={selectedValue}
              // onChange={(event) =>
              //   setSelectedValue(
              //     (event?.target as HTMLSelectElement)?.value ?? ""
              //   )
              // }
            >
              <Option value="Location1">Location1</Option>
            </Select>
          </FormControl>
        </Box>

              <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              flexDirection: { md: 'row', xs: 'column' },
              justifyContent: { xs: 'center', md: 'space-between' },
              
              // marginBottom: "10px",
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
                  alignItems: 'center',
                  background: 'none',
                  color: 'black',
                  borderRadius: '15px',
                }}
                required
                // value={selectedValue}
                // onChange={(event) =>
                //   setSelectedValue(
                //     (event?.target as HTMLSelectElement)?.value ?? ""
                //   )
                // }
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
                Category
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
              <CategorySubEdit
                categories={categories}
                onCategoryChange={handleCategoryChange}
              />
            </Box>
            <Divider />
          </Box>

          <CategorySubAdd
        open={open}
        handleClose={handleClose}
        subCategory={subCategory}
        setSubCategory={setSubCategory}
        handleAddCategory={handleAddCategory}
      />
    </AppView>
  );
};

export default CategorySub;
