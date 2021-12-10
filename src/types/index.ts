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
  openDialog: (params: { title?: string; component: JSX.Element }) => void;
  closeDialog: () => void;
  previewEle: HTMLElement;
  setPreviewEle: React.Dispatch<HTMLElement>;
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

export enum MonthsEn {
  'Jan.',
  'Feb.',
  'Mar.',
  'Apr.',
  'May.',
  'June.',
  'July.',
  'Aug.',
  'Sept.',
  'Oct.',
  'Nov.',
  'Dec.',
}

export type TDialogConfig = {
  title?: string;
  open: boolean;
  component: JSX.Element;
};

export type TAreaData = {
  [key: string]: {
    [key: string]: string;
  };
};

export interface IInfoType {
  photo: string;
  name: string;
  heroPhoto: string;
  selfIntru: string;
  heroName: string;
  reason: string;
  title: string;
  location: string;
  department: string;
  mentor: string;
  province: string;
  date: Date | null;
  hobbies: string[];
  education: string[];
  exprience: string[];
}

export interface IInfoFromFeishu {
  Birthday: string;
  'Brief Self-introduction': string;
  Department: string;
  'Education Background': string;
  'Education Background_1': string;
  'Hero Avatar': string;
  'Hero Name': string;
  Hobbies: string;
  Hobbies_1: string;
  Hobbies_2: string;
  Hobbies_3: string;
  'Line Manager': string;
  Name: string;
  'Past Experience': string;
  'Past Experience_1': string;
  Photo: string;
  'Place Of Birth': string;
  Reason: string;
  Title: string;
  'Working Location': string;
}
