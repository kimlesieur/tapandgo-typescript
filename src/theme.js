import { createTheme } from "@mui/material";

const theme = createTheme({
    components: {
      // Name of the component
      MuiButtonBase: {
        defaultProps: {
          // The props to change the default for.
          disableRipple: true, // No more ripple, on the whole application 💣!
        },
      },
      MuiBackdrop: {
        styleOverrides: {
            // Name of the slot
            root: {
              // Some CSS
              backgroundColor: 'rgba(249, 156, 94, 0.2)'
            },
          },
      }
    },
  });

export default theme;