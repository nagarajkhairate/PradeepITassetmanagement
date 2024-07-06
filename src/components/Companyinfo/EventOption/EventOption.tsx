import React, { useState } from 'react'
import {
  Typography,
  Box,
  Button,
  Radio,
  RadioGroup,
  Divider,
  Grid,
  ButtonGroup,
} from '@mui/joy'
// import { VscSettings } from "react-icons/vsc";
import SendTwoToneIcon from '@mui/icons-material/SendTwoTone'
import ThumbDownAltOutlinedIcon from '@mui/icons-material/ThumbDownAltOutlined'
import ConstructionOutlinedIcon from '@mui/icons-material/ConstructionOutlined'
import GavelOutlinedIcon from '@mui/icons-material/GavelOutlined'
import Buttonss from './Buttonss'
// import HowToRegOutlinedIcon from "@mui/icons-material/HowToRegOutlined";
import NavigateBeforeOutlinedIcon from '@mui/icons-material/NavigateBeforeOutlined'
import NavigateNextOutlinedIcon from '@mui/icons-material/NavigateNextOutlined'
import AppView from '../../Common/AppView'
import SignpostOutlinedIcon from '@mui/icons-material/SignpostOutlined'
import { ThunkDispatch } from 'redux-thunk'
import { useDispatch } from 'react-redux'
import { addoptions} from '../../../redux/features/TabsSlice'
import AppForm from '../../Common/AppForm'
import { RootState } from '../../../redux/store'


interface EventOptionProps {
  companyFormData: any
  setCompanyFormData: any
  activeTab: number
  setActiveTab: (tab: number) => void
}
const options = [
  {
    id: 1,
    value: 'yes',
  },
  {
    id: 2,
    value: 'no',
  },
]

interface CustomButtonBoxProps {
  setupCheckoutText: string
  customizeFormText: string
}

interface AssetRadioGroupProps {
  name: string
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  value: string
}

const EventOption: React.FunctionComponent<EventOptionProps> = ({
  companyFormData,
  setCompanyFormData,
  activeTab,
  setActiveTab,
}) => {
  const [eventForm, setEventForm] = useState<any>({})
  const dispatch: ThunkDispatch<RootState, void, any> = useDispatch()

  const HandleRadioSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setEventForm((prevData: any) => ({ ...prevData, [name]: value }))
  }
  const handleSubmit = () => {
    setCompanyFormData((prevData: any) => ({
      ...prevData,
      eventOption: eventForm,
    }))
    dispatch(addoptions(companyFormData)); 
    console.log(JSON.stringify(eventForm, null, 2))
  }
  console.log(JSON.stringify(companyFormData))

  const AssetRadioGroup: React.FC<AssetRadioGroupProps> = ({
    name,
    onChange,
    value,
  }) => (
    <RadioGroup
      name={name}
      defaultValue="outlined"
      onChange={onChange}
      value={value}
    >
      <Box>
        {options.map((option) => (
          <Radio
            key={option.id}
            name={name}
            onChange={HandleRadioSelect}
            value={option.value}
            label={option.value}
            variant="outlined"
          />
        ))}
      </Box>
    </RadioGroup>
  )

  const CustomButtonBox: React.FC<CustomButtonBoxProps> = ({
    setupCheckoutText,
    customizeFormText,
  }) => {
    return (
      <Box>
        <a href="_blank">
          <Button
            sx={{
              mr: '10px',
              background: '#FDE8BC',
              border: '1px solid #C2B083',
              color: 'black',
              borderRadius: '15px',
              '&:hover': {
                background: '#FADFB4',
              },
            }}
          >
            {setupCheckoutText}
          </Button>
        </a>
        <a href="_blank">
          <Button
            sx={{
              background: '#ffffff',
              color: 'green',
              border: '1px solid green ',
              borderRadius: '15px',
              '&:hover': {
                color: 'white',
                background: 'green',  
              },
            }}
          >
            {customizeFormText}
          </Button>
        </a>
      </Box>
    )
  }

  // const handleNextTab = () => {
  //   setActiveTab(activeTab + 1);
  // };

  const handlePrevTab = () => {
    setActiveTab(activeTab - 1)
  }

  return (
    <AppForm onSubmit={handleSubmit}>
    <AppView>
      

      <Box
        sx={{
          borderRadius: '10px',
          boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
          background: '#ffffff',
          gap: '5px',
          p: 1,
        }}
      >
        <Typography
        level="h4"
        sx={{ display: 'flex', alignItems: 'center',marginBottom:'20px', gap: 1 }}
      >
        <SignpostOutlinedIcon
          style={{ fontSize: '1.4rem', color: '#FBC12E',  }}
        />
        EventOption
      </Typography>
       
          <Typography><strong>Asset-related Events</strong></Typography>
      

        
        
          <Typography
          sx={{marginTop:'20px'}}
          >
            Do you want to register these event for the assets?
          </Typography>
        
        <Divider></Divider>

        <Box
          sx={{
            display: 'flex',

            flexDirection: { md: 'row', xs: 'column' },
            gap: { md: 'none', xs: '10px' },
            justifyContent: 'space-around',
            py: '20px',
          }}
        >
          <Box>
            <Typography>
              {/* <HowToRegOutlinedIcon /> */}
              Check-out assets:
            </Typography>
          </Box>
          <AssetRadioGroup
            name="checkout"
            onChange={HandleRadioSelect}
            value={eventForm.checkout}
          />
          <>
            <CustomButtonBox
              setupCheckoutText="Setup 'Check out'"
              customizeFormText="Customize Form"
            />
            <CustomButtonBox
              setupCheckoutText="Setup 'Check in'"
              customizeFormText="Customize Form"
            />
          </>
        </Box>

        <Box sx={{ ml: { md: '260px', xs: 'none' }, paddingBottom: '20px' }}>
          <Typography>
            Assets are 'checked out' or 'assigned to' individuals. Enter
            individuals in 'Advanced; Persons/Employee' table.{' '}
          </Typography>
        </Box>
        <Divider></Divider>
        <Box
           sx={{
            display: 'flex',

            flexDirection: { md: 'row', xs: 'column' },
            gap: { md: 'none', xs: '10px' },
            justifyContent: 'space-around',
            py: '20px',
          }}
        >
          <Box>
            <Typography >
              {/* <SendTwoToneIcon /> */}
              Lease assets:
            </Typography>
          </Box>
          <AssetRadioGroup
            name="lease"
            onChange={HandleRadioSelect}
            value={eventForm.lease}
          />

          <>
            <CustomButtonBox
              setupCheckoutText="Setup 'Lease'"
              customizeFormText="Customize Form"
            />
            <CustomButtonBox
              setupCheckoutText="Setup 'Lease return'"
              customizeFormText="Customize Form"
            />
          </>
        </Box>
        <Box sx={{ ml: { md: '260px', xs: 'none' }, paddingBottom: '20px' }}>
          <Typography>
            Assets are 'leased' or 'rented/loaned' to customers. Maintain a list
            of customers in the 'Advanced &gt; Customers' table.
          </Typography>
        </Box>
        <Divider></Divider>
        <Box
          sx={{
            display: 'flex',
            flexDirection: { md: 'row', xs: 'column' },
            gap: { md: 'none', xs: '10px' },
            justifyContent: 'space-around',
            py: '20px',
          }}
        >
          <Box>
            <Typography>
              {/* <ThumbDownAltOutlinedIcon /> */}
              Lost/Found assets:
            </Typography>
          </Box>
          <AssetRadioGroup
            name="lostFound"
            onChange={HandleRadioSelect}
            value={eventForm.lostFound}
          />

          <>
            <CustomButtonBox
              setupCheckoutText="Setup 'Lost/Missing'"
              customizeFormText="Customize Form"
            />
            <CustomButtonBox
              setupCheckoutText="Setup Found"
              customizeFormText="Customize Form"
            />
          </>
        </Box>

        <Box sx={{ ml: { md: '260px', xs: 'none' }, paddingBottom: '20px' }}>
          <Typography>
            Assets are sometimes lost/found to customers. Maintain a list of
            customers in the 'Advanced &gt; Customers' table.
          </Typography>
        </Box>

        <Divider></Divider>
        <Box
          sx={{
            display: 'flex',
            flexDirection: { md: 'row', xs: 'column' },
            gap: { md: 'none', xs: '10px' },
            justifyContent: 'space-around',
            py: '20px',
          }}
        >
          <Box>
            <Typography>
              {/* <ConstructionOutlinedIcon />  */}
              Repair assets:
            </Typography>
          </Box>
          <AssetRadioGroup
            name="repair"
            onChange={HandleRadioSelect}
            value={eventForm.repair}
          />

          <CustomButtonBox
            setupCheckoutText="Setup 'Repair'"
            customizeFormText="Customize Form"
          />
        </Box>
        <Divider></Divider>
        <Box
          sx={{
            display: 'flex',
            flexDirection: { md: 'row', xs: 'column' },
            gap: { md: 'none', xs: '10px' },
            justifyContent: 'space-around',
            py: '20px',
          }}
        >
          <Box>
            <Typography>
              {/* <PiLinkBreakLight />  */}
              Broken assets:
            </Typography>
          </Box>
          <AssetRadioGroup
            name="broken"
            onChange={HandleRadioSelect}
            value={eventForm.broken}
          />

          <CustomButtonBox
            setupCheckoutText="Setup 'Broken'"
            customizeFormText="Customize Form"
          />
        </Box>

        <Divider></Divider>
        <Box
          sx={{
            display: 'flex',
            flexDirection: { md: 'row', xs: 'column' },
            gap: { md: 'none', xs: '10px' },
            justifyContent: 'space-around',
            py: '20px',
          }}
        >
          <Box>
            <Typography>
              {/* <PiRecycleLight />  */}
              Dispose assets:
            </Typography>
          </Box>
          <AssetRadioGroup
            name="dispose"
            onChange={HandleRadioSelect}
            value={eventForm.dispose}
          />

          <CustomButtonBox
            setupCheckoutText="Setup 'Dispose'"
            customizeFormText="Customize Form"
          />
        </Box>

        <Divider></Divider>
        <Box
          sx={{
            display: 'flex',
            flexDirection: { md: 'row', xs: 'column' },
            gap: { md: 'none', xs: '10px' },
            justifyContent: 'space-around',
            py: '20px',
          }}
        >
          <Box>
            <Typography>
              {/* <FaRegHeart />  */}
              Donate assets:
            </Typography>
          </Box>
          <AssetRadioGroup
            name="donate"
            onChange={HandleRadioSelect}
            value={eventForm.donate}
          />

          <CustomButtonBox
            setupCheckoutText="Setup 'Donate"
            customizeFormText="Customize Form"
          />
        </Box>

        <Divider></Divider>
        <Box
          sx={{
            display: 'flex',
            flexDirection: { md: 'row', xs: 'column' },
            gap: { md: 'none', xs: '10px' },
            justifyContent: 'space-around',
            py: '20px',
          }}
        >
          <Box>
            <Typography>
              {/* <GavelOutlinedIcon />  */}
              Sell assets:
            </Typography>
          </Box>
          <AssetRadioGroup
            name="sell"
            onChange={HandleRadioSelect}
            value={eventForm.sell}
          />

          <CustomButtonBox
            setupCheckoutText="Setup 'Sell'"
            customizeFormText="Customize Form"
          />
        </Box>
        <Divider />

        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            justifyContent: { xs: 'center', md: 'flex-end' },
            gap: 1,
            mt: 2,
          }}
        >
          <Button
            variant="solid"
            sx={{
              background: '#388e3c',
              color: 'white',
              borderRadius:'10px'
            }}
            component="label"
            onClick={handlePrevTab}
          >
            <NavigateBeforeOutlinedIcon />
            Cancel
          </Button>
          <Button
            variant="solid"
            sx={{
              background: '#FABC1E',
              color: 'black',
              '&:hover': { background: '#E1A91B' },
              borderRadius: '10px',
            }}
            component="label"
            onClick={handleSubmit}
          >
            Finish
            <NavigateNextOutlinedIcon />
          </Button>
        </Box>
      </Box>
    </AppView>
    </AppForm>
  )
}

export default EventOption
