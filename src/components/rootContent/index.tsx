import React, { createContext, useState } from 'react';
import { TRootContext, TEmployee, TEvent, TDialogConfig } from '../../types';
import { Dialog, DialogContent, DialogTitle } from '@mui/material';

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
      {props.children}
      <Dialog open={dialogConfig.open} onClose={handleCloseDialog}>
        {dialogConfig.title && <DialogTitle>{dialogConfig.title}</DialogTitle>}
        <DialogContent>{DialogComponent}</DialogContent>
      </Dialog>
    </Provider>
  );
};

export default RootProvider;
