import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../../redux/store'
import { fetchComponents } from '../../../../redux/features/ComponentsIdSlice'
import { addEmpCustomDatabase } from '../../../../redux/features/EmpCustomDatabseSlice'
import { ThunkDispatch } from 'redux-thunk'
import AddCustomCommonComponent from './AddCustomCommonComponent'



const AddDatabaseCustomEmployee: React.FC<{ open: boolean; setOpen: (open: boolean) => void }> = ({
  open,
  setOpen,
}) => {
  
  const components = useSelector((state: RootState) => state.components.data)
  const dispatch: ThunkDispatch<RootState, void, any> = useDispatch()
  React.useEffect(() => {
    dispatch(fetchComponents())
  }, [dispatch])

  const handleDispatch = (formData: any) => {
    dispatch(addEmpCustomDatabase(formData))
  }

  return (
    <AddCustomCommonComponent
      open={open}
      setOpen={setOpen}
      dispatchAction={handleDispatch}
      title="Add Custom Employee Field"
    />
  )
}

export default React.memo(AddDatabaseCustomEmployee)
