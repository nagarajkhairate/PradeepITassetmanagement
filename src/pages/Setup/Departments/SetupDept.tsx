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
import { selectClasses } from '@mui/joy/Select'
import SetupEditDept from './SetupEditDept'
import PlaylistAddCheckOutlinedIcon from '@mui/icons-material/PlaylistAddCheckOutlined'

type Department = {
  id: number
  departmentName: string
}

import AppView from '../../../components/Common/AppView'
import SetupAddDept from './SetupAddDept'
import { ThunkDispatch } from 'redux-thunk'
import { RootState } from '../../../Redux/store'
import { useDispatch, useSelector } from 'react-redux'
import { addDepartment, fetchDepartment } from '../../../Redux/features/DepartmentSlice'
import SetupDeleteDept from './SetupDeleteDept'

const SetupDept: React.FunctionComponent = () => {
  const dispatch: ThunkDispatch<RootState, void, any> = useDispatch()
  const [open, setOpen] = useState<boolean>(false)
  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'))
  const [departmentName, setDepartmentName] = useState<string>('')
  const [matchedSelected, setMatchedSelected] = useState<number[]>([]);
  const [deleteOpen, setDeleteOpen] = useState<boolean>(false);

  // const [department, setDepartment] = useState<Department[]>([])
  
  const departments = useSelector((state: RootState) => state.departments.data)
  // const dispatch = useDispatch<AppDispatch>()
  console.log(departments)

  const handleDeptChange = (updateddepartment: Department[]) => {
    // setDepartment(updateddepartment)
    console.log('deptartment: ', JSON.stringify(updateddepartment))
  }

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleAddDepartment = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const newdepartment: Department = {
      id: departments.length ? departments[departments.length - 1].id + 1 : 1,
      departmentName: capitalizeWords(departmentName),
    }
    // setDepartment([...department, newdepartment])
    dispatch(addDepartment(newdepartment))
    setDepartmentName('') // Clear the input field after adding
    handleClose()
    console.log(newdepartment)
  }

  const capitalizeWords = (str: string) => {
    return str.replace(/\b\w/g, (char) => char.toUpperCase())
  }

  const handleDeleteOpen = () => {
    setDeleteOpen(true);
  };

  const handleDeleteClose = () => {
    setDeleteOpen(false);
    setMatchedSelected([]);
  };

  React.useEffect(() => {
    dispatch(fetchDepartment())
  }, [])
  return (
    <AppView>
      <Typography level="h4" sx={{ display: 'flex', alignItems: 'center' }}>
        <SignpostOutlinedIcon
          style={{ fontSize: '1.4rem', color: '#d32f2f' }}
        />
        Department
      </Typography>

      <Box
        sx={{
          borderRadius: '10px',
          boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
          background: '#ffffff',
          gap: '5px',
          p: 1,
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
              List of Department
            </Typography>
          </Box>

          <Box
            sx={{
              display: 'flex',
              flexDirection: { md: 'row', xs: 'column' },
              gap: 2,
              // marginTop: "10px",
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
              onClick={handleClickOpen}
            >
              <AddIcon /> Add New dept
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
            {/* <DeleteForeverIcon sx={{ fontSize: '15px' }} /> */}
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
              Import department
            </Button>
          </Box>
        </Box>

        <Divider />

        <Box>
          <Box sx={{ padding: '20px', marginTop: '10px' }}>
            Add departments that own or house the particular assets. Make them
            as broad or as specific as you want. Departments can be
            'Accounting', 'Marketing', or 'Executive'. Customize to your
            particular need.
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
                  // borderRadius: '15px',
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
                Department
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
          <SetupEditDept
            department1={departments}
            matchedSelected={matchedSelected}
        setMatchedSelected={setMatchedSelected}
        handleDeleteOpen={handleDeleteOpen}
          />
        </Box>
        <Divider />

        {/* <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                marginTop: "20px",
              }}
            >
              <Button
                autoFocus
                variant="solid"
                sx={{
                  background: "#FABC1E",
                  color: "black",
                  width: { xs: "100%", md: "auto" },
                }}
                onClick={handleSubmit}
              >
                Submit
              </Button>
            </Box> */}

            
          <SetupAddDept
        open={open}
        handleClose={handleClose}
        departmentName={departmentName}
        setDepartmentName={setDepartmentName}
        handleAddDepartment={handleAddDepartment}
        />
      </Box>

      <SetupDeleteDept
          open={deleteOpen}
          handleDeleteClose={handleDeleteClose}
         
        />
    </AppView>
  )
}

export default SetupDept
