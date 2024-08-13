// import {
//   Typography,
//   Radio,
//   RadioGroup,
//   Divider,
//   Box,
//   Table,
//   Checkbox,
//   FormControl,
//   Button,
// } from '@mui/joy'
// import React, { useState, useEffect } from 'react'
// import useMediaQuery from '@mui/material/useMediaQuery'
// import { useTheme } from '@mui/material/styles'
// import AppView from '../../../../components/Common/AppView'
// import SignpostOutlinedIcon from '@mui/icons-material/SignpostOutlined'
// import { RootState } from '../../../../redux/store'
// import DatabaseButtons from '../../../../components/Common/DatabaseButton'
// import {  customContract } from './ContractData'
// import AddIcon from '@mui/icons-material/Add'
// import ContractFieldsAddingTable from './ContractFieldsAddingTable'
// import { useDispatch, useSelector } from 'react-redux'
// import {
//   fetchContractDatabase,
//   updateContractDatabase,
// } from '../../../../redux/features/ContractDatabaseSlice'
// import { ThunkDispatch } from 'redux-thunk'
// import { fetchContractCustomDatabase } from '../../../../redux/features/ContractCustomDatabaseSlice'
// import AddCustomContract from './AddCustomContract'
// import { fetchComponents } from '../../../../redux/features/ComponentsIdSlice'

// const DatabaseContractTable: React.FunctionComponent = () => {
//   const [matchedSelected, setMatchedSelected] = useState<number[]>([])
//   const dispatch: ThunkDispatch<RootState, void, any> = useDispatch()
//   const contractDatabase = useSelector(
//     (state: RootState) => state.contractDatabase.data,
//   )
//   const contractCustomDatabase = useSelector(
//     (state: RootState) => state.contractCustomDatabase.data,
//   )
//   const components = useSelector((state: RootState) => state.components.data);
//   const [openAddContract, setOpenAddContract] = useState(false)
//   // const [contractDataBases, setContractDataBases] = useState(contractData)
//   const LOCAL_STORAGE_KEY = 'contractDataBases'

//   // useEffect(() => {
//   //   setContractDataBases(contractData)
//   // }, [])

//   const [allChecked, setAllChecked] = useState(false)

//   const handleHeaderCheckboxChange = () => {
//     const newCheckedState = !allChecked
//     const updatedForm = contractDatabase.map((item) => ({
//       ...item,
//       isVisible:
//         item.fieldName === 'Contract Title' ||
//         item.fieldName === 'Start Date' ||
//         item.fieldName === 'End Date' ||
//         item.fieldName === 'No End Date'
//           ? true
//           : newCheckedState,
//     }))
  
//     dispatch(updateContractDatabase(updatedForm))
//     setAllChecked(newCheckedState)
//   }
  
//   const handleCheckboxChange = (index: number, fieldName: string) => {
//     const updatedForm = contractDatabase.map((item, idx) =>
//       idx === index
//         ? {
//             ...item,
//             isVisible:
//               fieldName !== 'Contract Title' &&
//               fieldName !== 'Start Date' &&
//               fieldName !== 'End Date' &&
//               fieldName !== 'No End Date'
//                 ? !item.isVisible
//                 : true,
//           }
//         : item
//     )
  
//     const allChecked = updatedForm
//       .filter(
//         (item) => item.fieldName !== 'Asset Tag ID' && 'Asset Description',
//       )
//       .every((item) => item.isVisible)
  
//     dispatch(updateContractDatabase(updatedForm))
//     setAllChecked(allChecked)
//   }
  

//   const handleRadioChange = (index: number, value: string) => {
//     const updatedForm = [...contractDatabase]

//     if (
//       contractDatabase[index].fieldName === 'Contract Title' ||
//       contractDatabase[index].fieldName === 'Start Date' ||
//       contractDatabase[index].fieldName === 'End Date'
//     ) {
//       updatedForm[index].isRequired = 'yes'
//     } else if (
//       contractDatabase[index].fieldName === 'No End Date' ||
//       contractDatabase[index].fieldName === 'Is Software'
//     ) {
//       return
//     } else {
//       updatedForm[index].isRequired = value
//     }
//     // setContractDataBases(updatedForm)
//   }

//   const handleCancel = () => {}

//   const handleSubmit = () => {
//     console.log(contractDatabase)
//     dispatch(updateContractDatabase(contractDatabase))
//   }

//   React.useEffect(() => {
//     dispatch(fetchContractDatabase())
//   }, [dispatch])

//   React.useEffect(() => {
//     dispatch(fetchContractCustomDatabase())
//   }, [])

//   // useEffect(() => {
//   //   const storedData = localStorage.getItem(LOCAL_STORAGE_KEY)
//   //   if (storedData) {
//   //     setContractDataBases(JSON.parse(storedData))
//   //   } else {
//   //     setContractDataBases(contractData)
//   //   }
//   // }, [])

//   // useEffect(() => {
//   //   localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(contractDataBases))
//   // }, [contractDataBases])

//   useEffect(()=>{
//     dispatch(fetchComponents())
//   },[dispatch])

//   return (
//     <AppView>
//       <Typography
//         level="h4"
//         sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
//       >
//         <SignpostOutlinedIcon
//           style={{ fontSize: '1.4rem', color: '#FBC21E' }}
//         />
//         Database Contract
//       </Typography>

//       <Box
//         sx={{
//           borderRadius: '10px',
//           boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
//           background: '#ffffff',
//           gap: '5px',
//           p: 2,
//         }}
//       >
//         <Box
//           sx={{
//             textAlign: { xs: 'center', md: 'left' },
//           }}
//         >
//           <Typography
//             level="h4"
//             sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
//           >
//            Contract Standard Fields
//           </Typography>
//         </Box>

//         <Box
//           sx={{
//             textAlign: { xs: 'center', md: 'left' },
//           }}
//         >
//           <Box sx={{ mt: 3 }}>
//             <Typography>
//               Customers are the individuals or organizations to whom you lease
//               out your equipment. Select the fields you would like to use for
//               your customers.
//             </Typography>
//           </Box>

//           <Box
//             sx={{
//               overflowX: 'auto',
//               fontSize: '14px',
//               whiteSpace: 'nowrap',
//               borderRadius: '5px',
//             }}
//           >
//             <Table
//               borderAxis="both"
//               aria-label="basic table"
//               style={{
//                 borderCollapse: 'collapse',
//                 border: '1px solid grey',
//                 minWidth: '500px',
//                 borderRadius: '5px',
//               }}
//             >
//               <thead>
//                 <tr>
//                   <th
//                     style={{
//                       width: 30,
//                       background: '#fff8e6',
//                       verticalAlign: 'middle',
//                     }}
//                   >
//                     <Checkbox
//                       checked={allChecked}
//                       onChange={handleHeaderCheckboxChange}
//                     />
//                   </th>
//                   <th
//                     style={{
//                       background: '#fff8e6',
//                       verticalAlign: 'middle',
//                       wordBreak: 'break-word',
//                       whiteSpace: 'normal',
//                     }}
//                   >
//                     Field Name
//                   </th>
//                   <th
//                     style={{
//                       background: '#fff8e6',
//                       verticalAlign: 'middle',
//                       wordBreak: 'break-word',
//                       whiteSpace: 'normal',
//                     }}
//                   >
//                     Data Required
//                   </th>
//                   <th
//                     style={{
//                       background: '#fff8e6',
//                       verticalAlign: 'middle',
//                       wordBreak: 'break-word',
//                       whiteSpace: 'normal',
//                     }}
//                   >
//                     Description
//                   </th>
//                   <th
//                     style={{
//                       background: '#fff8e6',
//                       verticalAlign: 'middle',
//                       wordBreak: 'break-word',
//                       whiteSpace: 'normal',
//                     }}
//                   >
//                     Example
//                   </th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {contractDatabase.map((opt, index) => {
//                   const data = contractDatabase.find(
//                     (field) => field.fieldName === opt.fieldName,
//                   )
//                   if (!data) return null

//                   return (
//                     <tr key={`${data.fieldName}-${index}`}>
//                       <td>
//                         <Checkbox
//                           checked={opt.isVisible || false}
//                           onChange={() =>
//                             handleCheckboxChange(index, data.fieldName)
//                           }
//                         />
//                       </td>
//                       <td
//                         style={{
//                           wordBreak: 'break-word',
//                           whiteSpace: 'normal',
//                           textAlign: 'left',
//                         }}
//                       >
//                         {data.fieldName === 'Contract Title' ||
//                         data.fieldName === 'Start Date' ||
//                         data.fieldName === 'End Date' ? (
//                           <>
//                             {data.fieldName}{' '}
//                             <span style={{ color: 'red',fontSize:'1.1rem' }}>*</span>
//                           </>
//                         ) : (
//                           data.fieldName
//                         )}
//                       </td>
//                       <td
//                         style={{
//                           wordBreak: 'break-word',
//                           whiteSpace: 'normal',
//                         }}
//                       >
//                         {data.isVisible && (
//                           <FormControl>
//                             {data.fieldName !== 'No End Date' &&
//                               data.fieldName !== 'Is Software' && (
//                                 <RadioGroup
//                                   value={opt.isRequired ? 'yes' : 'optional'}
//                                   name={`radio-buttons-group-${index}`}
//                                   onChange={(e) =>
//                                     handleRadioChange(index, e.target.value)
//                                   }
//                                   sx={{ gap: 2 }}
//                                 >
//                                   <FormControl
//                                     key={`${index}-yes`}
//                                     disabled={!opt.isVisible}
//                                     sx={{
//                                       display: 'inline-flex',
//                                       alignItems: 'center',
//                                       flexDirection: 'row',
//                                       gap: 2,
//                                       // visibility: opt.fieldName === 'Full Name' ? 'isVisible' : 'hidden',
//                                     }}
//                                   >
//                                     <Radio
//                                       value="yes"
//                                       checked={opt.isRequired === 'yes'}
//                                       onChange={(e) =>
//                                         handleRadioChange(index, e.target.value)
//                                       }
//                                       color="primary" // Adjust color as needed
//                                       sx={{ mr: 1 }}
//                                     />
//                                     Yes
//                                   </FormControl>
//                                   {opt.fieldName !== 'Contract Title' &&
//                                     opt.fieldName !== 'Start Date' &&
//                                     opt.fieldName !== 'End Date' && (
//                                       <FormControl
//                                         key={`${index}-optional`}
//                                         disabled={!opt.isVisible}
//                                         sx={{
//                                           display: 'inline-flex',
//                                           alignItems: 'center',
//                                           flexDirection: 'row',
//                                         }}
//                                       >
//                                         <Radio
//                                           value="optional"
//                                           checked={
//                                             opt.isRequired === 'optional'
//                                           }
//                                           onChange={(e) =>
//                                             handleRadioChange(
//                                               index,
//                                               e.target.value,
//                                             )
//                                           }
//                                           color="primary"
//                                           sx={{ mr: 1 }}
//                                         />
//                                         Optional
//                                       </FormControl>
//                                     )}
//                                 </RadioGroup>
//                               )}
//                           </FormControl>
//                         )}
//                       </td>
//                       <td
//                         style={{
//                           wordBreak: 'break-word',
//                           whiteSpace: 'normal',
//                           textAlign: 'left',
//                         }}
//                       >
//                         {data.description}
//                       </td>
//                       <td
//                         style={{
//                           wordBreak: 'break-word',
//                           whiteSpace: 'normal',
//                           textAlign: 'left',
//                         }}
//                       >
//                         {data.example}
//                       </td>
//                     </tr>
//                   )
//                 })}
//               </tbody>
//             </Table>
//             <Divider sx={{ my: '20px' }}></Divider>
//           </Box>
//         </Box>

//         <Box>
//           <Typography
//             level="h4"
//             sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
//           >
//             <SignpostOutlinedIcon
//               style={{ fontSize: '1.4rem', color: '#FBC21E' }}
//             />
//             Contract Custom Fields
//           </Typography>
//           <Typography sx={{ marginTop: '10px' }}>
//             Add custom fields to join the standard fields that we provided.
//           </Typography>

//           <Button
//             onClick={() => setOpenAddContract(true)}
//             sx={{
//               marginTop: '15px',
//               background: 'green',
//               color: 'white',
//               '&:hover': { background: '#1b5e20' },
//               borderRadius: '15px',
//             }}
//           >
//             <AddIcon />
//             Add Custom Fields
//           </Button>

//           {openAddContract && (
//             <AddCustomContract
//               open={openAddContract}
//               setOpen={setOpenAddContract}
//             />
//           )}

//           <ContractFieldsAddingTable
//             contractDataBases={contractCustomDatabase}
//             components={components}
//           />
//         </Box>

//         <DatabaseButtons
//           onCancel={() => handleCancel()}
//           onSubmit={() => handleSubmit()}
//         />
//       </Box>
//     </AppView>
//   )
// }

// export default DatabaseContractTable



import {
  Typography,
  Radio,
  RadioGroup,
  Divider,
  Box,
  Table,
  Checkbox,
  FormControl,
  Button,
} from '@mui/joy'
import React, { useState, useEffect } from 'react'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useTheme } from '@mui/material/styles'
import AppView from '../../../../components/Common/AppView'
import SignpostOutlinedIcon from '@mui/icons-material/SignpostOutlined'
import { RootState } from '../../../../redux/store'
import { useDispatch, useSelector } from 'react-redux'
import {
  fetchContractDatabase,
  updateContractDatabase,
} from '../../../../redux/features/ContractDatabaseSlice'
import { ThunkDispatch } from 'redux-thunk'
import { fetchContractCustomDatabase } from '../../../../redux/features/ContractCustomDatabaseSlice'
import { fetchComponents } from '../../../../redux/features/ComponentsIdSlice'
import AddIcon from '@mui/icons-material/Add'
import ContractFieldsAddingTable from './ContractFieldsAddingTable'
import AddCustomContract from './AddCustomContract'
import DatabaseButtons from '../../../../components/Common/DatabaseButton'

const DatabaseContractTable: React.FunctionComponent = () => {
  const [matchedSelected, setMatchedSelected] = useState<number[]>([])
  const dispatch: ThunkDispatch<RootState, void, any> = useDispatch()
  const contractDatabase = useSelector(
    (state: RootState) => state.contractDatabase.data,
  )
  const contractCustomDatabase = useSelector(
    (state: RootState) => state.contractCustomDatabase.data,
  )
  const components = useSelector((state: RootState) => state.components.data)
  const [openAddContract, setOpenAddContract] = useState(false)
  const [allChecked, setAllChecked] = useState(false)

  const handleHeaderCheckboxChange = () => {
    const newCheckedState = !allChecked
    const updatedForm = contractDatabase.map((item) => ({
      ...item,
      isVisible:
        item.fieldName === 'Contract Title' ||
        item.fieldName === 'Start Date' ||
        item.fieldName === 'End Date' ||
        item.fieldName === 'No End Date'
          ? true
          : newCheckedState,
    }))

    dispatch(updateContractDatabase(updatedForm))
    setAllChecked(newCheckedState)
  }

  const handleCheckboxChange = (index: number, fieldName: string) => {
    // Create a new copy of the contractDatabase
    const updatedForm = contractDatabase.map((item, i) =>
      i === index
        ? {
            ...item,
            isVisible: fieldName !== 'Contract Title' &&
              fieldName !== 'Start Date' &&
              fieldName !== 'End Date' &&
              fieldName !== 'No End Date'
                ? !item.isVisible
                : true,
          }
        : item
    );
  
    // Dispatch the updated form to Redux
    dispatch(updateContractDatabase(updatedForm));
  
    // Check if all checkboxes are checked
    const allChecked = updatedForm
      .filter(
        (item) => item.fieldName !== 'Asset Tag ID' && item.fieldName !== 'Asset Description',
      )
      .every((item) => item.isVisible);
    setAllChecked(allChecked);
  };
  
  
  

  const handleRadioChange = (index: number, value: string) => {
    // Create a new copy of the contractDatabase
    const updatedForm = contractDatabase.map((item, i) =>
      i === index
        ? {
            ...item,
            isRequired:
              item.fieldName === 'Contract Title' ||
              item.fieldName === 'Start Date' ||
              item.fieldName === 'End Date'
                ? 'yes'
                : value,
          }
        : item
    );
  
    // Dispatch the updated form to Redux
    dispatch(updateContractDatabase(updatedForm));
  };
  
  
  

  const handleCancel = () => {}

  const handleSubmit = () => {
    console.log(contractDatabase)
    dispatch(updateContractDatabase(contractDatabase))
  }

  useEffect(() => {
    dispatch(fetchContractDatabase())
    dispatch(fetchContractCustomDatabase())
    dispatch(fetchComponents())
  }, [dispatch])

  return (
    <AppView>
      <Typography
        level="h4"
        sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
      >
        <SignpostOutlinedIcon
          style={{ fontSize: '1.4rem', color: '#FBC21E' }}
        />
        Database Contract
      </Typography>

      <Box
        sx={{
          borderRadius: '10px',
          boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
          background: '#ffffff',
          gap: '5px',
          p: 2,
        }}
      >
        <Box
          sx={{
            textAlign: { xs: 'center', md: 'left' },
          }}
        >
          <Typography
            level="h4"
            sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
          >
            Contract Standard Fields
          </Typography>
        </Box>

        <Box
          sx={{
            textAlign: { xs: 'center', md: 'left' },
          }}
        >
          <Box sx={{ mt: 3 }}>
            <Typography>
              Customers are the individuals or organizations to whom you lease
              out your equipment. Select the fields you would like to use for
              your customers.
            </Typography>
          </Box>

          <Box
            sx={{
              overflowX: 'auto',
              fontSize: '14px',
              whiteSpace: 'nowrap',
              borderRadius: '5px',
            }}
          >
            <Table
              borderAxis="both"
              aria-label="basic table"
              style={{
                borderCollapse: 'collapse',
                border: '1px solid grey',
                minWidth: '500px',
                borderRadius: '5px',
              }}
            >
              <thead>
                <tr>
                  <th
                    style={{
                      width: 30,
                      background: '#fff8e6',
                      verticalAlign: 'middle',
                    }}
                  >
                    <Checkbox
                      checked={allChecked}
                      onChange={handleHeaderCheckboxChange}
                    />
                  </th>
                  <th
                    style={{
                      background: '#fff8e6',
                      verticalAlign: 'middle',
                      wordBreak: 'break-word',
                      whiteSpace: 'normal',
                    }}
                  >
                    Field Name
                  </th>
                  <th
                    style={{
                      background: '#fff8e6',
                      verticalAlign: 'middle',
                      wordBreak: 'break-word',
                      whiteSpace: 'normal',
                    }}
                  >
                    Data Required
                  </th>
                  <th
                    style={{
                      background: '#fff8e6',
                      verticalAlign: 'middle',
                      wordBreak: 'break-word',
                      whiteSpace: 'normal',
                    }}
                  >
                    Description
                  </th>
                  <th
                    style={{
                      background: '#fff8e6',
                      verticalAlign: 'middle',
                      wordBreak: 'break-word',
                      whiteSpace: 'normal',
                    }}
                  >
                    Example
                  </th>
                </tr>
              </thead>
              <tbody>
                {contractDatabase.map((opt, index) => {
                  const data = contractDatabase.find(
                    (field) => field.fieldName === opt.fieldName,
                  )
                  if (!data) return null

                  return (
                    <tr key={`${data.fieldName}-${index}`}>
                      <td>
                        <Checkbox
                          checked={opt.isVisible || false}
                          onChange={() =>
                            handleCheckboxChange(index, data.fieldName)
                          }
                        />
                      </td>
                      <td
                        style={{
                          verticalAlign: 'middle',
                          wordBreak: 'break-word',
                          whiteSpace: 'normal',
                        }}
                      >
                        {opt.fieldName}
                      </td>
                      <td>
                        <FormControl>
                          <RadioGroup
                            name={`${opt.fieldName}-${index}`}
                            value={opt.isRequired}
                            onChange={(e) =>
                              handleRadioChange(index, e.target.value)
                            }
                            row
                          >
                            {opt.fieldName === 'Contract Title' ||
                            opt.fieldName === 'Start Date' ||
                            opt.fieldName === 'End Date' ||
                            opt.fieldName === 'No End Date' ? (
                              <Radio
                                value="yes"
                                label="Yes"
                                defaultChecked
                                sx={{
                                  '& .MuiSvgIcon-root': {
                                    fontSize: 18,
                                  },
                                }}
                              />
                            ) : (
                              <>
                                <Radio
                                  value="yes"
                                  label="Yes"
                                  sx={{
                                    '& .MuiSvgIcon-root': {
                                      fontSize: 18,
                                    },
                                  }}
                                />
                                <Radio
                                  value="optional"
                                  label="Optional"
                                  sx={{
                                    '& .MuiSvgIcon-root': {
                                      fontSize: 18,
                                    },
                                  }}
                                />
                              </>
                            )}
                          </RadioGroup>
                        </FormControl>
                      </td>
                      <td
                        style={{
                          verticalAlign: 'middle',
                          wordBreak: 'break-word',
                          whiteSpace: 'normal',
                        }}
                      >
                        {opt.description}
                      </td>
                      <td
                        style={{
                          verticalAlign: 'middle',
                          wordBreak: 'break-word',
                          whiteSpace: 'normal',
                        }}
                      >
                        {opt.example}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </Table>
          </Box>

          <Box
            sx={{
              textAlign: { xs: 'center', md: 'left' },
              mt: 4,
            }}
          >
            <Button
              variant="solid"
              color="primary"
              onClick={() => setOpenAddContract(true)}
              startDecorator={<AddIcon />}
              sx={{
                background: '#1C1C1C',
                '&:hover': {
                  background: '#000000',
                },
                borderRadius: '8px',
                textTransform: 'none',
                fontWeight: '400',
              }}
            >
              Add Custom Fields
            </Button>
            {openAddContract && (
            <AddCustomContract
              open={openAddContract}
              setOpen={setOpenAddContract}
            />
          )}
          </Box>

          <Box
        sx={{
          borderRadius: '10px',
          boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
          background: '#ffffff',
          mt: 4,
          gap: '5px',
          p: 2,
        }}
      >
        <ContractFieldsAddingTable contractDataBases={contractCustomDatabase}
            components={components}/>
        <Divider />
        </Box>
        <Box>
        <DatabaseButtons  onCancel={() => handleCancel()}
          onSubmit={() => handleSubmit()}/>
      </Box> 
      </Box>

      </Box>
    </AppView>
  )
}

export default DatabaseContractTable

