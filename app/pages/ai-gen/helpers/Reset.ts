import { InputFields } from "../types/models";

export const initialFormData: InputFields = {
  email: '',
  name: '',
  noun: '',
  verb: '',
  fontStyle: '',
  colorPalette: 'neutral',
  theme: '',
  artStyle: '',
};

export const initialErrors: InputFields = {
  email: '',
  name: '',
  noun: '',
  verb: '',
  fontStyle: '',
  colorPalette: '',
  theme: '',
  artStyle: '',
};

export const initialIsValid: Record<keyof InputFields, boolean> = {
  email: false,
  name: false,
  noun: false,
  verb: false,
  fontStyle: false,
  colorPalette: true,
  theme: false,
  artStyle: false,
};
