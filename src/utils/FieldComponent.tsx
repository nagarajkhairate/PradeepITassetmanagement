import React, { FunctionComponent } from 'react'
import { Box } from '@mui/joy'
import SelectField from '../components/Common/AppSelect/SelectField'
import InputField from '../components/Common/AppInput/InputField'




interface PageSectionProps {
  field: any
  formData: any
  handleInputChange?: (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => void
  handleSelectChange?: (name: string, value: string | null) => void
  mode?: string
}

const handleInputValue = (
  field: any,
  formData: any,
  handleInputChange?: (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => void,
  handleSelectChange?: (name: string, value: string | null) => void,
  mode?: string,
) => {

  const commonProps = {
    field, formData, handleInputChange, handleSelectChange, mode
  }
  switch (field.type) {
    
    case 'text':
      return <InputField  {...commonProps}/>
    case 'select':
    
        return <SelectField {...commonProps} />


    case 'checkbox':
    case 'textArea':
    default:
      return null
  }
}

const FieldComponent: FunctionComponent<PageSectionProps> = ({
  field,
  formData,
  handleInputChange,
  handleSelectChange,
  mode,
}) => {


  return (
    <Box
      component="div"
      sx={{
        padding: 2,
        borderRadius: 2,
      }}
    >
     {handleInputValue(
                  field,
                  formData,
                  handleInputChange,
                  handleSelectChange,
                  mode,
                )}
    </Box>
  )
}

export default FieldComponent
