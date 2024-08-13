import React, { useState } from 'react'
import { Typography, Box, Button, Radio, RadioGroup, Divider } from '@mui/joy'
import NavigateBeforeOutlinedIcon from '@mui/icons-material/NavigateBeforeOutlined'
import NavigateNextOutlinedIcon from '@mui/icons-material/NavigateNextOutlined'
import AppView from '../../../components/Common/AppView'
import SignpostOutlinedIcon from '@mui/icons-material/SignpostOutlined'
import { ThunkDispatch } from 'redux-thunk'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../redux/store'
import { fetchEvents, updateEvents } from '../../../redux/features/EventsSlice'
import HowToRegTwoToneIcon from '@mui/icons-material/HowToRegTwoTone';
import SendAndArchiveTwoToneIcon from '@mui/icons-material/SendAndArchiveTwoTone';
import ThumbsUpDownTwoToneIcon from '@mui/icons-material/ThumbsUpDownTwoTone';
import BuildTwoToneIcon from '@mui/icons-material/BuildTwoTone';
import FormatColorResetTwoToneIcon from '@mui/icons-material/FormatColorResetTwoTone';
import PlayDisabledTwoToneIcon from '@mui/icons-material/PlayDisabledTwoTone';
import VolunteerActivismTwoToneIcon from '@mui/icons-material/VolunteerActivismTwoTone';
import StorefrontTwoToneIcon from '@mui/icons-material/StorefrontTwoTone';

const options = [
  {
    id: 1,
    value: 'yes',
    label: 'Yes',
  },
  {
    id: 2,
    value: 'no',
    label: 'No',
  },
]

interface CustomButtonBoxProps {
  setupCheckoutText: string
  customizeFormText: string
}

interface AssetRadioGroupProps {
  name: string
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  value: boolean | ''
}

const Event: React.FunctionComponent = () => {
  const dispatch: ThunkDispatch<RootState, void, any> = useDispatch()
  const [eventForm, setEventForm] = useState<any>({ id: 1 })
  const events = useSelector((state: RootState) => state.events.data)

  const HandleRadioSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setEventForm((prevData: any) => ({ ...prevData, [name]: value === 'yes' }))
  }
  const handleSubmit = () => {
    const updatedEventForm = { ...eventForm }
    console.log(JSON.stringify(eventForm, null, 2))
    dispatch(updateEvents(updatedEventForm))
    console.log(JSON.stringify(eventForm, null, 2))
  }

  React.useEffect(() => {
    if (events.length > 0) {
      setEventForm(events[0])
    }
  }, [events])

  React.useEffect(() => {
    dispatch(fetchEvents())
  }, [dispatch])

  const AssetRadioGroup: React.FC<AssetRadioGroupProps> = ({
    name,
    onChange,
    value,
  }) => (
    <RadioGroup
      name={name}
      defaultValue="outlined"
      onChange={onChange}
      value={value === true ? 'yes' : value === false ? 'no' : ''}
      sx={{ display: 'flex', gap: 2, justifyContent:'center' }}
    >
      <Box
        sx={{
          display: 'flex',
          gap: 2,
          textAlign: { xs: 'center', md: 'left' },
          justifyContent: { md: 'left', xs: 'center' },
          flexDirection: { md: 'left', xs: 'center' },
          mt:1,
        }}
      >
        {options.map((option) => (
          <Radio
            key={option.id}
            name={name}
            onChange={HandleRadioSelect}
            value={option.value}
            label={option.label}
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
      <Box
        sx={{
          display: 'flex',
          textAlign: { xs: 'center', md: 'left' },
          justifyContent: { md: 'left',  },
          flexDirection: { md: 'left', },
        }}
      >
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

  return (
    <AppView>
      <Typography
        level="h3"
        sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
      >
        <SignpostOutlinedIcon
          style={{ fontSize: '1.6rem', color: '#FBC21E' }}
        />
        EventOption
      </Typography>

      <Box
        sx={{
          borderRadius: '10px',
          boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
          background: '#ffffff',
          gap: '5px',
          p: 1,
        }}
      >
        <Box>
          <Typography
            level="h4"
            sx={{
              display: 'flex',
              textAlign: { xs: 'center', md: 'left' },
              justifyContent: { md: 'left', xs: 'center' },
              flexDirection: { md: 'left', xs: 'center' },
            }}
          >
            Asset-related Events
          </Typography>
        </Box>

        <Box
          sx={{
            display: 'flex',
            textAlign: { xs: 'center', md: 'left' },
            justifyContent: { md: 'left', xs: 'center' },
            flexDirection: { md: 'left', xs: 'center' },
            gap: 1,
            py: '10px',
          }}
        >
          <Typography>
            <strong>Do you want to register these event for the assets?</strong>
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
          <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: { md: 'flex-start',  },
            textAlign: {  md: 'left' },
            flex: '1 1 auto',
          }}
          >
            <Typography
              sx={{
                display: 'flex',
                textAlign: { xs: 'center', md: 'left' },
                justifyContent: { md: 'left', xs: 'center' },
                flexDirection: { md: 'left', xs: 'center' },
                gap:1
              }}
            >
              <HowToRegTwoToneIcon  style={{color:'#FBC21E',}}/>
              <strong>Check-out assets:</strong>
            </Typography>
          </Box>
          <Box
            sx={{
              flex: '2 2 auto',
              display: 'flex',
              justifyContent: {md:'center', xs:'left'}, // Center radio buttons
            }}
          >
          <AssetRadioGroup
            name="checkout"
            onChange={HandleRadioSelect}
            value={eventForm.checkout}
          />
          </Box>
          <>
            <CustomButtonBox
              setupCheckoutText="Setup 'Check out'"
              customizeFormText="Customize Form"
            />
            <CustomButtonBox
              setupCheckoutText="Setup 'Check inn'"
              customizeFormText="Customize Form"
            />
          </>
        </Box>

        <Box sx={{ ml: { md: '260px', xs: 'none' }, paddingBottom: '10px' }}>
          <Typography
          sx={{
            fontSize:'14px',
            
          }}
          >
            Assets are 'checked out' or 'assigned to' individuals. Enter
            individuals in 'Advanced &gt; Persons/Employee' table.{' '}
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
          <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: { md: 'flex-start' },
            textAlign: {  md: 'left' },
            flex: '1 1 auto',
          }}
          >
            <Typography
              sx={{
                display: 'flex',
                textAlign: { xs: 'center', md: 'left' },
                justifyContent: { md: 'left', xs: 'center' },
                flexDirection: { md: 'left', xs: 'center' },
                gap:1
              }}
            >
              <SendAndArchiveTwoToneIcon style={{color:'#FBC21E',}}/>
              <strong>Lease assets:</strong>
            </Typography>
          </Box>

          <Box
            sx={{
              flex: '2 2 auto',
              display: 'flex',
              justifyContent: {md:'center', xs:'left'},
            }}
          >
          <AssetRadioGroup
            name="leaseAssets"
            onChange={HandleRadioSelect}
            value={eventForm.leaseAssets}
          />
          </Box>

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
        <Box sx={{ ml: { md: '260px', xs: 'none' }, paddingBottom: '10px' }}>
          <Typography
          sx={{
            fontSize:'14px',
          }}
          >
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
          <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: { md: 'flex-start' },
            textAlign: { xs: 'center', md: 'left' },
            flex: '1 1 auto',
          }}
          >
            <Typography
              sx={{
                display: 'flex',
                textAlign: { xs: 'center', md: 'left' },
                justifyContent: { md: 'left', xs: 'center' },
                flexDirection: { md: 'left', xs: 'center' },
                gap:1
              }}
            >
              <ThumbsUpDownTwoToneIcon style={{color:'#FBC21E',}}/>
              <strong>Lost/Found assets:</strong>
            </Typography>
          </Box>
          <Box
            sx={{
              flex: '4 4 auto',
              display: 'flex',
              justifyContent: {md:'center', xs:'left'},
            }}
          >
          <AssetRadioGroup
            name="lostFound"
            onChange={HandleRadioSelect}
            value={eventForm.lostFound}
          />
</Box>
          <>
            <CustomButtonBox
              setupCheckoutText="Setup 'Lost'"
              customizeFormText="Customize Form"
            />
            <CustomButtonBox
              setupCheckoutText="Setup Found"
              customizeFormText="Customize Form"
            />
          </>
        </Box>

        <Box sx={{ ml: { md: '260px', xs: 'none' }, paddingBottom: '10px' }}>
          <Typography
          sx={{
            fontSize:'14px',
          }}
          >
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
            <Typography
              sx={{
                display: 'flex',
                textAlign: { xs: 'center', md: 'left' },
                justifyContent: { md: 'left' },
                flexDirection: { md: 'left', xs: 'center' },
                gap:1
              }}
            >
              <BuildTwoToneIcon style={{fontSize:'1.2rem',color:'#FBC21E', marginTop:2}} /> 
              <strong>Repair assets:</strong>
            </Typography>
          </Box>

          <Box
            sx={{
              flex: '4 4 auto',
              display: 'flex',
              justifyContent: {md:'center', xs:'left'}
            }}
          >
            <AssetRadioGroup
              name="repairAssets"
              onChange={HandleRadioSelect}
              value={eventForm.repairAssets}
            />
          </Box>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center', // Vertically align items
              justifyContent: { md: 'flex-end', }, // Align content to the right or center
            }}
          >
            <CustomButtonBox
              setupCheckoutText="Setup 'Repair'"
              customizeFormText="Customize Form"
            />
          </Box>
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
            <Typography
              sx={{
                display: 'flex',
                textAlign: { xs: 'center', md: 'left' },
                justifyContent: { md: 'left' },
                flexDirection: { md: 'left', xs: 'center' },
                gap:1
              }}
            >
              <FormatColorResetTwoToneIcon  style={{color:'#FBC21E',}}/> 
              <strong>Broken assets:</strong>
            </Typography>
          </Box>

          <Box
            sx={{
              flex: '4 4 auto',
              display: 'flex',
              justifyContent: {md:'center', xs:'left'}
            }}
          >
            <AssetRadioGroup
              name="brokenAssets"
              onChange={HandleRadioSelect}
              value={eventForm.brokenAssets}
            />
          </Box>

          <Box
            sx={{
              display: 'flex',
              alignItems: 'center', // Vertically align items
              justifyContent: { md: 'flex-end', }, // Align content to the right or center
            }}
          >
            <CustomButtonBox
              setupCheckoutText="Setup 'Broken'"
              customizeFormText="Customize Form"
            />
          </Box>
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
            <Typography
              sx={{
                display: 'flex',
                textAlign: { xs: 'center', md: 'left' },
                justifyContent: { md: 'left' },
                flexDirection: { md: 'left', xs: 'center' },
                gap:1
              }}
            >
              <PlayDisabledTwoToneIcon style={{color: '#FBC21E'}}/> 
              <strong>Dispose assets:</strong>
            </Typography>
          </Box>

          <Box
            sx={{
              flex: '4 4 auto',
              display: 'flex',
              justifyContent: {md:'center', xs:'left'}
            }}
          >
            <AssetRadioGroup
              name="disposeAssets"
              onChange={HandleRadioSelect}
              value={eventForm.disposeAssets}
            />
          </Box>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center', // Vertically align items
              justifyContent: { md: 'flex-end',  }, // Align content to the right or center
            }}
          >
            <CustomButtonBox
              setupCheckoutText="Setup 'Dispose'"
              customizeFormText="Customize Form"
            />
          </Box>
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
            <Typography
              sx={{
                display: 'flex',
                textAlign: { xs: 'center', md: 'left' },
                justifyContent: { md: 'left' },
                flexDirection: { md: 'left', xs: 'center' },
                gap:1
              }}
            >
              <VolunteerActivismTwoToneIcon style={{fontSize:'1.3rem', color:'#FBC21E',}} /> 
              <strong>Donate assets:</strong>
            </Typography>
          </Box>

          <Box
           sx={{
            flex: '4 4 auto',
            display: 'flex',
            justifyContent: {md:'center', xs:'left'}
          }}
          >
            <AssetRadioGroup
              name="donateAssets"
              onChange={HandleRadioSelect}
              value={eventForm.donateAssets}
            />
          </Box>

          <Box
            sx={{
              display: 'flex',
              alignItems: 'center', // Vertically align items
              justifyContent: { md: 'flex-end', }, // Align content to the right or center
            }}
          >
            <CustomButtonBox
              setupCheckoutText="Setup 'Donate"
              customizeFormText="Customize Form"
            />
          </Box>
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
            <Typography
              sx={{
                display: 'flex',
                textAlign: { xs: 'center', md: 'left' },
                justifyContent: { md: 'left' },
                flexDirection: { md: 'left', xs: 'center' },
                gap:1
              }}
            >
              <StorefrontTwoToneIcon style={{fontSize:'1.2rem', color:'#FBC21E', marginTop:'2px' }} /> 
              <strong>Sell assets:</strong>
            </Typography>
          </Box>

          <Box
             sx={{
              flex: '4 4 auto',
              display: 'flex',
              justifyContent: {md:'center', xs:'left'}
            }}
          >
            <AssetRadioGroup
              name="sellAssets"
              onChange={HandleRadioSelect}
              value={eventForm.sellAssets}
            />
          </Box>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center', // Vertically align items
              justifyContent: { md: 'flex-end' }, // Align content to the right or center
            }}
          >
            <CustomButtonBox
              setupCheckoutText="Setup 'Sell'"
              customizeFormText="Customize Form"
            />
          </Box>
        </Box>
        <Divider />

        <Box
          sx={{
            display: 'flex',
            mt: 2,
            alignItems: 'center',
            flexDirection: { md: 'row' },
            justifyContent: { xs: 'space-between', md: 'flex-end' },
            gap: '5px',
            flexWrap: 'wrap',
          }}
        >
          <Button
            variant="solid"
            sx={{
              background: '#388e3c',
              color: 'black',
              // borderRadius: '15px',
            }}
            component="label"
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
              // borderRadius: '15px',
            }}
            component="label"
            onClick={handleSubmit}
          >
            Submit
            <NavigateNextOutlinedIcon />
          </Button>
        </Box>
      </Box>
    </AppView>
  )
}

export default Event
