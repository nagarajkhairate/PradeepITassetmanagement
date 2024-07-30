
import { Dispatch, SetStateAction } from 'react'

export const handleCheckboxChange = (
  column: string,
  selectedColumns: string[],
  setSelectedColumns: Dispatch<SetStateAction<string[]>>,
  setButton: Dispatch<SetStateAction<boolean>>
) => {
  const selectedIndex = selectedColumns.indexOf(column)
  const newSelectedColumns = [...selectedColumns]

  if (selectedIndex === -1) {
    newSelectedColumns.push(column)
  } else {
    newSelectedColumns.splice(selectedIndex, 1)
  }

  if (
    newSelectedColumns.includes('column2') &&
    newSelectedColumns.includes('column1')
  ) {
    setButton(true)
  } else {
    setButton(false)
  }

  setSelectedColumns(newSelectedColumns)
}
