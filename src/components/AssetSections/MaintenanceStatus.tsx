import React, { useState } from "react";
import { Select, Option, Box, FormControl, FormHelperText, FormLabel } from '@mui/joy';
import { useDispatch,  } from "react-redux";
import { RootState } from "../../redux/store";
import { ThunkDispatch } from "redux-thunk";

interface MaintenanceProps {
  field: any;
  formData: any;
  handleSelectChange: (value: string | null, name: string) => void;
}

const MaintenanceStatus: React.FC<MaintenanceProps> = ({
  field, 
  formData, 
  handleSelectChange,
}) => {
  const [error, setError] = useState<string>("");
  const [open, setOpen] = useState(false);
  const dispatch: ThunkDispatch<RootState, void, any> = useDispatch();


  const selectChange = (e: any, newValue: string | null) => {
    handleSelectChange(newValue, field.name);
  };
 const isRequiredField = field.isRequired=== 'yes'
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: '20px', mt: 2 }}>
      <FormControl >
        <FormLabel>{field.fieldName}
            {/* {isRequiredField && <span style={{ color: 'red' }}>*</span>} */}
            </FormLabel>
        <Select
  sx={{ padding: '10px' }}
  placeholder="Select Status"
  name={field.name}
  value={formData && formData[field.name] as string}
  onChange={selectChange}
  required={isRequiredField}
>
  <Option value="scheduled">Scheduled</Option>
  <Option value="in progress">In Progress</Option>
  <Option value="on hold">On Hold</Option>
  <Option value="cancelled">Cancelled</Option>
  <Option value="completed">Completed</Option>
</Select>
        {error && <FormHelperText>{error}</FormHelperText>}
      </FormControl>
    </Box>
  );
};

export default MaintenanceStatus;
