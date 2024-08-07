import { Box, Button, Table, Typography } from '@mui/joy'
import React, { useEffect } from 'react'
import AppView from '../../../components/Common/AppView'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../redux/store'
import { ThunkDispatch } from 'redux-thunk'
import { fetchContractDatabase } from '../../../redux/features/ContractDatabaseSlice'
import { Link } from 'react-router-dom'

const ViewContract: React.FC = () => {
    const dispatch: ThunkDispatch<RootState, void, any> = useDispatch()
    const contractDatabase = useSelector(
        (state: RootState) => state.contractDatabase.data,
      )
      useEffect(() => {
        dispatch(fetchContractDatabase())
      }, [dispatch])

  return (
    <AppView>
      <Typography level="h3">Add a Contract / Software License</Typography>
      <Box
        sx={{
          borderRadius: '16px',
          boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
          background: '#FFF',
          flexGrow: 1,
          marginTop: { xs: '10px', sm: '22px' },
          height: 'auto',
          display: 'flex',
          flexDirection: 'column',
          p: 2,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: { md: 'row', xs: 'column' },
            justifyContent: { xs: 'center', md: 'flex-end' },
            gap: 2,
          }}
        >
            <Link
              to={{
                pathname: '/alerts/contracts-expiring/view-contract/edit-contract',
              }}
              style={{ textDecoration: 'none' }}
            >
          <Button
            //   onClick={() => handleEdit}
            sx={{
              fontSize: '13px',
              background: '#ffffff',
              color: 'green',
              display: 'flex',
              justifyContent: {
                md: 'flex-end',
                xs: 'center',
              },
              marginLeft: 'none',
              border: { md: '1px solid green', xs: '1px solid green' },
              borderRadius: '13px',
              '&:hover': {
                color: 'white',
                background: 'green',
              },
            }}
          >
            <EditOutlinedIcon sx={{ fontSize: '15px' }} />
            Edit
          </Button>
</Link>

          <Button
            //   onClick={() => handleDeleteButton}
            sx={{
              fontSize: '13px',
              background: '#ffffff',
              color: '#d32f2f',
              display: 'flex',
              justifyContent: { md: 'flex-end', xs: 'center' },

              marginLeft: 'none',
              border: '1px solid red ',
              borderRadius: '13px',
              '&:hover': {
                color: 'white',
                background: '#d32f2f',
              },
            }}
          >
            <DeleteForeverIcon sx={{ fontSize: '15px' }} />
            Delete
          </Button>
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
                <th scope="row">Asset Name</th>
                <td>hello</td>
              </tr>

              <tr>
                <th scope="row">Asset Name</th>
                <td>hello</td>
              </tr>

              <tr>
                <th scope="row">Asset Name</th>
                <td>hello</td>
              </tr>

              <tr>
                <th scope="row">Asset Name</th>
                <td>hello</td>
              </tr>

              <tr>
                <th scope="row">Asset Name</th>
                <td>hello</td>
              </tr>
            </thead>
          </Table>
        </Box>
      </Box>
    </AppView>
  )
}
export default React.memo(ViewContract)
