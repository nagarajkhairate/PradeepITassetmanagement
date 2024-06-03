import { Box } from '@mui/joy'
import Img from '../../Assets/Maintainance.png'

export function Image() {
  return (
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
        alignItems: 'center',
      }}
    >
      <Box
        sx={{
          p:4,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <img
          src={Img}
          alt="img"
          style={{
            width: '60%',
            height: '60%',
          }}
        />
      </Box>
    </Box>
  )
}

export default Image
