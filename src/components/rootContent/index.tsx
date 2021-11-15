import { createContext, useState } from 'react';
import { TRootContext, TEmployee, TEvent } from '../../types';

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
});

const RootProvider = (props: any) => {
  const [month, setMonth] = useState(currentMonth);
  const [events, setEvents] = useState<TEvent[]>([]);
  const [birthdayPerson, setBirthdayPerson] = useState<TEmployee[]>([]);
  const [anniversaryPerson, setAnniversaryPerson] = useState<TEmployee[]>([]);
  const [newHeros, setNewHeros] = useState<TEmployee[]>([]);

  const { Provider } = rootContext;

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
      }}
    >
      {props.children}
    </Provider>
  );
};

export default RootProvider;
