import { ReactJSXElement } from '@emotion/react/types/jsx-namespace';

export type TRootContext = {
  month: number;
  setMonth: React.Dispatch<React.SetStateAction<number>>;
  events: TEvent[];
  setEvents: React.Dispatch<React.SetStateAction<TEvent[]>>;
  birthdayPerson: TEmployee[];
  anniversaryPerson: TEmployee[];
  newHeros: TEmployee[];
  setBirthdayPerson: React.Dispatch<React.SetStateAction<TEmployee[]>>;
  setAnniversaryPerson: React.Dispatch<React.SetStateAction<TEmployee[]>>;
  setNewHeros: React.Dispatch<React.SetStateAction<TEmployee[]>>;
  openDialog: (params: any) => void;
  closeDialog: () => void;
};

export type TEmployee = {
  avatar: string;
  name: string;
  heroName: string;
  officePost: string;
  jobTitle?: string;
  birthDate?: string;
  bordTime?: string;
  anniversary?: number;
};

export type TEvent = {
  value: string;
  showError: boolean;
};

export enum Months {
  '一月',
  '二月',
  '三月',
  '四月',
  '五月',
  '六月',
  '七月',
  '八月',
  '九月',
  '十月',
  '十一月',
  '十二月',
}

export type TDialogConfig = {
  title?: string;
  open: boolean;
  component: JSX.Element;
};
