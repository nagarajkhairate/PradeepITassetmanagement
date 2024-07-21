import React, { useState, FunctionComponent, ChangeEvent } from 'react'
import { Typography, Sheet } from '@mui/joy'

import Button from '@mui/joy/Button'
import Modal from '@mui/joy/Modal'
import { FormControl, FormLabel } from '@mui/joy'
import Input from '@mui/joy/Input'

import { ThunkDispatch } from 'redux-thunk'
import { useDispatch} from 'react-redux'
import { updateCategory } from '../../../redux/features/CategorySlice'
import { RootState } from '../../../redux/store'
import AppForm from '../../Common/AppForm'



interface CategoryProps {
  category: any
  editOpen: any
  setEditOpen: () => void
}

const EditCategory:FunctionComponent<CategoryProps>=({ category,
  editOpen,
  setEditOpen  
   }) =>{
    const [formData, setFormData] = useState<any>(category)
    const dispatch: ThunkDispatch<RootState, void, any> = useDispatch()
  
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
      const { name, value } = event.target
  
      setFormData((prevData: any) => ({
        ...prevData,
        [name]: value,
      }))
    }

  
 





  const handleEditButton = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
   
      dispatch(updateCategory(formData))
      setEditOpen()
    
  }


  return (
    <Modal
          open={editOpen}
          onClose={setEditOpen}
          aria-labelledby="responsive-dialog-title"
          aria-describedby="modal-desc"
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
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

              <AppForm onSubmit={handleEditButton}>
                <FormControl
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-evenly',
                  }}
                >
                  <FormLabel sx={{ paddingTop: '30px', marginLeft: '20px' }}>
                    Category*
                  </FormLabel>
                  <Input
                    variant="outlined"
                    type="text"
                    id="categoryName"
                    name="categoryName"
                    onChange={handleChange}
                    required
                    sx={{ width: '70%', marginLeft: '10px' }}
                    defaultValue={category ? category.categoryName : ''}
                   
                  />
                </FormControl>
                <Button
                  autoFocus
                  type="submit"
                  variant="solid"
                  sx={{
                    background: '#fdd835',
                    color: 'black',
                    marginTop: '25px',
                    marginLeft: '30%',
                  }}
                >
                  Update
                </Button>

                <Button
                  type="button"
                  onClick={()=>setEditOpen()}
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
              </AppForm>
       
          </Sheet>
        </Modal>
  )
}

export default EditCategory



