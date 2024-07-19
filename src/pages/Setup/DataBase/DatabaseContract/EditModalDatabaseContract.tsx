import { Box, Button, FormControl, FormLabel, Input, Modal, Option, Radio, RadioGroup, Select, Sheet, Typography } from "@mui/joy"
import AppForm from "../../../../components/Common/AppForm"
import React, { ChangeEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../redux/store";
import { ThunkDispatch } from "redux-thunk";
import { fetchComponents } from "../../../../redux/features/ComponentsIdSlice";
import { updateContractCustomDatabase } from "../../../../redux/features/ContractCustomDatabaseSlice";


interface EditModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  selectedItem: any;
  }
  
  const EditModalDatabaseContract: React.FC<EditModalProps> = ({
    open, setOpen, selectedItem 
  }) => {

    const components = useSelector((state: RootState) => state.components.data);
    const dispatch: ThunkDispatch<RootState, void, any> = useDispatch()
    React.useEffect(() => {
      dispatch(fetchComponents())
    }, [dispatch])

    const [formData, setFormData] = useState(selectedItem);
    const handleSelectChange = (event: React.SyntheticEvent | null, newValue: string | null) => {
      setFormData((prevData:any) => ({
        ...prevData,
        componentsId: newValue || "",
      }));
    };
  
    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { name, value } = e.target;
      setFormData((prevData:any) => ({ ...prevData, [name]: value }));
    };
  
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      dispatch(updateContractCustomDatabase(formData))
      setOpen(false);
    };

    
return(

  <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="responsive-dialog-title"
        aria-describedby="modal-desc"
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
      >
    <Sheet
          variant="outlined"
          sx={{
            maxWidth: 500,
            borderRadius: 'md',
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
              {'Edit the Customs here'}
            </Typography>

            <AppForm onSubmit={handleSubmit}>
            <FormControl>
  <FormLabel sx={{ paddingTop: '30px', marginLeft: '20px' }}>
    Custom Field Label*:
    <Input
      variant="outlined"
      type="text"
      name="fieldName"
      // value={formData.fieldName}
      onChange={handleChange}
      onInput={(e) => {
        const target = e.target as HTMLInputElement;
        target.value = target.value.replace(/[^a-zA-Z0-9-]/g, '');
      }}
      required
      sx={{ width: '45%', marginLeft: '20px' }}
    />
  </FormLabel>
</FormControl>

              <FormControl>
                <FormLabel sx={{ paddingTop: '20px' }}>
                  Data Types*:
                  <Select
                    placeholder="Select Data Types"
                    sx={{ marginLeft: '40px' }}
                    name="componentsId"
                    // value={formData.componentsId}
                    onChange={handleSelectChange}
                  >
                    {components &&
                      components.map((comp: any) => (
                        <Option key={comp.id} value={comp.id}>
                          {comp.title}
                        </Option>
                      ))}
                  </Select>
                </FormLabel>
              </FormControl>

              <FormControl
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
              >
                <FormLabel sx={{ paddingTop: '30px', marginLeft: '20px' }}>
                  {' '}
                  Data Required{' '}
                </FormLabel>
                <RadioGroup
                  name="isRequired"
                  // value={formData.isRequired}
                  onChange={handleChange}
                >
                  <Box>
                    <Radio
                      value="yes"
                      label="Yes"
                      variant="outlined"
                      sx={{ paddingTop: '30px', marginLeft: '50px' }}
                    />
                    <Radio
                      value="optional"
                      label="Optional"
                      variant="outlined"
                      sx={{ paddingTop: '30px', marginLeft: '10px' }}
                    />
                  </Box>
                </RadioGroup>
              </FormControl>

              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  flexDirection: { md: 'row' },
                  justifyContent: { xs: 'space-between', md: 'flex-end' },
                  gap: '5px',
                  mt: 4,
                  flexWrap: 'wrap',
                }}
              >
                <Button
                  autoFocus
                  type="submit"
                  variant="solid"
                  sx={{
                    background: '#fdd835',
                    '&:hover': { background: '#E1A91B' },
                    color: 'black',
                  }}
                >
                  Update
                </Button>

                <Button
                  type="button"
                  onClick={() => setOpen(false)}
                  autoFocus
                  variant="solid"
                  sx={{
                    background: 'black',
                    '&:hover': { background: 'black' },
                    color: 'white',
                  }}
                >
                  Cancel
                </Button>
              </Box>
            </AppForm>
          </div>
        </Sheet>
        </Modal>
)
}
export default EditModalDatabaseContract