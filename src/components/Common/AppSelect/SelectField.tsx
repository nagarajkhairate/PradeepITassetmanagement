import React, { FunctionComponent } from 'react'
import { FormControl, FormLabel, Option, Select } from '@mui/joy'


interface Props {
  field: any
  formData: any
  handleSelectChange?: (name: string, value: string | null) => void
  mode?: string
}

const SelectField: FunctionComponent<Props> = ({
  field,
  formData,
  handleSelectChange,
  mode
}) => {
  const controlledValue = formData && formData[field.fieldsName.name] || ''
  const handleSelect = (
    event: React.SyntheticEvent | null,
    newValue: string | null,
  ) => {
    handleSelectChange(field.fieldsName.name, newValue)
  }
  return (
    <FormControl>
      <FormLabel sx={{ fontSize: '12px' }}>
        {field.fieldsName.title}{field.isRequired && <span style={{ color:"red"}}>*</span>}:
      </FormLabel>
      <Select
        placeholder= {field.fieldsName.title}
        value={controlledValue}
        size="sm"
        sx={{ minWidth: 235 }}
        onChange={handleSelect}
        disabled={mode ==='view'? true: false}
        required={field.isRequired}
      >
        {field.fieldsName.values.map((option: any, index: number) => (
          <Option key={index} value={option.name}>
            {option.name}
          </Option>
        ))}
      </Select>
    </FormControl>
  )
}

export default SelectField
