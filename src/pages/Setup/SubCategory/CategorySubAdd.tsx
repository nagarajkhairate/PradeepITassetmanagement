import { KeyboardArrowDown } from "@mui/icons-material"
import { Box, Button, Divider, FormControl, FormLabel, Input, Modal, Option, Select, Sheet, Typography, selectClasses } from "@mui/joy"
import { RootState } from "../../../Redux/store"
import { useDispatch, useSelector } from "react-redux"
import { ThunkDispatch } from "redux-thunk"
import React, { useState } from "react"
import { fetchCategory } from "../../../Redux/features/CategorySlice"
import AppForm from "../../../components/Common/AppForm"
import { addSubCategories } from "../../../Redux/features/CategorySubSlice"


interface CategorySubAddProps {
    // open: boolean
    // handleClose: () => void
    // subCategory: string
    // setSubCategory: React.Dispatch<React.SetStateAction<string>>
    // handleAddCategory: (e: React.FormEvent<HTMLFormElement>) => void
    open:any,
    setOpen:any

  }

const CategorySubAdd: React.FunctionComponent<CategorySubAddProps> = ({ open, setOpen
  //  handleClose, subCategory, setSubCategory, handleAddCategory
   }) => {

    const [subForm, setSubForm] = useState()
    const dispatch: ThunkDispatch<RootState, void, any> = useDispatch()
    const categories = useSelector((state: RootState) => state.category.data)

    


    const handleAddCategory = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      console.log(JSON.stringify(subForm))
      dispatch(addSubCategories(subForm))
      setOpen()
      }

      const HandleInputChange= (e: React.ChangeEvent<HTMLInputElement>)=>{
        const { name, value} = e.target
        setSubForm((prevData:any)=>({
          ...prevData,
          [name]:value
        })
          
        )
      }

      const handleSelectChange = (
        event: React.SyntheticEvent | null,
        newValue: string | null,
      ) => {
        setSubForm((prevData:any)=>({
          ...prevData,
          categoryId:newValue
        })
          
        )
      }

    React.useEffect(()=>{
      dispatch(fetchCategory())
    },[dispatch])

  return (
   
    <Sheet
      variant="outlined"
      sx={{
        maxWidth: 500,
        borderRadius: "md",
        p: 3,
        boxShadow: "lg",
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
          {"Add a Sub Category"}
        </Typography>
        <Divider />

        <Box sx={{ marginBottom: "10px" }}>
          <AppForm onSubmit={handleAddCategory}>
            <FormControl
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            ></FormControl>

            <Box
              sx={{
                marginTop: "1px",
                marginBottom: "15px",
                padding: "10px",
              }}
            >
              <Typography
                sx={{ padding: "none", width: "100%" }}
              >
                Enter the data about your new sub category in
                the fields below and we will add it to your
                list.
              </Typography>
              <FormControl
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-evenly",
                  marginTop: "10px",
                }}
              >
                <FormLabel
                  sx={{
                    paddingTop: "20px",
                    marginLeft: "20px",
                  }}
                >
                  Category*:
                </FormLabel>
                <Select
                 onChange={handleSelectChange}
                  placeholder="Select a Category"
                  indicator={<KeyboardArrowDown />}
                  sx={{
                    width: 240,
                    [`& .${selectClasses.indicator}`]: {
                      transition: "0.2s",
                      [`&.${selectClasses.expanded}`]: {
                        transform: "rotate(-180deg)",
                      },
                    },
                  }}
                >
                  {categories && categories.map((category)=>(
                              <Option key={category.id} value={category.id}>{category.categoryName}</Option>
                            ))}
                </Select>
              </FormControl>

              <FormControl
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-evenly",
                  marginTop: "10px",
                }}
              >
                <FormLabel
                  sx={{
                    paddingTop: "20px",
                    marginLeft: "none",
                  }}
                >
                  Sub Category*:
                </FormLabel>
                <Input
                  name='category'
                  onChange={HandleInputChange}
                  placeholder="Type here"
                  sx={{
                    marginLeft: "10px",
                    width: "50%",
                    marginTop: "10px",
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
                background: "#fdd835",
                color: "black",
                marginTop: "25px",
                marginLeft: "40%",
              }}
            >
              Add
            </Button>

            <Button
              type="button"
              onClick={setOpen}
              autoFocus
              variant="solid"
              sx={{
                background: "black",
                color: "white",
                marginLeft: "50px",
              }}
            >
              Cancel
            </Button>
          </AppForm>
        </Box>
      </div>
    </Sheet>
)
}


export default CategorySubAdd