import React, { useState, ChangeEvent, SyntheticEvent, useEffect } from 'react'
import {
  Box,
  Typography,
  Divider,
  Select,
  Option,
  Radio,
  RadioGroup,
  FormControl,
  FormLabel,
  Checkbox,
  Button,
  Grid,
  selectClasses,
} from '@mui/joy'
import TuneOutlinedIcon from '@mui/icons-material/TuneOutlined'
import { TableData } from './TableData'
import HowToRegOutlinedIcon from '@mui/icons-material/HowToRegOutlined'
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined'
import TableChartOutlinedIcon from '@mui/icons-material/TableChartOutlined'
import AppView from '../../../components/Common/AppView'
import { ThunkDispatch } from 'redux-thunk'
import { useDispatch, useSelector } from 'react-redux'
import {
  fetchOptions,
  updateoptions,
} from '../../../redux/features/TableOptionsSlice'
import { RootState } from '../../../redux/store'
import { KeyboardArrowDown } from '@mui/icons-material'

const DepreciationOptions = {
  id: 1,
  title: 'Depreciation',
  description:
    'Depreciation is used to expense the cost of your assets over their useful life...',
  formLabel: 'Asset Depreciation',
  icon: CalendarMonthOutlinedIcon,
  options: [
    { name: 'assetDepreciation', value: 'yes', label: 'Yes' },
    { name: 'assetDepreciation', value: 'no', label: 'No' },
  ],
  depreciationMethods: [
    'Straight Line',
    'Declining Balance',
    'Double Declining',
    'Balance',
    '150% Declining Balance',
  ],
  calculationFrequencies: ['Yearly', 'Monthly', 'Quarterly'],
}

const LinkingOptions = {
  id: 2,
  title: 'Linking of Assets',
  description: 'Enable or disable the linking of assets...',
  formLabel: 'Enable Linking',
  icon: CalendarMonthOutlinedIcon,
  options: [
    { name: 'enableLinking', value: 'yes', label: 'Yes' },
    { name: 'enableLinking', value: 'no', label: 'No' },
  ],
}

const SetupTableOptions: React.FC = () => {
  const tableOptions = useSelector((state: RootState) => state.tableOptions.data)
  const dispatch: ThunkDispatch<RootState, void, any> = useDispatch()
  console.log(JSON.stringify(tableOptions))

  const [showDepreciationOptions, setShowDepreciationOptions] = useState(false)
  const [depreciationMethod, setDepreciationMethod] = useState('')
  const [calculationFrequency, setCalculationFrequency] = useState('')
  const [tableOptionForm, setTableOptionForm] = useState<any>({ tableData: [] });
  const [enableLinking, setEnableLinking] = useState('no')
  const [linkedAssets, setLinkedAssets] = useState({
    checkout: false,
    reservation: false,
    leaseAssets: false,
    lostFoundAssets: false,
    repairAssets: false,
    brokenAssets: false,
    disposeAssets: false,
    donateAssets: false,
    sellAssets: false,
    auditAssets: false,
  })
  const [companyFormData, setCompanyFormData] = useState<any>({})
 

  const handleDepreciationChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    setShowDepreciationOptions(value === 'yes')
    setCompanyFormData((prevData: any) => ({
      ...prevData,
      assetDepreciation: value,
    }))
  }

  const handleDepreciationMethodChange = (
    event: SyntheticEvent | null,
    newValue: string | null,
  ) => {
    if (newValue !== null) setDepreciationMethod(newValue)
  }

  const handleCalculationFrequencyChange = (
    event: SyntheticEvent | null,
    newValue: string | null,
  ) => {
    if (newValue !== null) setCalculationFrequency(newValue)
  }

  const handleSubmit = () => {
    const formData: any = {
      depreciationOptions: {
        assetDepreciation: companyFormData.assetDepreciation,
      },

      tableData: TableData.map((item) => ({
        title: item.title,
        selectedOption: companyFormData[item.title],
      })),
      linkingOfAssets: {
        enableLinking: enableLinking,
      },
    }

    if (companyFormData.assetDepreciation === 'yes') {
      formData.depreciationOptions.depreciationMethod = depreciationMethod
      formData.depreciationOptions.calculationFrequency = calculationFrequency
    }
    if (enableLinking === 'yes') {
      formData.linkingOfAssets.linkedAssets = {
        checkout: linkedAssets.checkout,
        reservation: linkedAssets.reservation,
        leaseAssets: linkedAssets.leaseAssets,
        lostFoundAssets: linkedAssets.lostFoundAssets,
        repairAssets: linkedAssets.repairAssets,
        brokenAssets: linkedAssets.brokenAssets,
        disposeAssets: linkedAssets.disposeAssets,
        donateAssets: linkedAssets.donateAssets,
        sellAssets: linkedAssets.sellAssets,
        auditAssets: linkedAssets.auditAssets,
      }
    }

    const updatedOption = { ...companyFormData }
    dispatch(updateoptions(updatedOption))
    console.log(JSON.stringify(formData, null, 2))
  }

  const handleEnableLinkingChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEnableLinking(event.target.value)
  }

  const handleOptionChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setCompanyFormData((prevData: any) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target
    setLinkedAssets((prev) => ({
      ...prev,
      [name]: checked,
    }))
  }



  React.useEffect(() => {
    if (tableOptions.length > 0) {
      setCompanyFormData(tableOptions[0])
    }
  }, [tableOptions])

  useEffect(() => {
    if (tableOptions.length === 0) {
      dispatch(fetchOptions())
    }
  }, [dispatch, tableOptions.length])

  

  return (
    <AppView>
      <Box sx={{ boxSizing: 'border-box' }}>
        <Typography
          level="h4"
          style={{ display: 'flex', alignItems: 'center', gap: 5 }}
        >
          <TableChartOutlinedIcon
            style={{ fontSize: '1.4rem', color: '#FBC21E' }}
          />
          Table-Options
        </Typography>
      </Box>

      <div>
        <Box
          sx={{
            borderRadius: '10px',
            boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
            background: '#ffffff',
            gap: '5px',
          }}
        >
          <Box>
            <Box
              component="section"
              sx={{
                p: 2,
                border: 'none',
                marginBottom: '10px',
                marginTop: '10px',
              }}
            >
              <form>
                <Typography
                  sx={{
                    margin: {
                      xs: '4px',
                      md: '2px',
                    },
                  }}
                >
                  <strong>AssetTiger</strong> lets you decide how comprehensive
                  you want your system. Use these Options to fashion your ideal
                  asset tracking and create more reports.
                </Typography>

                <Box>
                  <Typography
                    level="h4"
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      marginBottom: '10px',
                      marginTop: '25px',
                    }}
                  >
                    <DepreciationOptions.icon
                      style={{ fontSize: '1.4rem', color: '#FBC21E' }}
                    />

                    <span style={{ marginLeft: '8px', fontSize: '16px' }}>
                      {DepreciationOptions.title}
                    </span>
                  </Typography>
                  <Typography sx={{ fontSize: '14px' }}>
                    {DepreciationOptions.description}{' '}
                  </Typography>
                  <Box>
                    <Box>
                      <FormControl
                        sx={{
                          display: 'flex',
                          flexDirection: 'row',
                          alignItems: 'center',
                          marginBottom: '10px',
                        }}
                      >
                        <Box
                          sx={{
                            display: 'flex',
                            gap:10 
                          }}
                        >
                          <FormLabel sx={{ fontSize: '14px',}}>
                            {' '}
                            {DepreciationOptions.formLabel}
                          </FormLabel>
                        </Box>
                        <RadioGroup
                          defaultValue="outlined"
                          onChange={handleDepreciationChange}
                          sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center',
                            ml: 2,
                            gap: 2,
                          }}
                        >
                          {DepreciationOptions.options.map((option) => (
                            <Box
                            sx={{
                              display: 'flex',
                              justifyContent: 'center',
                              alignItems: 'center',
                            }}
                            >
                              <Radio
                                key={option.value}
                                value={option.value}
                                label={option.label}
                                name={option.name}
                                sx={{
                                  margin: '2px',
                                }}
                              />
                            </Box>
                          ))}
                        </RadioGroup>
                      </FormControl>

                      {showDepreciationOptions && (
                        <>
                          <Typography sx={{ fontSize: '14px' }}>
                            Select the default depreciation method to be used
                            for most assets. You still have the option to
                            override and choose another depreciation method when
                            creating assets.
                          </Typography>
                          <Box>
                            <FormControl>
                              <FormLabel sx={{ fontSize: '14px' }}>
                                Default Depreciation Method
                              </FormLabel>
                              <Select
                                value={depreciationMethod}
                                onChange={handleDepreciationMethodChange}
                                placeholder="Straight Line"
                                indicator={<KeyboardArrowDown />}
                                sx={{
                                 
                                  [`& .${selectClasses.indicator}`]: {
                                    transition: '0.2s',
                                    [`&.${selectClasses.expanded}`]: {
                                      transform: 'rotate(-180deg)',
                                    },
                                  },
                                }}
                              >
                                {DepreciationOptions.depreciationMethods.map(
                                  (method) => (
                                    <Option
                                      sx={{ fontSize: '14px' }}
                                      key={method}
                                      value={method}
                                    >
                                      {method}
                                    </Option>
                                  ),
                                )}
                              </Select>
                            </FormControl>
                          </Box>
                          <FormControl>
                            <FormLabel sx={{ fontSize: '14px' }}>
                              Calculation Frequency
                            </FormLabel>
                            <Select
                              value={calculationFrequency}
                              onChange={handleCalculationFrequencyChange}
                              placeholder="Yearly"
                              indicator={<KeyboardArrowDown />}
                            >
                              {DepreciationOptions.calculationFrequencies.map(
                                (frequency) => (
                                  <Option key={frequency} value={frequency}>
                                    {frequency}
                                  </Option>
                                ),
                              )}
                            </Select>
                          </FormControl>
                        </>
                      )}
                    </Box>
                  </Box>

                  <Divider />

                  {TableData &&
                    TableData.map((item) => (
                      <div key={item.id}>
                        <Typography
                          level="h4"
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            marginBottom: '10px',
                            marginTop: '10px',
                          }}
                        >
                          <item.icon
                            style={{ fontSize: '1.4rem', color: '#FBC21E' }}
                          />

                          <span style={{ marginLeft: '8px', fontSize: '16px' }}>
                            {item.title}
                          </span>
                        </Typography>
                        <Typography sx={{ fontSize: '14px' }}>
                          {item.description}
                        </Typography>

                        <Box>
                          <FormControl
                            sx={{
                              display: 'flex',
                              flexDirection: 'row',
                              alignItems: 'center',
                              marginBottom: '10px',
                            }}
                          >
                            <Box>
                              <FormLabel sx={{ fontSize: '14px' }}>
                                {item.formLabel}
                              </FormLabel>
                            </Box>
                            <RadioGroup
                              name={item.title}
                              onChange={handleOptionChange}
                              sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                ml: 2,
                                gap: 2,
                              }}
                            >
                              {item.options.map((opt) => (
                                <Box sx={{ fontSize: '14px' }}>
                                  <Radio
                                    key={opt.value}
                                    value={opt.value}
                                    label={opt.label}
                                  />
                                </Box>
                              ))}
                            </RadioGroup>
                          </FormControl>
                        </Box>
                        <Divider />
                      </div>
                    ))}

                  <Divider />

                  <div>
                    <Typography
                      level="h4"
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        marginBottom: '10px',
                        marginTop: '10px',
                      }}
                    >
                      <span style={{ marginLeft: '8px', fontSize: '16px' }}>
                        {LinkingOptions.title}
                      </span>
                    </Typography>
                    <Typography sx={{ fontSize: '14px' }}>
                      {LinkingOptions.description}{' '}
                    </Typography>

                    <Box>
                      <FormControl
                        sx={{
                          display: 'flex',
                          flexDirection: 'row',
                          alignItems: 'center',
                          marginBottom: '10px',
                        }}
                      >
                        <Box>
                          <FormLabel sx={{ fontSize: '14px' }}>
                            {LinkingOptions.formLabel}
                          </FormLabel>
                        </Box>
                        <RadioGroup
                          defaultValue="no"
                          value={enableLinking}
                          onChange={handleEnableLinkingChange}
                          sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            ml: 2,
                            gap: 2,
                          }}
                        >
                          {LinkingOptions.options.map((option) => (
                            <Box sx={{ fontSize: '14px' }}>
                              <Radio
                                key={option.value}
                                value={option.value}
                                label={option.label}
                              />
                            </Box>
                          ))}
                        </RadioGroup>
                      </FormControl>
                    </Box>
                    {enableLinking === 'yes' && (
                      <Box>
                        <Typography sx={{ fontSize: '14px' }}>
                          When you define linked assets, you can mark them
                          Transact as a whole...
                        </Typography>
                        <FormControl component="fieldset">
                          <Box sx={{ fontSize: '14px' }}>
                            <Box marginBottom={'5px'}>
                              <Checkbox
                                name="checkout"
                                onChange={handleCheckboxChange}
                              />
                              <HowToRegOutlinedIcon /> Check-out
                            </Box>

                            <Box marginBottom={'5px'}>
                              <Checkbox
                                name="reservation"
                                onChange={handleCheckboxChange}
                              />
                              <CalendarMonthOutlinedIcon /> Reservation
                            </Box>
                            <Box marginBottom={'5px'}>
                              <Checkbox
                                name="leaseAssets"
                                onChange={handleCheckboxChange}
                              />
                              <CalendarMonthOutlinedIcon /> Lease assets
                            </Box>
                            <Box marginBottom={'5px'}>
                              <Checkbox
                                name="lostFoundAssets"
                                onChange={handleCheckboxChange}
                              />
                              <TuneOutlinedIcon /> Lost/Found'assets
                            </Box>
                            <Box marginBottom={'5px'}>
                              <Checkbox
                                name="repairAssets"
                                onChange={handleCheckboxChange}
                              />
                              <TuneOutlinedIcon /> Repair assets
                            </Box>
                            <Box marginBottom={'5px'}>
                              <Checkbox
                                name="brokenAssets"
                                onChange={handleCheckboxChange}
                              />
                              <TuneOutlinedIcon /> Broken assets
                            </Box>
                            <Box marginBottom={'5px'}>
                              <Checkbox
                                name="disposeAssets"
                                onChange={handleCheckboxChange}
                              />
                              <TuneOutlinedIcon /> Dispose assets
                            </Box>
                            <Box marginBottom={'5px'}>
                              <Checkbox
                                name="donateAssets"
                                onChange={handleCheckboxChange}
                              />
                              <TuneOutlinedIcon /> Donate assets
                            </Box>
                            <Box marginBottom={'5px'}>
                              <Checkbox
                                name="sellAssets"
                                onChange={handleCheckboxChange}
                              />
                              <TuneOutlinedIcon /> Sell assets
                            </Box>
                            <Box marginBottom={'5px'}>
                              <Checkbox
                                name="auditAssets"
                                onChange={handleCheckboxChange}
                              />
                              <TuneOutlinedIcon /> Audit assets
                            </Box>
                          </Box>
                        </FormControl>
                      </Box>
                    )}
                  </div>

                  <Divider />

                  <Grid xs={12} md={12}>
                    <React.Fragment>
                      <Box
                        sx={{
                          marginTop: '20px',
                          display: 'flex',
                          flexDirection: { md: 'row', xs: 'column' },
                          justifyContent: { xs: 'center', md: 'flex-end' },
                        }}
                      >
                        <Button
                          sx={{
                            background: 'White',
                            borderBlock: 'black',
                            color: 'black',
                            '&:hover': { background: '#d9d9d9' },
                          }}
                        >
                          Cancel
                        </Button>

                        <Button
                          onClick={handleSubmit}
                          sx={{
                            background: '#FABC1E',
                            color: 'black',
                            '&:hover': { background: '#E1A91B' },
                          }}
                        >
                          Submit
                        </Button>
                      </Box>
                    </React.Fragment>
                  </Grid>
                </Box>
              </form>
            </Box>
          </Box>
        </Box>
      </div>
    </AppView>
  )
}
export default SetupTableOptions




// import React, { useState, ChangeEvent, SyntheticEvent, useEffect } from 'react';
// import {
//   Box,
//   Typography,
//   Divider,
//   Select,
//   Option,
//   Radio,
//   RadioGroup,
//   FormControl,
//   FormLabel,
//   Checkbox,
//   Button,
// } from '@mui/joy';
// import TuneOutlinedIcon from '@mui/icons-material/TuneOutlined';
// import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
// import AppView from '../../../components/Common/AppView';
// import { useDispatch, useSelector } from 'react-redux';
// import { RootState } from '../../../redux/store';
// import { ThunkDispatch } from 'redux-thunk';
// import { fetchOptions, updateoptions } from '../../../redux/features/TableOptionsSlice';
// import TableChartOutlinedIcon from '@mui/icons-material/TableChartOutlined'

// const DepreciationOptions = {
//   id: 1,
//   title: 'Depreciation',
//   description: 'Depreciation is used to expense the cost of your assets over their useful life...',
//   formLabel: 'Asset Depreciation',
//   icon: CalendarMonthOutlinedIcon,
//   options: [
//     { name: 'assetDepreciation', value: 'yes', label: 'Yes' },
//     { name: 'assetDepreciation', value: 'no', label: 'No' },
//   ],
//   depreciationMethods: [
//     'Straight Line',
//     'Declining Balance',
//     'Double Declining',
//     'Balance',
//     '150% Declining Balance',
//   ],
//   calculationFrequencies: ['Yearly', 'Monthly', 'Quarterly'],
// };

// const LinkingOptions = {
//   id: 2,
//   title: 'Linking of Assets',
//   description: 'Enable or disable the linking of assets...',
//   formLabel: 'Enable Linking',
//   icon: CalendarMonthOutlinedIcon,
//   options: [
//     { name: 'enableLinking', value: 'yes', label: 'Yes' },
//     { name: 'enableLinking', value: 'no', label: 'No' },
//   ],
// };
// const TableOptions: React.FC = () => {
//   const [showDepreciationOptions, setShowDepreciationOptions] = useState(false);
//   const [depreciationMethod, setDepreciationMethod] = useState('');
//   const [calculationFrequency, setCalculationFrequency] = useState('');
//   const [tableOptionForm, setTableOptionForm] = useState<any>({ tableInfoData: [] });
//   const [enableLinking, setEnableLinking] = useState('yes');
//   const [linkedAssets, setLinkedAssets] = useState({
//     checkOut: false,
//     reservation: false,
//     leaseAssets: false,
//     lostFoundAssets: false,
//     repairAssets: false,
//     brokenAssets: false,
//     disposeAssets: false,
//     donateAssets: false,
//     sellAssets: false,
//     auditAssets: false,
//   });

//   const dispatch: ThunkDispatch<RootState, void, any> = useDispatch();
//   const tableOptions = useSelector((state: RootState) => state.tableOptions.data);

//   useEffect(() => {
//     dispatch(fetchOptions());
//   }, [dispatch]);

//   useEffect(() => {
//     if (tableOptions) {
//       setShowDepreciationOptions(tableOptions.depreciationOptions?.assetDepreciation === 'yes');
//       setDepreciationMethod(tableOptions.depreciationOptions?.depreciationMethod || '');
//       setCalculationFrequency(tableOptions.depreciationOptions?.calculationFrequency || '');
//       setEnableLinking(tableOptions.linkingOfAssets?.enableLinking || 'yes');
//       setLinkedAssets(tableOptions.linkingOfAssets?.linkedAssets || {
//         checkOut: false,
//         reservation: false,
//         leaseAssets: false,
//         lostFoundAssets: false,
//         repairAssets: false,
//         brokenAssets: false,
//         disposeAssets: false,
//         donateAssets: false,
//         sellAssets: false,
//         auditAssets: false,
//       });
//       setTableOptionForm(tableOptions);
//     }
//   }, [tableOptions]);

//   const handleOptionChange = (event: ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = event.target;
//     setTableOptionForm((prevData: any) => ({
//       ...prevData,
//       tableInfoData: prevData.tableInfoData.map((item: any) =>
//         item.name === name ? { ...item, selectedOption: value } : item
//       ),
//     }));
//   };

//   const handleDepreciationChange = (event: ChangeEvent<HTMLInputElement>) => {
//     const value = event.target.value;
//     setShowDepreciationOptions(value === 'yes');
//   };

//   const handleDepreciationMethodChange = (event: SyntheticEvent | null, newValue: string | null) => {
//     if (newValue !== null) {
//       setDepreciationMethod(newValue);
//     }
//   };

//   const handleCalculationFrequencyChange = (event: SyntheticEvent | null, newValue: string | null) => {
//     if (newValue !== null) {
//       setCalculationFrequency(newValue);
//     }
//   };

//   const handleEnableLinkingChange = (event: ChangeEvent<HTMLInputElement>) => {
//     const value = event.target.value;
//     setEnableLinking(value);
//   };

//   const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
//     const { name, checked } = event.target;
//     setLinkedAssets((prev) => ({ ...prev, [name]: checked }));
//   };

//   const handleSubmit = (event: SyntheticEvent) => {
//     event.preventDefault();
//     const formData = {
//       depreciationOptions: {
//         assetDepreciation: showDepreciationOptions ? 'yes' : 'no',
//         depreciationMethod: depreciationMethod ? depreciationMethod : 'no',
//         calculationFrequency: calculationFrequency ? calculationFrequency : 'no',
//       },
//       linkingOfAssets: {
//         enableLinking,
//         linkedAssets,
//       },
//       tableInfoData: tableOptionForm.tableInfoData,
//     };
//     dispatch(updateoptions(formData));
//   };


//   return (
//     <AppView>

//       <Box sx={{ boxSizing: 'border-box' }}>
//          <Typography
//            level="h4"
//            style={{ display: 'flex', alignItems: 'center', gap: 5 }}
//          >
//            <TableChartOutlinedIcon
//              style={{ fontSize: '1.4rem', color: '#FBC21E' }}
//            />
//            Table-Options
//          </Typography>
//        </Box>

//       <Box
//         sx={{
//           borderRadius: '10px',
//           boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
//           background: '#ffffff',
//           gap: '5px',
//           p: 2,
//         }}
//       >
//         <Box>
//           <Box
//             component="section"
//             sx={{
//               p: 2,
//               border: 'none',
//               marginBottom: '10px',
//               marginTop: '10px',
//             }}
//           >
//             <form onSubmit={handleSubmit}>
//               <Typography
//                 sx={{
//                   margin: {
//                     xs: '4px',
//                     md: '2px',
//                   },
//                 }}
//               >
//                 <b>AssetTiger</b> lets you decide how comprehensive you want your system. Use these Options to fashion your ideal asset tracking and create more reports.
//               </Typography>

//               <Box>
//                 <Typography
//                   level="h4"
//                   sx={{
//                     display: 'flex',
//                     alignItems: 'center',
//                     marginBottom: '10px',
//                     marginTop: '20px',
//                   }}
//                 >
                  
//                     <DepreciationOptions.icon 
//                     style={{ fontSize: '1.4rem', color: '#FBC21E' }}
//                     />

//                   <span style={{ marginLeft: '8px', fontSize:'16px' }}>{DepreciationOptions.title}</span>
//                 </Typography>
//                 <Typography
//                 // sx={{ fontSize: '14px' }}
//                 >{DepreciationOptions.description}</Typography>
//                 <Box>

//                   <Box>
//                   <FormControl
//                     sx={{
//                       display: 'flex',
//                       flexDirection: 'row',
//                       alignItems: 'center',
//                       marginBottom: '10px',
//                     }}
//                   >
//                     <Box
//                     sx={{
//                         display: 'flex',
//                         gap:10 
//                       }}
//                     >
//                       <FormLabel
//                       // sx={{ fontSize: '14px' }}
//                       >{DepreciationOptions.formLabel}</FormLabel>
//                     </Box>
//                     <RadioGroup
//                       defaultValue="outlined"
//                       name='assetDepreciation'
//                       value={showDepreciationOptions ? 'yes' : 'no'}
//                       onChange={handleDepreciationChange}
//                       sx={{
//                         display: 'flex',
//                         flexDirection: 'row',
//                         justifyContent: 'center',
//                         alignItems: 'center',
//                         ml: 2,
//                         gap: 2,
//                       }}
//                     >
//                       {DepreciationOptions.options.map((option, index) => (
//                         <Box key={index}
//                         sx={{                             display: 'flex',
//                             justifyContent: 'center',
//                       alignItems: 'center',
//                     }}
//                         >
//                           <Radio key={option.value} value={option.value} label={option.label} 
//                           sx={{
//                               margin: '2px',
//                             }}
//                           />
//                         </Box>
//                       ))}
//                     </RadioGroup>
//                   </FormControl>

//                   {showDepreciationOptions && (
//                     <>
//                       <Typography>
//                         Select the default depreciation method to be used for most assets. You still have the option to override and choose another depreciation method when creating assets.
//                       </Typography>
//                       <Box>
//                         <FormControl>
//                           <FormLabel>Default Depreciation Method</FormLabel>
//                           <Select value={depreciationMethod} onChange={handleDepreciationMethodChange} placeholder="Straight Line" required>
//                             {DepreciationOptions.depreciationMethods.map((method, index) => (
//                               <Option key={index} value={method}>
//                                 {method}
//                               </Option>
//                             ))}
//                           </Select>
//                         </FormControl>
//                       </Box>

//                       <FormControl>
//                         <FormLabel>Calculation Frequency</FormLabel>
//                         <Select value={calculationFrequency} onChange={handleCalculationFrequencyChange} placeholder="Yearly" required>
//                           {DepreciationOptions.calculationFrequencies.map((frequency) => (
//                             <Option key={frequency} value={frequency}>
//                               {frequency}
//                             </Option>
//                           ))}
//                         </Select>
//                       </FormControl>
//                     </>
//                   )}
//                 </Box>

//                 <Divider />

//                 {Array.isArray(tableOptionForm?.tableInfoData) &&
//                   tableOptionForm.tableInfoData.map((item: any) => (
//                     <div key={item.id}>
//                       <Typography
//                         level="h4"
//                         sx={{
//                           display: 'flex',
//                           alignItems: 'center',
//                           marginBottom: '10px',
//                           marginTop: '10px',
//                         }}
//                       >
//                         <div style={{ width: 25, height: 25, color: '#FBC21E' }}>
//                           <LinkingOptions.icon />
//                         </div>
//                         <span style={{ marginLeft: '8px' }}>{item.title}</span>
//                       </Typography>
//                       <Typography>{LinkingOptions.description}</Typography>

//                       <Box>
//                         <FormControl
//                           sx={{
//                             display: 'flex',
//                             flexDirection: 'row',
//                             alignItems: 'center',
//                             marginBottom: '10px',
//                           }}
//                         >
//                           <Box>
//                             <FormLabel>{LinkingOptions.formLabel}</FormLabel>
//                           </Box>
//                           <RadioGroup
//                             name={item.name}
//                             value={item.selectedOption}
//                             onChange={handleOptionChange}
//                             sx={{
//                               display: 'flex',
//                               flexDirection: 'row',
//                               ml: 2,
//                               gap: 2,
//                             }}
//                           >
//                             {LinkingOptions.options.map((opt, index) => (
//                               <Box key={index}>
//                                 <Radio key={opt.value} value={opt.value} label={opt.label} />
//                               </Box>
//                             ))}
//                           </RadioGroup>
//                         </FormControl>
//                       </Box>
//                       <Divider />
//                     </div>
//                   ))}

//                 <Typography
//                   level="h4"
//                   sx={{
//                     display: 'flex',
//                     alignItems: 'center',
//                     marginBottom: '10px',
//                     marginTop: '10px',
//                   }}
//                 >
//                   <span style={{ marginLeft: '8px' }}>{LinkingOptions.title}</span>
//                 </Typography>
//                 <Typography>{LinkingOptions.description}</Typography>

//                 <Box>
//                   <FormControl
//                     sx={{
//                       display: 'flex',
//                       flexDirection: 'row',
//                       alignItems: 'center',
//                       marginBottom: '10px',
//                     }}
//                   >
//                     <Box>
//                       <FormLabel>{LinkingOptions.formLabel}</FormLabel>
//                     </Box>
//                     <RadioGroup
//                       value={enableLinking}
//                       onChange={handleEnableLinkingChange}
//                       sx={{
//                         display: 'flex',
//                         flexDirection: 'row',
//                         ml: 2,
//                         gap: 2,
//                       }}
//                     >
//                       {LinkingOptions.options.map((option, index) => (
//                         <Box key={index}>
//                           <Radio key={option.value} value={option.value} label={option.label} />
//                         </Box>
//                       ))}
//                     </RadioGroup>
//                   </FormControl>
//                 </Box>

//                 {enableLinking === 'yes' && (
//                   <Box>
//                     <Typography>
//                       When you define linked assets, you can mark them Transact as a whole...
//                     </Typography>

//                     <FormControl component="fieldset">
//                       <Box>
//                         {Object.keys(linkedAssets).map((key) => (
//                           <Box marginBottom={'10px'} key={key}>
//                             <Checkbox name={key} checked={linkedAssets[key]} onChange={handleCheckboxChange} />
//                             <TuneOutlinedIcon /> {key.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase())}
//                           </Box>
//                         ))}
//                       </Box>
//                     </FormControl>
//                   </Box>
//                 )}
//                 <Divider />
//               </Box>
//               <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
//                 <Button
//                   sx={{
//                     background: '#388e3c',
//                     color: 'white',
//                     '&:hover': { background: '#388e3B' },
//                     borderRadius: '10px',
//                   }}
//                   // disabled={activeTab === 0}
//                   // onClick={handleBack}
//                 >
//                   Back
//                 </Button>
//                 <Button
//                   sx={{
//                     background: '#FABC1E',
//                     color: 'black',
//                     '&:hover': { background: '#E1A91B' },
//                     borderRadius: '10px',
//                   }}
//                   type="submit"
//                 >
//                   Continue
//                 </Button>
//               </Box>
//             </form>
//           </Box>
//         </Box>
//       </Box>
//     </AppView>
//   );
// };

// export default TableOptions;
