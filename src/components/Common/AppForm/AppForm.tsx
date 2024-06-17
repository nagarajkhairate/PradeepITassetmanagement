import { Box, Grid } from '@mui/joy';
import { ReactNode, FormHTMLAttributes, FunctionComponent } from 'react';


interface Props extends FormHTMLAttributes<HTMLFormElement> {
  children: ReactNode;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

const AppForm: FunctionComponent<Props> = ({ children, onSubmit, ...restOfProps }) => {
  return (
    <form onSubmit={onSubmit} {...restOfProps}>
      <Grid container direction="column" alignItems="center">
        <Box maxWidth="100%" width="100%">
          {children}
        </Box>
      </Grid>
    </form>
  );
};

export default AppForm;
