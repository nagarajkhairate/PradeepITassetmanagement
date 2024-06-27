import React, { FunctionComponent } from 'react'
import { FormControl, FormLabel, Option, Select } from '@mui/joy'


interface Props {
  field: any
  formData: any
  handleSelectChange: (name: string, value: string | null) => void
  mode?: string
}

const SelectField: FunctionComponent<Props> = ({
  field,
  formData,
  handleSelectChange,
  mode
}) => {
  const controlledValue =formData && formData[field.name] || ''
  const handleSelect = (
    event: React.SyntheticEvent | null,
    newValue: string | null,
  ) => {
    handleSelectChange(field.name, newValue)
  }
  return (
    <FormControl>
      <FormLabel >
        {field.title}{field.isRequired && <span style={{ color:"red"}}>*</span>}:
      </FormLabel>
      <Select
        // placeholder= {field.title}
        name={field.name}
        value={controlledValue}
        sx={{ minWidth: 228 }}
        onChange={handleSelect}
        disabled={mode ==='view'? true: false}
        required={field.isRequired}
      >
        {field.fieldValue.map((option: any, index: number) => (
          <Option key={index} value={option.value}>
            {option.label}
          </Option>
        ))}
      </Select>
    </FormControl>
  )
}

export default SelectField
