export interface Data {
  year: number;
  month: number;
  day: number;
  hour: number;
  text?: string;
}
export interface SelectDate {
  year: number;
  month: number;
  day: number;
}
export interface ListYear {
  firstListYears: number[];
  secondListYears: number[];
}

export interface ListDays {
  firstListDays: number[];
  secondListDays: number[];
}
export interface PropsFormSelect {
  handleFirstDateChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleSecondDateChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  firstDate: SelectDate;
  secondDate: SelectDate;
  listDays: ListDays;
  listYears: ListYear;
  monthName: string[];
}
export interface PropsSelectOption {
  handleDateChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  date: number;
  option: any;
  name: string;
}
export interface ModalProps {
  handleChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  getText: () => void;
  addChangeNote: string;
  hourActive: boolean;
}

export interface DeleteNote {
  deleteNoteHandler: (note: NoteProps) => void;
  noteList: NoteProps[];
}
export interface AdminOptionsProps {
  users: string[];
  deleteHandler: (users: string[]) => void;
  blockHandler: (users: string[]) => void;
  unlockHandler: (users: string[]) => void;
  addAdminHandler: (users: string[]) => void;
  removeAdminHandler: (users: string[]) => void;
}

export interface UserProps {
  _id: string;
  admin: boolean;
  active: boolean;
  block: boolean;
  owner: [];
  email: string;
  password: string;
  registrationDate: string;
  lastLogin: string;
}
export interface NoteProps {
  year: number;
  month: number;
  day: number;
  hour: number;
  text: string;
}
export interface UserListProps {
  users: UserProps[];
  onToggleUser: (id: string) => void;
  getAllCheck: () => void;
  selectedUsers: string[];
}

export interface PaginateProps {
  currentPage: number;
  paginatePrev: () => void;
  paginateNext: (pageNumbers: number[]) => void;
  pageSize: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  postsPerPage: number;
  totalPosts: number;
  paginate: (e: any, number: number) => void;
}
