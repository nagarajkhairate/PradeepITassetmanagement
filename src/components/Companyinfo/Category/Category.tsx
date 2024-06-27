import React from 'react'
import { Box, Sheet } from '@mui/joy'
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
import EditCategory from './EditCategory'
import PlaylistAddCheckOutlinedIcon from '@mui/icons-material/PlaylistAddCheckOutlined'
import AppView from '../../../components/Common/AppView'
import AddCategory from './AddCategory'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../Redux/store'
import { ThunkDispatch } from 'redux-thunk'
import { addCategory, fetchCategory } from '../../../Redux/features/CategorySlice'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import DeleteCategory from './DeleteCategory'

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

const CategoryPage: React.FunctionComponent<CategoryProps> = ({
    
    companyFormData,
  setCompanyFormData,
    activeTab,
    setActiveTab,
  
}) => {
  const dispatch: ThunkDispatch<RootState, void, any> = useDispatch()
  const [open, setOpen] = useState<boolean>(false)
  const [matchedSelected, setMatchedSelected] = useState<number[]>([])
  const [deleteOpen, setDeleteOpen] = useState<boolean>(false)
  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'))
  const [categoryName, setCategoryName] = useState<string>('')
  // const [categories, setCategories] = useState<Category[]>([])

  const categories = useSelector((state: RootState) => state.category.data)
  // const dispatch = useDispatch<AppDispatch>()
  console.log(categories)

  const handleCategoryChange = (updatedCategories: Category[]) => {
    // setCategories(updatedCategories)
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
      categoryName: capitalizeWords(categoryName),
    }
    // setCategories([...categories, newCategory])
    setCategoryName('') // Clear the input field after adding
    dispatch(addCategory(newCategory))
    console.log(newCategory)
    handleClose()
  }
  const capitalizeWords = (str: string) => {
    return str.replace(/\b\w/g, (char) => char.toUpperCase())
  }
  const handleDeleteOpen = () => {
    setDeleteOpen(true)
  }

  const handleDeleteClose = () => {
    setDeleteOpen(false)
    setMatchedSelected([])
  }
  
  const handleNextTab = () => {
        setCompanyFormData((prevData: any) => ({ ...prevData, categories: categories }));
        setActiveTab(activeTab + 1); 
        console.log(JSON.stringify(categories, null, 2))
      };
    
      const handlePrevTab = () => {
        setActiveTab(activeTab - 1);
    };

   
    console.log(JSON.stringify(companyFormData))


  React.useEffect(() => {
    dispatch(fetchCategory())
  }, [])


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
          borderRadius: '10px',
          boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
          background: '#ffffff',
          gap: '5px',
          p:1
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            flexDirection: { xs: 'column', md: 'row' },
            justifyContent: { xs: 'center', md: 'space-between' },
            gap: 2,
            mb: 1,
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

            {matchedSelected.length > 0 && (
          <Button
            onClick={handleDeleteOpen}
            autoFocus
              variant="solid"
            sx={{
              fontSize: '13px',
              // background: '#ffffff',
              borderRadius: '15px',
              // color: '#d32f2f',
              background: '#d32f2f',
              display: 'flex',
              justifyContent: { md: 'flex-end', xs: 'center' },
              marginLeft: 'none',
              border: '1px solid red',
              
              padding: '.5rem .10rem',
            }}
          >
            <DeleteForeverIcon sx={{ fontSize: '15px' }} />
            Delete Categories
          </Button>
        )}

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
          <Box sx={{  marginTop: '10px' }}>
            <Typography>
            Add the type of groups of assets. To start with, commonly used
            categories have already been created for you. Make them as broad or
            as specific as you want. Categories can be 'laptops and printers',
            'equipment', or 'chairs'. Customize to your particular need.
            </Typography>
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
          <EditCategory
            categories1={categories}
            matchedSelected={matchedSelected}
            setMatchedSelected={setMatchedSelected}
            handleDeleteOpen={handleDeleteOpen}
          />
        </Box>
        <Divider />

              
        <Box
           sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            justifyContent: { xs: 'center', md: 'flex-end' },
            gap: 2,
          }}
        >
         
          <Button
            variant="solid"
            sx={{
              background: '#388e3c',
              color: 'white',
              borderRadius:'15px'
            }}
            component="label"
            onClick={handlePrevTab}
          >
            <NavigateBeforeOutlinedIcon />
                
                Back
          </Button>
          <Button
            variant="solid"
            sx={{
              background: "#fdd835",
              color: 'white',
              borderRadius:'15px'
            }}
            component="label"
              onClick={handleNextTab} 
          >
             Continue
             <NavigateNextOutlinedIcon />{" "}
          </Button>
          </Box>
      </Box>

      <AddCategory
        open={open}
        handleClose={handleClose}
        categoryName={categoryName}
        setCategoryName={setCategoryName}
        handleAddCategory={handleAddCategory}
      />

<DeleteCategory
        open={deleteOpen} 
        handleDeleteClose={handleDeleteClose} 
        handleDeleteOpen={handleDeleteOpen}
         />
    </AppView>
  )
}

export default CategoryPage
