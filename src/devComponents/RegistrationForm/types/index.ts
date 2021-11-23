export type TCSteps = {
  aSteps?: TStep[];
  saveFormData: any;
};

export type TStep = {
  label: string;
  disabled?: boolean;
  completed?: boolean;
};
