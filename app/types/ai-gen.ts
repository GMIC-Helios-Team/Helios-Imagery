export interface InputFields {
  email: string;
  name: string;
  noun: string;
  verb: string;
  fontStyle: string;
  colorPalette: string;
  theme: string;
  artStyle: string;
}

export interface InputProps { 
  formData: InputFields;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
  isValid:  Record<keyof InputFields, boolean>;
  errors: InputFields;
  isLoading: boolean;
}



export interface SelectProps { 
  formData: InputFields;
  handleChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  isValid:  Record<keyof InputFields, boolean>;
  isLoading: boolean;
}

