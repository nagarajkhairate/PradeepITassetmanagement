import React,{useState} from 'react'
import {
  Box,
  Typography,

  Divider,
} from "@mui/joy";

const Reserve = (props:any) => {
  const [reserveData,setReserveData] = useState(props.assetDetail || {})
  const reserveUpdater = ()=>{
    props.handleUpdatedData({ tabName :'assetDetail', tabsData: reserveData
})
}
  return (
    <>
        <Box sx={{ paddingBottom: "20px" }}>
                <Typography level="h4">Reserve</Typography>
              </Box>
              <Divider></Divider>
    </>
  )
}

export default Reserve
