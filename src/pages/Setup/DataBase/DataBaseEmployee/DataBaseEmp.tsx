import { Typography, Radio, RadioGroup, Divider, Box, Button } from '@mui/joy'
import React, { useState, useEffect } from 'react'
import Table from '@mui/joy/Table'
import Checkbox from '@mui/joy/Checkbox'
import FormControl from '@mui/joy/FormControl'
import AppView from '../../../../components/Common/AppView'
import SignpostOutlinedIcon from '@mui/icons-material/SignpostOutlined'
import { ThunkDispatch } from 'redux-thunk'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../../redux/store'
import DatabaseButtons from '../../../../components/Common/DatabaseButton'
import { EmployeePerson, empData } from './EmployeeData'
import {
  fetchEmpDatabase,
  updateEmpDatabase,
} from '../../../../redux/features/EmpDatabaseSlice'
import AddIcon from '@mui/icons-material/Add'
import EmployeeFieldsAddingTable from './EmployeeFieldsAddingTable'
import { fetchEmpCustomDatabase } from '../../../../redux/features/EmpCustomDatabseSlice'
import AddDatabaseCustomEmployee from './AddDatabaseCustomEmployee'

const DataBaseEmp: React.FunctionComponent = () => {
  const dispatch: ThunkDispatch<RootState, void, any> = useDispatch()

  // Changed variable name from empDatabase to empDataBases
  const empDatabase = useSelector((state: RootState) => state.empDatabase.data)
  const empCustomDatabase = useSelector(
    (state: RootState) => state.empCustomDatabase.data,
  )

  const [empDataBases, setEmpDataBases] = useState(empData) // Initializing with empData
  const [openAddEmployee, setOpenAddEmployee] = useState(false)
  const LOCAL_STORAGE_KEY = 'empDataBases'
  const [allChecked, setAllChecked] = useState(false)

  const handleHeaderCheckboxChange = () => {
    const newCheckedState = !allChecked;
    const updatedForm = empDataBases.map((item) => {
      const exemptFields = [
        'Full Name',
        'Email',
        'Site',
        'Location',
        'Department'
      ];
  
      return {
        ...item,
        isVisible: exemptFields.includes(item.fieldName) ? true : newCheckedState
      };
    });
  
    setEmpDataBases(updatedForm);
    setAllChecked(newCheckedState);
  }
  

  const handleCheckboxChange = (index: number, fieldName: string) => {
    const updatedForm = [...empDataBases]

    if (
      fieldName !== 'Full Name' &&
      fieldName !== 'Email' &&
      fieldName !== 'Site' &&
      fieldName !== 'Location' &&
      fieldName !== 'Department'
    ) {
      updatedForm[index].isVisible = !updatedForm[index].isVisible
    } else {
      updatedForm[index].isVisible = true
    }
    setEmpDataBases(updatedForm)

    const allChecked = updatedForm
      .filter(
        (item) =>
          item.fieldName !== 'Full Name' &&
          'Email' &&
          'Site' &&
          'Location' &&
          'Department',
      )
      .every((item) => item.isVisible)
    setAllChecked(allChecked)
  }

  const handleRadioChange = (index: number, value: string) => {
    const updatedForm = [...empDataBases]

    if (empDataBases[index].fieldName === 'Full Name') {
      updatedForm[index].isRequired = 'yes'
    } else {
      updatedForm[index].isRequired = value
    }
    setEmpDataBases(updatedForm)
  }

  const handleCancel = () => {}

  const handleSubmit = () => {
    console.log(empDataBases)
    dispatch(updateEmpDatabase(empDatabase))
  }

  useEffect(() => {
    dispatch(fetchEmpDatabase())
  }, [dispatch])

  useEffect(() => {
    dispatch(fetchEmpCustomDatabase())
  }, [!openAddEmployee])

  useEffect(() => {
    const storedData = localStorage.getItem(LOCAL_STORAGE_KEY)
    if (storedData) {
      setEmpDataBases(JSON.parse(storedData))
    } else {
      setEmpDataBases(empData)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(empDataBases))
  }, [empDataBases])

  return (
    <AppView>
      <Typography
        level="h4"
        sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
      >
        <SignpostOutlinedIcon
          style={{ fontSize: '1.4rem', color: '#FBC21E' }}
        />
        Database Persons/Employees
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
        <Box sx={{ textAlign: { xs: 'center', md: 'left' } }}>
          <Typography
            level="h4"
            sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
          >
            Persons/Employees Standard Fields
          </Typography>
        </Box>

        <Box sx={{ textAlign: { xs: 'center', md: 'left' } }}>
          <Box sx={{ mt: 3 }}>
            <Typography>
              Persons/employees are individuals to whom you assign assets. These
              could be employees in your organization or students in your
              school/university. Check the boxes next to the field names you
              want to include.
            </Typography>
          </Box>

          <Box
            sx={{
              overflowX: 'auto',
              fontSize: '14px',
              whiteSpace: 'nowrap',
              borderRadius: '5px',
              mt: 2,
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
                      width: 40,
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
                {empDataBases.map((opt, index) => {
                  const data = EmployeePerson.find(
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
                          wordBreak: 'break-word',
                          whiteSpace: 'normal',
                          textAlign: 'left',
                        }}
                      >
                       {data.fieldName === 'Full Name' ? (
                          <>
                            {data.fieldName}{'  '}
                            <span style={{ color: 'red',fontSize:'1.2rem' }}>*</span>
                          </>
                        ) : (
                          data.fieldName
                        )}
                      </td>
                      <td
                        style={{
                          wordBreak: 'break-word',
                          whiteSpace: 'normal',
                        }}
                      >
                        {data.isVisible && (
                          <FormControl>
                            <RadioGroup
                              value={opt.isRequired || 'optional'}
                              name={`radio-buttons-group-${index}`} // Ensuring unique name
                              onChange={(e) =>
                                handleRadioChange(index, e.target.value)
                              }
                              sx={{ gap: 2 }}
                            >
                              <FormControl
                                key={`${index}-yes`}
                                disabled={!opt.isVisible}
                                sx={{
                                  display: 'inline-flex',
                                  alignItems: 'center',
                                  flexDirection: 'row',
                                  gap: 2,
                                }}
                              >
                                <Radio
                                  value="yes"
                                  checked={opt.isRequired === 'yes'}
                                  onChange={(e) =>
                                    handleRadioChange(index, e.target.value)
                                  }
                                  color="primary"
                                  sx={{ display: 'inline-flex' }}
                                />
                                Yes
                              </FormControl>
                              {opt.fieldName !== 'Full Name' && (
                                <FormControl
                                  key={`${index}-optional`}
                                  disabled={!opt.isVisible}
                                  sx={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    flexDirection: 'row',
                                    gap: 2,
                                  }}
                                >
                                  <Radio
                                    value="optional"
                                    checked={opt.isRequired === 'optional'}
                                    onChange={(e) =>
                                      handleRadioChange(index, e.target.value)
                                    }
                                    color="primary"
                                    sx={{ display: 'inline-flex' }}
                                  />
                                  Optional
                                </FormControl>
                              )}
                            </RadioGroup>
                          </FormControl>
                        )}
                      </td>
                      <td
                        style={{
                          wordBreak: 'break-word',
                          whiteSpace: 'normal',
                          textAlign: 'left',
                        }}
                      >
                        {data.description}
                      </td>
                      <td
                        style={{
                          wordBreak: 'break-word',
                          whiteSpace: 'normal',
                          textAlign: 'left',
                        }}
                      >
                        {data.example}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </Table>
            <Divider sx={{ my: '20px' }}></Divider>
          </Box>
        </Box>
        <Box>
          <Typography
            level="h4"
            sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
          >
            <SignpostOutlinedIcon
              style={{ fontSize: '1.4rem', color: '#FBC21E' }}
            />
            Persons/Employees Custom Fields
          </Typography>
          <Typography sx={{ marginTop: '10px' }}>
            Add custom fields to join the standard fields that we provided.
          </Typography>

          <Button
            onClick={() => setOpenAddEmployee(true)}
            sx={{
              marginTop: '15px',
              background: 'green',
              color: 'white',
              '&:hover': { background: '#1b5e20' },
              borderRadius: '15px',
            }}
          >
            <AddIcon />
            Add Custom Fields
          </Button>

          {openAddEmployee && (
            <AddDatabaseCustomEmployee
              open={openAddEmployee}
              setOpen={setOpenAddEmployee}
            />
          )}

          <EmployeeFieldsAddingTable empDataBases={empCustomDatabase} />
        </Box>

        <DatabaseButtons
          onCancel={() => handleCancel()}
          onSubmit={() => handleSubmit()}
        />
      </Box>
    </AppView>
  )
}

export default DataBaseEmp
