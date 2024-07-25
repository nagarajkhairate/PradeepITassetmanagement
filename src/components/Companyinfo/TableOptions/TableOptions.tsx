import React, { useState, ChangeEvent, SyntheticEvent, useEffect } from 'react';
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
} from '@mui/joy';
import TuneOutlinedIcon from '@mui/icons-material/TuneOutlined';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import AppView from '../../Common/AppView';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { ThunkDispatch } from 'redux-thunk';
import { fetchOptions, updateoptions } from '../../../redux/features/TableOptionsSlice';

const DepreciationOptions = {
  id: 1,
  title: 'Depreciation',
  description: 'Depreciation is used to expense the cost of your assets over their useful life...',
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
};

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
};

interface TableProps {
  activeTab: number;
  setActiveTab: (tab: number) => void;
}

const TableOptions: React.FC<TableProps> = ({ activeTab, setActiveTab }) => {
  const [showDepreciationOptions, setShowDepreciationOptions] = useState(false);
  const [depreciationMethod, setDepreciationMethod] = useState('');
  const [calculationFrequency, setCalculationFrequency] = useState('');
  const [tableOptionForm, setTableOptionForm] = useState<any>({ tableInfoData: [] });
  const [enableLinking, setEnableLinking] = useState('yes');
  const [linkedAssets, setLinkedAssets] = useState({
    checkOut: false,
    reservation: false,
    leaseAssets: false,
    lostFoundAssets: false,
    repairAssets: false,
    brokenAssets: false,
    disposeAssets: false,
    donateAssets: false,
    sellAssets: false,
    auditAssets: false,
  });

  const dispatch: ThunkDispatch<RootState, void, any> = useDispatch();
  const tableOptions = useSelector((state: RootState) => state.tableOptions.data);

  useEffect(() => {
    dispatch(fetchOptions());
  }, [dispatch]);

  useEffect(() => {
    if (tableOptions) {
      setShowDepreciationOptions(tableOptions.depreciationOptions?.assetDepreciation === 'yes');
      setDepreciationMethod(tableOptions.depreciationOptions?.depreciationMethod || '');
      setCalculationFrequency(tableOptions.depreciationOptions?.calculationFrequency || '');
      setEnableLinking(tableOptions.linkingOfAssets?.enableLinking || 'yes');
      setLinkedAssets(tableOptions.linkingOfAssets?.linkedAssets || {
        checkOut: false,
        reservation: false,
        leaseAssets: false,
        lostFoundAssets: false,
        repairAssets: false,
        brokenAssets: false,
        disposeAssets: false,
        donateAssets: false,
        sellAssets: false,
        auditAssets: false,
      });
      setTableOptionForm(tableOptions);
    }
  }, [tableOptions]);

  const handleOptionChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setTableOptionForm((prevData: any) => ({
      ...prevData,
      tableInfoData: prevData.tableInfoData.map((item: any) =>
        item.name === name ? { ...item, selectedOption: value } : item
      ),
    }));
  };

  const handleDepreciationChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setShowDepreciationOptions(value === 'yes');
  };

  const handleDepreciationMethodChange = (event: SyntheticEvent | null, newValue: string | null) => {
    if (newValue !== null) {
      setDepreciationMethod(newValue);
    }
  };

  const handleCalculationFrequencyChange = (event: SyntheticEvent | null, newValue: string | null) => {
    if (newValue !== null) {
      setCalculationFrequency(newValue);
    }
  };

  const handleEnableLinkingChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setEnableLinking(value);
  };

  const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    setLinkedAssets((prev) => ({ ...prev, [name]: checked }));
  };

  const handleBack = () => {
    setActiveTab(activeTab - 1);
  };

  const handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault();
    const formData = {
      depreciationOptions: {
        assetDepreciation: showDepreciationOptions ? 'yes' : 'no',
        depreciationMethod: depreciationMethod ? depreciationMethod : 'no',
        calculationFrequency: calculationFrequency ? calculationFrequency : 'no',
      },
      linkingOfAssets: {
        enableLinking,
        linkedAssets,
      },
      tableInfoData: tableOptionForm.tableInfoData,
    };
    setActiveTab(activeTab + 1);
    dispatch(updateoptions(formData));
  };


  return (
    <AppView>
      <Box
        sx={{
          borderRadius: '10px',
          boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
          background: '#ffffff',
          gap: '5px',
          p: 2,
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
            <form onSubmit={handleSubmit}>
              <Typography
                sx={{
                  margin: {
                    xs: '4px',
                    md: '22px',
                  },
                }}
              >
                <b>AssetTiger</b> lets you decide how comprehensive you want your system. Use these Options to fashion your ideal asset tracking and create more reports.
              </Typography>

              <Box>
                <Typography
                  level="h4"
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    marginBottom: '10px',
                    marginTop: '10px',
                  }}
                >
                  <div style={{ width: 25, height: 25, color: '#FBC21E' }}>
                    <DepreciationOptions.icon />
                  </div>
                  <span style={{ marginLeft: '8px' }}>{DepreciationOptions.title}</span>
                </Typography>
                <Typography>{DepreciationOptions.description}</Typography>
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
                      <FormLabel>{DepreciationOptions.formLabel}</FormLabel>
                    </Box>
                    <RadioGroup
                      defaultValue="outlined"
                      name='assetDepreciation'
                      value={showDepreciationOptions ? 'yes' : 'no'}
                      onChange={handleDepreciationChange}
                      sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        ml: 2,
                        gap: 2,
                      }}
                    >
                      {DepreciationOptions.options.map((option, index) => (
                        <Box key={index}>
                          <Radio key={option.value} value={option.value} label={option.label} />
                        </Box>
                      ))}
                    </RadioGroup>
                  </FormControl>

                  {showDepreciationOptions && (
                    <>
                      <Typography>
                        Select the default depreciation method to be used for most assets. You still have the option to override and choose another depreciation method when creating assets.
                      </Typography>
                      <Box>
                        <FormControl>
                          <FormLabel>Default Depreciation Method</FormLabel>
                          <Select value={depreciationMethod} onChange={handleDepreciationMethodChange} placeholder="Straight Line" required>
                            {DepreciationOptions.depreciationMethods.map((method, index) => (
                              <Option key={index} value={method}>
                                {method}
                              </Option>
                            ))}
                          </Select>
                        </FormControl>
                      </Box>

                      <FormControl>
                        <FormLabel>Calculation Frequency</FormLabel>
                        <Select value={calculationFrequency} onChange={handleCalculationFrequencyChange} placeholder="Yearly" required>
                          {DepreciationOptions.calculationFrequencies.map((frequency) => (
                            <Option key={frequency} value={frequency}>
                              {frequency}
                            </Option>
                          ))}
                        </Select>
                      </FormControl>
                    </>
                  )}
                </Box>

                <Divider />

                {Array.isArray(tableOptionForm?.tableInfoData) &&
                  tableOptionForm.tableInfoData.map((item: any) => (
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
                        <div style={{ width: 25, height: 25, color: '#FBC21E' }}>
                          <LinkingOptions.icon />
                        </div>
                        <span style={{ marginLeft: '8px' }}>{item.title}</span>
                      </Typography>
                      <Typography>{LinkingOptions.description}</Typography>

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
                            <FormLabel>{LinkingOptions.formLabel}</FormLabel>
                          </Box>
                          <RadioGroup
                            name={item.name}
                            value={item.selectedOption}
                            onChange={handleOptionChange}
                            sx={{
                              display: 'flex',
                              flexDirection: 'row',
                              ml: 2,
                              gap: 2,
                            }}
                          >
                            {LinkingOptions.options.map((opt, index) => (
                              <Box key={index}>
                                <Radio key={opt.value} value={opt.value} label={opt.label} />
                              </Box>
                            ))}
                          </RadioGroup>
                        </FormControl>
                      </Box>
                      <Divider />
                    </div>
                  ))}

                <Typography
                  level="h4"
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    marginBottom: '10px',
                    marginTop: '10px',
                  }}
                >
                  <span style={{ marginLeft: '8px' }}>{LinkingOptions.title}</span>
                </Typography>
                <Typography>{LinkingOptions.description}</Typography>

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
                      <FormLabel>{LinkingOptions.formLabel}</FormLabel>
                    </Box>
                    <RadioGroup
                      value={enableLinking}
                      onChange={handleEnableLinkingChange}
                      sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        ml: 2,
                        gap: 2,
                      }}
                    >
                      {LinkingOptions.options.map((option, index) => (
                        <Box key={index}>
                          <Radio key={option.value} value={option.value} label={option.label} />
                        </Box>
                      ))}
                    </RadioGroup>
                  </FormControl>
                </Box>

                {enableLinking === 'yes' && (
                  <Box>
                    <Typography>
                      When you define linked assets, you can mark them Transact as a whole...
                    </Typography>

                    <FormControl component="fieldset">
                      <Box>
                        {Object.keys(linkedAssets).map((key) => (
                          <Box marginBottom={'10px'} key={key}>
                            <Checkbox name={key} checked={linkedAssets[key]} onChange={handleCheckboxChange} />
                            <TuneOutlinedIcon /> {key.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase())}
                          </Box>
                        ))}
                      </Box>
                    </FormControl>
                  </Box>
                )}
                <Divider />
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                <Button
                  sx={{
                    background: '#388e3c',
                    color: 'white',
                    '&:hover': { background: '#388e3B' },
                    borderRadius: '10px',
                  }}
                  disabled={activeTab === 0}
                  onClick={handleBack}
                >
                  Back
                </Button>
                <Button
                  sx={{
                    background: '#FABC1E',
                    color: 'black',
                    '&:hover': { background: '#E1A91B' },
                    borderRadius: '10px',
                  }}
                  type="submit"
                >
                  Continue
                </Button>
              </Box>
            </form>
          </Box>
        </Box>
      </Box>
    </AppView>
  );
};

export default TableOptions;
