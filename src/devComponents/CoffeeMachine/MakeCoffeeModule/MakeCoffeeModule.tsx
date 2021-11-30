import { useContext, useCallback } from 'react';
import { coffeeMachineContext } from '../context/context';

import {
  MIN_AMOUNT_OF_WATER_FOR_ONE_CUP,
  MAX_CUPS_BEFORE_CLEAN,
} from '../constants/constants';

import { typeDisplayValue } from '../commonLib/commonLib';

import Button from '../Button';
import styles from './MakeCoffeeModule.module.css';
import {
  MSG_COFFEE_IS_READY,
  MSG_MAKING_COFFEE_IN_PROCESS,
  MSG_NOT_ENOUGH_WATER,
  MSG_START_CLEAN,
} from '../constants/messages';

const MakeCoffeeModule = () => {
  const {
    isSwitchOn,
    isActionInProcess,
    waterAmountMl,
    numberOfCupsOfCoffeePrepared,
    setDisplayValue,
    setIsActionInProcess,
    setWaterAmountMl,
    setNumberOfCupsOfCoffeePrepared,
  } = useContext(coffeeMachineContext);

  const makeCoffee = useCallback(
    (num: 1 | 2) => {
      if (isActionInProcess) {
        return;
      }

      if (waterAmountMl < MIN_AMOUNT_OF_WATER_FOR_ONE_CUP * num) {
        return typeDisplayValue(MSG_NOT_ENOUGH_WATER, setDisplayValue);
      }

      if (numberOfCupsOfCoffeePrepared >= MAX_CUPS_BEFORE_CLEAN) {
        return typeDisplayValue(MSG_START_CLEAN, setDisplayValue);
      }
      setIsActionInProcess(true);
      typeDisplayValue(MSG_MAKING_COFFEE_IN_PROCESS, setDisplayValue)
        .then(() => {
          const waterPart = MIN_AMOUNT_OF_WATER_FOR_ONE_CUP / 10;
          let counter = 0;
          let _waterAmountMl = waterAmountMl;
          return new Promise((resolve) => {
            const makeTimer = setInterval(() => {
              if (counter >= 10 * num) {
                resolve(true);
                clearInterval(makeTimer);
              }
              _waterAmountMl -= waterPart;
              setWaterAmountMl(_waterAmountMl);
              counter++;
            }, 500);
          });
        })
        .then(() => {
          setNumberOfCupsOfCoffeePrepared(numberOfCupsOfCoffeePrepared + num);
          return Promise.resolve();
        })
        .then(() => {
          typeDisplayValue(MSG_COFFEE_IS_READY, setDisplayValue);
          setIsActionInProcess(false);
        });
    },
    [
      numberOfCupsOfCoffeePrepared,
      waterAmountMl,
      isActionInProcess,
      setDisplayValue,
      setIsActionInProcess,
      setNumberOfCupsOfCoffeePrepared,
      setWaterAmountMl,
    ]
  );

  return (
    <>
      <div className={styles.item_btnMakeCoffee}>
        <div>
          <Button
            icon="cupOfCoffee"
            iconSize="s"
            active={isSwitchOn}
            onClick={isSwitchOn ? () => makeCoffee(1) : undefined}
          />
        </div>
        <div>
          <Button
            icon="doubleCoffee"
            iconSize="s"
            active={isSwitchOn}
            onClick={isSwitchOn ? () => makeCoffee(2) : undefined}
          />
        </div>
      </div>
    </>
  );
};

export default MakeCoffeeModule;
