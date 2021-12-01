import { useContext, useCallback } from 'react';
import { coffeeMachineContext } from '../context/context';

import {
  MIN_AMOUNT_OF_WATER_FOR_ONE_CUP,
  MAX_CUPS_BEFORE_CLEAN,
  PERCENT_100,
  TIMEOUT_BETWEEN_MAKING_COFFEE_COUNTS_MS,
  NUMBER_OF_COUNTS_DURING_MAKING_COFFEE,
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
    setCoffeePreparedInPercent,
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
          const waterPart =
            MIN_AMOUNT_OF_WATER_FOR_ONE_CUP /
            NUMBER_OF_COUNTS_DURING_MAKING_COFFEE;
          const coffeePart =
            PERCENT_100 / (NUMBER_OF_COUNTS_DURING_MAKING_COFFEE * num);
          let counter = 0;
          let _coffeePartInPercent = 0;
          let _waterAmountMl = waterAmountMl;

          return new Promise((resolve) => {
            const makeTimer = setInterval(() => {
              if (counter >= NUMBER_OF_COUNTS_DURING_MAKING_COFFEE * num) {
                resolve(true);
                clearInterval(makeTimer);
              }
              _coffeePartInPercent += coffeePart;
              setCoffeePreparedInPercent(_coffeePartInPercent);
              _waterAmountMl -= waterPart;
              setWaterAmountMl(_waterAmountMl);
              counter++;
            }, TIMEOUT_BETWEEN_MAKING_COFFEE_COUNTS_MS);
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
