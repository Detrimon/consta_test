import { useState, useCallback, useMemo } from 'react';
import cn from 'classnames';
import styles from './CoffeeMachine.module.css';
import Button from './Button';

import Display from './Display';
import ClearModule from './ClearModule';
import MakeCoffeeModule from './MakeCoffeeModule';
import WaterModule from './WaterModule';

import { timeLag, typeDisplayValue } from './commonLib/commonLib';

import { CoffeeMachineContextProvider } from './context/context';
import { READY } from './constants/enums';

import {
  HEIGH_OF_COFFEE_BLOCK_IN_PIXEL,
  MIN_AMOUNT_OF_WATER_FOR_ONE_CUP,
  PERCENT_100,
} from './constants/constants';

import {
  MSG_LOW_WATER,
  MSG_MACHINE_NOT_PREPARED,
  MSG_MACHINE_PREPARATION,
  MSG_MACHINE_PREPARED,
} from './constants/messages';

import { skin } from './hoc/Skin';

const CoffeeMachine = () => {
  const [isSwitchOn, setIsSwitchOn] = useState(false);
  const [waterAmountMl, setWaterAmountMl] = useState(4);
  const [isActionInProcess, setIsActionInProcess] = useState(false);
  const [numberOfCupsOfCoffeePrepared, setNumberOfCupsOfCoffeePrepared] =
    useState(4);
  const [displayValue, setDisplayValue] = useState<string>('');
  const [coffeePreparedInPercent, setCoffeePreparedInPercent] =
    useState<number>(0);

  const coffeeMachineInitialContext = {
    isSwitchOn,
    waterAmountMl,
    isActionInProcess,
    numberOfCupsOfCoffeePrepared,
    displayValue,
    coffeePreparedInPercent,
    setIsSwitchOn,
    setWaterAmountMl,
    setIsActionInProcess,
    setNumberOfCupsOfCoffeePrepared,
    setDisplayValue,
    setCoffeePreparedInPercent,
  };

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

  const coffeeHeightInPercent = useMemo(
    () =>
      (coffeePreparedInPercent * HEIGH_OF_COFFEE_BLOCK_IN_PIXEL) / PERCENT_100,
    [coffeePreparedInPercent]
  );

  return (
    <CoffeeMachineContextProvider value={coffeeMachineInitialContext}>
      <div
        className={cn(styles.front__border, {
          [styles.front__border_active]: isSwitchOn,
        })}
      >
        <div className={styles.gridContainer}>
          <div className={styles.item_switch}>
            <Button icon="power" onClick={() => switchMachine()} />
          </div>

          <MakeCoffeeModule />
          <WaterModule />
          <ClearModule />
          <Display />
          <div className={styles.item_takeACoffee}>
            <div
              className={styles.takeACoffee_container}
              style={{ height: `${coffeeHeightInPercent}px` }}
            >
              <div className={styles.takeACoffee_smoothLine}></div>
              <img
                src="../../assets/coffee.png"
                width="120px"
                height="100px"
                alt="coffee"
                className={styles.takeACoffee_image}
              />
            </div>
          </div>
        </div>
      </div>
    </CoffeeMachineContextProvider>
  );
};

export default skin(CoffeeMachine);
