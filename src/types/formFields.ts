import { IOption } from "./option";

export interface IFormField {
  name: string;

  type:
  | "text"
  | "email"
  | "password"
  | "number"
  | "date"
  | "time"
  | "datetime-local"
  | "checkbox"
  | "radio"
  | "select"
  | "hidden"
  | "multi select"
  | "image"
  | "checkboxes"
  | "editor"
  | "textarea";
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  autoFocus?: boolean;
  options?: IOption[];
  defaultValue?: any;
  multiple?: boolean;
}

export interface IField {
  name?: string;
  type?: string;
  placeholder?: string;
  value?: string;
  label?: string;
  key?: string;
  disabled?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  options?: IOption[];
}