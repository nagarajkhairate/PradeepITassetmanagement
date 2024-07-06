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
// import HowToRegOutlinedIcon from "@mui/icons-material/HowToRegOutlined";
import NavigateBeforeOutlinedIcon from '@mui/icons-material/NavigateBeforeOutlined'
import NavigateNextOutlinedIcon from '@mui/icons-material/NavigateNextOutlined'
import AppView from '../../../components/Common/AppView'
import SignpostOutlinedIcon from '@mui/icons-material/SignpostOutlined'
import { ThunkDispatch } from 'redux-thunk'
import { useDispatch } from 'react-redux'
import { RootState } from '../../../redux/store'
import { addEvents, fetchEvents, updateEvents } from '../../../redux/features/EventsSlice'

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
  value: boolean |''
}

const Event: React.FunctionComponent= () => {
  const dispatch: ThunkDispatch<RootState, void, any> = useDispatch()
  const [eventForm, setEventForm] = useState<any>({})

  
  const HandleRadioSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setEventForm((prevData: any) => ({ ...prevData, [name]: value==="yes"}))
  }
  const handleSubmit = () => {
    // setCompanyFormData((prevData: any) => ({
    //   ...prevData,
    //   eventOption: eventForm,
    // }))
    console.log(JSON.stringify(eventForm, null, 2))
    dispatch(updateEvents(eventForm))
    console.log(JSON.stringify(eventForm, null, 2));
  }
  React.useEffect(()=>{
    dispatch(fetchEvents())
  },[dispatch])
  


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


  return (
    <AppView>
      <Typography
        level="h4"
        sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
      >
        <SignpostOutlinedIcon
          style={{ fontSize: '1.4rem', color: '#FBC21E' }}
        />
        EventOption
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
        <Box>
          <Typography level="body-md">Asset-related Events</Typography>
        </Box>

        <Box sx={{ ml: '20px', py: '10px' }}>
          <Typography level="body-sm">
            Do you want to register these event for the assets?
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
            <Typography level="body-sm">
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
          <Typography level="body-xs">
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
          <Box>
            <Typography level="body-sm">
              {/* <SendTwoToneIcon /> */}
              Lease assets:
            </Typography>
          </Box>
          <AssetRadioGroup
            name="leaseAssets"
            onChange={HandleRadioSelect}
            value={eventForm.leaseAssets}
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
          <Typography level="body-xs">
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
            <Typography level="body-sm">
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
          <Typography level="body-xs">
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
            <Typography level="body-sm">
              {/* <ConstructionOutlinedIcon />  */}
              Repair assets:
            </Typography>
          </Box>
          <AssetRadioGroup
            name="repairAssets"
            onChange={HandleRadioSelect}
            value={eventForm.repairAssets}
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
            <Typography level="body-sm">
              {/* <PiLinkBreakLight />  */}
              Broken assets:
            </Typography>
          </Box>
          <AssetRadioGroup
            name="brokenAssets"
            onChange={HandleRadioSelect}
            value={eventForm.brokenAssets}
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
            <Typography level="body-sm">
              {/* <PiRecycleLight />  */}
              Dispose assets:
            </Typography>
          </Box>
          <AssetRadioGroup
            name="disposeAssets"
            onChange={HandleRadioSelect}
            value={eventForm.disposeAssets}
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
            <Typography level="body-sm">
              {/* <FaRegHeart />  */}
              Donate assets:
            </Typography>
          </Box>
          <AssetRadioGroup
            name="donateAssets"
            onChange={HandleRadioSelect}
            value={eventForm.donateAssets}
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
            <Typography level="body-sm">
              {/* <GavelOutlinedIcon />  */}
              Sell assets:
            </Typography>
          </Box>
          <AssetRadioGroup
            name="sellAssets"
            onChange={HandleRadioSelect}
            value={eventForm.sellAssets}
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
            mt: 2,
            alignItems: 'center',
            flexDirection: { md: 'row'},
            justifyContent: { xs: 'space-between', md: 'flex-end' },
            gap: '5px',
            flexWrap:'wrap'
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
