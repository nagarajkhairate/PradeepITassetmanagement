import { Box, Grid } from '@mui/joy'
import { ReactNode, FormHTMLAttributes, FunctionComponent } from 'react'

interface Props extends FormHTMLAttributes<HTMLFormElement> {
  children: ReactNode
}

const AppView: FunctionComponent<Props> = ({ children }) => {
  return (
    <Grid container color="">
      <Box
        component="main"
        className="MainContent"
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          minWidth: 0,
          height: '100dvh',
          gap: 1,
        }}
      >
        {children}
      </Box>
    </Grid>
  )
}

export default AppView
