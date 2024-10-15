import { InputFields } from "@/types/ai-gen";

export const initialFormData: InputFields = {
  email: '',
  name: '',
  noun: '',
  verb: '',
  fontStyle: 'sans-serif',
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
  fontStyle: true,
  colorPalette: true,
  theme: false,
  artStyle: false,
};
