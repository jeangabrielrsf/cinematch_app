import { createTheme } from '@mui/material/styles';


declare module '@mui/material/styles' {
  interface Palette {
    custom: Palette['primary'];
  }

  interface PaletteOptions {
    custom?: PaletteOptions['primary'];
  }
}

declare module '@mui/material/Pagination' {
  interface PaginationPropsColorOverrides {
    custom: true;
  }
}


const theme = createTheme({
  palette: {
    custom: {
      main: '#FB8500',
      light:'#fff',
      dark: '#FB8500',
      contrastText: '#FB8500'
    },

  },
});

export default theme