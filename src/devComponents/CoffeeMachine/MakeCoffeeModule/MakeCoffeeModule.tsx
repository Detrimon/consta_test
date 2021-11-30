import { useContext, useCallback } from 'react';
import { coffeeMachineContext } from '../context/context';

import {
  MIN_AMOUNT_OF_WATER_FOR_ONE_CUP,
  MAX_CUPS_BEFORE_CLEAN,
} from '../constants/constants';

import { typeDisplayValue } from '../commonLib/commonLib';

import Button from '../Button';
// @ts-ignore
import styles from './MakeCoffeeModule.module.css';

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
        return typeDisplayValue(
          'Недостаточно воды для приготовления кофе.',
          setDisplayValue
        );
      }

      if (numberOfCupsOfCoffeePrepared >= MAX_CUPS_BEFORE_CLEAN) {
        return typeDisplayValue(
          'Запустите очистку кофемашины перед тем, как готовить кофе.',
          setDisplayValue
        );
      }
      setIsActionInProcess(true);
      typeDisplayValue('Кофе готовится, подождите.', setDisplayValue)
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
          // setWaterAmountMl(waterAmountMl - MIN_AMOUNT_OF_WATER_FOR_ONE_CUP);
          return Promise.resolve();
        })
        .then(() => {
          typeDisplayValue('Ваш кофе готов', setDisplayValue);
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
