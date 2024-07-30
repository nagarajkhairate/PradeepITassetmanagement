import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../../redux/store'
import { fetchComponents } from '../../../../redux/features/ComponentsIdSlice'
import { addCustomerCustomDatabase } from '../../../../redux/features/CustomerCustomDatabaseSlice'
import { ThunkDispatch } from 'redux-thunk'
import AddCustomCommonComponent from '../DataBaseEmployee/AddCustomCommonComponent'

const AddCustomCustomer: React.FC<{ open: boolean; setOpen: (open: boolean) => void }> = ({
  open,
  setOpen,
}) => {

  const components = useSelector((state: RootState) => state.components.data)
  const dispatch: ThunkDispatch<RootState, void, any> = useDispatch()
  React.useEffect(() => {
    dispatch(fetchComponents())
  }, [dispatch])

  const handleDispatch = (formData: any) => {
    dispatch(addCustomerCustomDatabase(formData))
  }

  return (
    <AddCustomCommonComponent
      open={open}
      setOpen={setOpen}
      dispatchAction={handleDispatch}
      title="Add Custom Customer Field"
    />
  )
}

export default React.memo(AddCustomCustomer)
