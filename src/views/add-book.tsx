'use client';

import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import BookIcon from '@mui/icons-material/LibraryBooksOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Alert } from '@mui/material';

// Project imports
import SendBook from 'sections/bookSend';

const defaultTheme = createTheme();

interface IAlert {
  showAlert: boolean;
  alertMessage: string;
  alertSeverity: string;
}

const EMPTY_ALERT: IAlert = {
  showAlert: false,
  alertMessage: '',
  alertSeverity: ''
};

export default function BookSend() {
  const [alert, setAlert] = React.useState(EMPTY_ALERT);

  const onSuccess = () => {
    setAlert({
      showAlert: true,
      alertMessage: 'The book was added!',
      alertSeverity: 'success'
    });
  };

  const onError = (message: string) => {
    setAlert({
      showAlert: true,
      alertMessage: 'Book not added! Error: ' + message,
      alertSeverity: 'error'
    });
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      {alert.showAlert && (
        <Alert severity={alert.alertSeverity as any} onClose={() => setAlert(EMPTY_ALERT)}>
          {alert.alertMessage}
        </Alert>
      )}
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <BookIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Add book
          </Typography>

          <Box sx={{ mt: 1 }}>
            <SendBook onSuccess={onSuccess} onError={onError} />
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
