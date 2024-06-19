import { KeyboardArrowDown } from "@mui/icons-material"
import { Box, Button, Divider, FormControl, FormLabel, Input, Modal, Option, Select, Sheet, Typography, selectClasses } from "@mui/joy"
import { RootState } from "../../../Redux/store"
import { useDispatch } from "react-redux"
import { ThunkDispatch } from "redux-thunk"

interface CategorySubAddProps {
    open: boolean
    handleClose: () => void
    subCategory: string
    setSubCategory: React.Dispatch<React.SetStateAction<string>>
    handleAddCategory: (e: React.FormEvent<HTMLFormElement>) => void

  }

const CategorySubAdd: React.FunctionComponent<CategorySubAddProps> = ({ open, handleClose, subCategory, setSubCategory, handleAddCategory }) => {

  const dispatch: ThunkDispatch<RootState, void, any> = useDispatch()

  return (
    <Modal
    aria-labelledby="responsive-dialog-title"
    aria-describedby="modal-desc"
    sx={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    }}
    open={open}
    onClose={handleClose}
  >
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
          <form onSubmit={handleAddCategory}>
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
                {/* <Input
                    value={category}
                    onChange={(
                      e: React.ChangeEvent<HTMLInputElement>
                    ) => setCategory(e.target.value)}
                    placeholder="Type here"
                    sx={{ marginLeft: "20px", width: "70%", marginTop:'10px', }}
                  /> */}
                <Select
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
                  <Option value="buildings">Buildings</Option>
                  <Option value="computer">Computer</Option>
                  <Option value="equipment">Equipment</Option>
                  <Option value="vehicles">Vehicles</Option>
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
                  value={subCategory}
                  onChange={(
                    e: React.ChangeEvent<HTMLInputElement>
                  ) => setSubCategory(e.target.value)}
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
              onClick={handleClose}
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
          </form>
        </Box>
      </div>
    </Sheet>
  </Modal>
)
}


export default CategorySubAdd