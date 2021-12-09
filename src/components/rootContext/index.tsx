import { createContext, useState } from 'react';
import { TRootContext, TEmployee, TEvent, TDialogConfig } from '../../types';
import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(() => ({
  dialog: {
    '& .MuiDialog-paper': {
      maxWidth: '80%',
    },
  },
}));

const currentMonth = new Date().getMonth();
export const rootContext = createContext<TRootContext>({
  month: 0,
  setMonth: () => {},
  events: [],
  setEvents: () => {},
  birthdayPerson: [],
  anniversaryPerson: [],
  newHeros: [],
  setBirthdayPerson: () => {},
  setAnniversaryPerson: () => {},
  setNewHeros: () => {},
  openDialog: () => {},
  closeDialog: () => {},
  previewEle: null!,
  setPreviewEle: () => {},
});

const RootProvider = (props: any) => {
  const [previewEle, setPreviewEle] = useState<HTMLElement>(null!);
  const [month, setMonth] = useState(currentMonth);
  const [events, setEvents] = useState<TEvent[]>([]);
  const [birthdayPerson, setBirthdayPerson] = useState<TEmployee[]>([]);
  const [anniversaryPerson, setAnniversaryPerson] = useState<TEmployee[]>([]);
  const [newHeros, setNewHeros] = useState<TEmployee[]>([]);
  const [dialogConfig, setDialogConfig] = useState<TDialogConfig>({
    title: '',
    open: false,
    component: <></>,
  });

  const classes = useStyles();

  const theme = createTheme({
    palette: {
      primary: {
        main: '#008CFF',
      },
    },
    components: {
      MuiButton: {
        styleOverrides: {
          contained: {
            background: '#008CFF',
            boxShadow: 'none',
            color: '#fff',
            textTransform: 'capitalize',
            borderColor: '#008cff',

            '&:hover': {
              background: '#0070CC',
              boxShadow: 'none',
            },
          },
          outlined: {
            color: '#008CFF',
            borderWidth: '2px',
            borderColor: '#008cff',

            '&:hover': {
              borderWidth: '2px',
              color: '#0070CC',
              boxShadow: 'none',
              background: 'transparent',
            },
          },
        },
      },

      MuiSelect: {
        styleOverrides: {
          root: {
            '&:focus': {
              borderColor: 'red',
            },
          },
        },
      },
    },
  });

  const handleOpenDialog = (config: {
    title?: string;
    component: JSX.Element;
  }) => {
    setDialogConfig({
      ...config,
      open: true,
    });
  };
  const handleCloseDialog = () => {
    setDialogConfig({
      title: '',
      open: false,
      component: <></>,
    });
  };

  const { Provider } = rootContext;
  const { component: DialogComponent } = dialogConfig;

  return (
    <Provider
      value={{
        month,
        setMonth,
        events,
        setEvents,
        birthdayPerson,
        anniversaryPerson,
        newHeros,
        setBirthdayPerson,
        setAnniversaryPerson,
        setNewHeros,
        openDialog: handleOpenDialog,
        closeDialog: handleCloseDialog,
        previewEle,
        setPreviewEle,
      }}
    >
      <ThemeProvider theme={theme}>
        {props.children}
        <Dialog
          open={dialogConfig.open}
          classes={{ root: classes.dialog }}
          onClose={handleCloseDialog}
        >
          {dialogConfig.title && (
            <DialogTitle>
              {dialogConfig.title}
              {handleCloseDialog ? (
                <IconButton
                  aria-label="close"
                  onClick={handleCloseDialog}
                  sx={{
                    position: 'absolute',
                    right: 8,
                    top: 8,
                    color: '#008CFF',
                  }}
                >
                  <CloseIcon />
                </IconButton>
              ) : null}
            </DialogTitle>
          )}
          <DialogContent>{DialogComponent}</DialogContent>
        </Dialog>
      </ThemeProvider>
    </Provider>
  );
};

export default RootProvider;
