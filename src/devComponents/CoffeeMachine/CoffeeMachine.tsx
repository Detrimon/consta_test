import { useState, useMemo, useCallback } from 'react';
import cn from 'classnames';
import styles from './CoffeeMachine.module.css';
import Button from './Button';

import Display from './Display';
import ClearModule from './ClearModule';
import MakeCoffeeModule from './MakeCoffeeModule';

import { timeLag, typeDisplayValue } from './commonLib/commonLib';

import { CoffeeMachineContextProvider } from './context/context';
import { READY } from './constants/enums';

import {
  MAX_WATER_AMOUNT,
  AMOUNT_WATER_PER_TIME,
  MIN_AMOUNT_OF_WATER_FOR_ONE_CUP,
} from './constants/constants';

import {
  MSG_ENOUGH_WATER,
  MSG_FILL_WATER_IN_PROCESS,
  MSG_LOW_WATER,
  MSG_MACHINE_NOT_PREPARED,
  MSG_MACHINE_PREPARATION,
  MSG_MACHINE_PREPARED,
} from './constants/messages';

import { skin } from './hoc/Skin';

let timer: NodeJS.Timer;

const CoffeeMachine = () => {
  const [isSwitchOn, setIsSwitchOn] = useState(false);
  const [waterAmountMl, setWaterAmountMl] = useState(4);
  const [isActionInProcess, setIsActionInProcess] = useState(false);
  const [numberOfCupsOfCoffeePrepared, setNumberOfCupsOfCoffeePrepared] =
    useState(4);
  const [displayValue, setDisplayValue] = useState<string>('');

  const coffeeMachineInitialContext = {
    isSwitchOn,
    waterAmountMl,
    isActionInProcess,
    numberOfCupsOfCoffeePrepared,
    displayValue,
    setIsSwitchOn,
    setWaterAmountMl,
    setIsActionInProcess,
    setNumberOfCupsOfCoffeePrepared,
    setDisplayValue,
  };

  const waterAmountInPercent = useMemo(
    () => (waterAmountMl * 100) / MAX_WATER_AMOUNT,
    [waterAmountMl]
  );

  const stopFillingWaterTank = useCallback(() => {
    clearInterval(timer);
    setIsActionInProcess(false);
  }, []);

  const startFillingWaterTank = useCallback(() => {
    if (isActionInProcess) {
      return;
    }
    setIsActionInProcess(true);
    let currentValue = waterAmountMl;

    if (currentValue >= MAX_WATER_AMOUNT) {
      typeDisplayValue(MSG_ENOUGH_WATER, setDisplayValue);
      return;
    }

    typeDisplayValue(MSG_FILL_WATER_IN_PROCESS, setDisplayValue);

    timer = setInterval(() => {
      if (currentValue >= MAX_WATER_AMOUNT) {
        return stopFillingWaterTank();
      }

      if (currentValue + AMOUNT_WATER_PER_TIME >= MAX_WATER_AMOUNT) {
        currentValue = MAX_WATER_AMOUNT - AMOUNT_WATER_PER_TIME;
      }
      currentValue += AMOUNT_WATER_PER_TIME;
      setWaterAmountMl(currentValue);
    }, 500);
  }, [stopFillingWaterTank, isActionInProcess, waterAmountMl]);

  const switchMachine = useCallback(() => {
    if (isActionInProcess) {
      return;
    }

    if (isSwitchOn) {
      return setIsSwitchOn(!isSwitchOn);
    } else {
      setIsSwitchOn(!isSwitchOn);
    }

    setIsActionInProcess(true);
    if (isSwitchOn) return;
    typeDisplayValue(MSG_MACHINE_PREPARATION, setDisplayValue)
      .then(() => timeLag(2000))
      .then(() => {
        return waterAmountMl < MIN_AMOUNT_OF_WATER_FOR_ONE_CUP
          ? Promise.resolve({
              status: READY.FALSE,
              message: MSG_LOW_WATER,
            })
          : Promise.resolve({ status: READY.TRUE });
      })
      .then((result: any) => {
        if (result.status === READY.TRUE) {
          return typeDisplayValue(MSG_MACHINE_PREPARED, setDisplayValue);
        }
        if (result.status === READY.FALSE) {
          return typeDisplayValue(
            `${MSG_MACHINE_NOT_PREPARED} ${result.message}`,
            setDisplayValue
          );
        }
      })
      .then(() => {
        setIsActionInProcess(false);
      });
  }, [isActionInProcess, isSwitchOn, waterAmountMl]);

  return (
    <CoffeeMachineContextProvider value={coffeeMachineInitialContext}>
      <div
        className={cn(styles.front__border, {
          [styles.front__border_active]: isSwitchOn,
        })}
      >
        <div className={styles.gridContainer}>
          <div className={styles.item_switch}>
            <Button
              icon="power"
              active={isSwitchOn}
              onClick={() => switchMachine()}
            />
          </div>

          <MakeCoffeeModule />

          <div className={styles.item_btnWaterFill}>
            <Button
              icon="fillWater"
              iconSize="xs"
              active={isSwitchOn}
              onMouseUp={isSwitchOn ? () => stopFillingWaterTank() : undefined}
              onMouseDown={
                isSwitchOn ? () => startFillingWaterTank() : undefined
              }
            />
          </div>

          <ClearModule />

          <div className={styles.item_waterTank}>
            <div
              className={cn(styles.waterIndicator_container, {
                [styles.waterIndicator_container_active]: isSwitchOn,
              })}
            >
              <div
                className={styles.waterIndicator_indicator}
                style={{ height: waterAmountInPercent + '%' }}
              ></div>
            </div>
          </div>
          <Display />
        </div>
      </div>
    </CoffeeMachineContextProvider>
  );
};

export default skin(CoffeeMachine);
