// AlertCheckbox.tsx
import React from 'react'
import { Box, Checkbox, Typography } from '@mui/joy'

interface AlertCheckboxProps {
  title: string
  description: string
  value: string
  selectedColumns: string[]
  onChange: (column: string) => void
}

const AlertCheckbox: React.FC<AlertCheckboxProps> = ({
  title,
  description,
  value,
  selectedColumns,
  onChange,
}) => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
      <Checkbox
        checked={selectedColumns.includes(value)}
        onChange={() => onChange(value)}
        sx={{ marginRight: 1 }}
      />
      <Box>
        <Typography
          sx={{
            fontWeight: 500,
            mt: 2,
          }}
        >
          {title}
        </Typography>
        <Typography
          sx={{
            color: 'text.secondary',
          }}
        >
          {description}
        </Typography>
      </Box>
    </Box>
  )
}

export default React.memo(AlertCheckbox)
