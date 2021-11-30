import { createContext } from 'react';

type TInitialContext = {
  isSwitchOn: boolean;
  waterAmountMl: number;
  isActionInProcess: boolean;
  numberOfCupsOfCoffeePrepared: number;
  displayValue: string;

  setIsSwitchOn: React.Dispatch<React.SetStateAction<boolean>>;
  setWaterAmountMl: React.Dispatch<React.SetStateAction<number>>;
  setIsActionInProcess: React.Dispatch<React.SetStateAction<boolean>>;
  setNumberOfCupsOfCoffeePrepared: React.Dispatch<React.SetStateAction<number>>;
  setDisplayValue: React.Dispatch<React.SetStateAction<string>>;
};

export const initialContext = {
  isSwitchOn: false,
  waterAmountMl: 4,
  isActionInProcess: false,
  numberOfCupsOfCoffeePrepared: 4,
  displayValue: '',

  setIsSwitchOn: (value: boolean) => {},
  setWaterAmountMl: (value: number) => {},
  setIsActionInProcess: (value: boolean) => {},
  setNumberOfCupsOfCoffeePrepared: (value: number) => {},
  setDisplayValue: (value: string) => {},
} as TInitialContext;

export const coffeeMachineContext = createContext(initialContext);

export const CoffeeMachineContextProvider = coffeeMachineContext.Provider;
export const CoffeeMachineContextConsumer = coffeeMachineContext.Consumer;
