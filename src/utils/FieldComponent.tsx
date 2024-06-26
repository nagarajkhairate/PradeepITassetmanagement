import React, { FunctionComponent } from 'react'
import { Box } from '@mui/joy'
import SelectField from '../components/Common/AppSelect/SelectField'
import InputField from '../components/Common/AppInput/InputField'
import FileField from '../components/Common/AppFile/FileField'

interface PageSectionProps {
  field: any
  formData: any
  handleInputChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
  handleSelectChange?: (name: string, value: string | null) => void
  handleFileChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  mode?: string
}

const handleInputValue = (
  field: any,
  formData: any,
  handleInputChange?: (event: React.ChangeEvent<HTMLInputElement>) => void,
  handleSelectChange?: (name: string, value: string | null) => void,
  handleFileChange?: (e: React.ChangeEvent<HTMLInputElement>) => void,

  mode?: string,
) => {
  const commonProps = {
    field,
    formData,
    handleInputChange,
    handleSelectChange: handleSelectChange || (() => {}),
    handleFileChange: handleFileChange ||(() => {}),
    mode,
  }
  switch (field.dataType) {
    case 'text':
    case 'date':
      return <InputField {...commonProps} />
    case 'select':
      return <SelectField {...commonProps} />

    case 'checkbox':
    case 'textArea':
      return <InputField {...commonProps} />
    case 'file':
      return <FileField {...commonProps} />
    default:
      return null
  }
}

const FieldComponent: FunctionComponent<PageSectionProps> = ({
  field,
  formData,
  handleInputChange,
  handleSelectChange,
  handleFileChange,
  mode,
}) => {
  
  return (
    <Box
      component="div"
      sx={{
        borderRadius: 2,
      }}
    >
      {handleInputValue(
        field,
        formData,
        handleInputChange,
        handleSelectChange,
        handleFileChange,
        mode,
      )}
    </Box>
  )
}

export default FieldComponent
