import { useContext, useMemo, useCallback } from 'react';
import Button from '../Button';
import styles from './WaterModule.module.css';
import cn from 'classnames';
import { coffeeMachineContext } from '../context/context';
import {
  MAX_WATER_AMOUNT,
  AMOUNT_WATER_PER_TIME,
} from '../constants/constants';
import {
  MSG_FILL_WATER_IN_PROCESS,
  MSG_ENOUGH_WATER,
} from '../constants/messages';
import { typeDisplayValue } from '../commonLib/commonLib';

let timer: NodeJS.Timer;

const WaterModule = () => {
  const {
    isSwitchOn,
    waterAmountMl,
    setIsActionInProcess,
    isActionInProcess,
    setDisplayValue,
    setWaterAmountMl,
  } = useContext(coffeeMachineContext);

  const waterAmountInPercent = useMemo(
    () => (waterAmountMl * 100) / MAX_WATER_AMOUNT,
    [waterAmountMl]
  );

  const stopFillingWaterTank = useCallback(() => {
    clearInterval(timer);
    setIsActionInProcess(false);
  }, [setIsActionInProcess]);

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
  }, [
    stopFillingWaterTank,
    isActionInProcess,
    waterAmountMl,
    setDisplayValue,
    setIsActionInProcess,
    setWaterAmountMl,
  ]);

  return (
    <>
      <div className={styles.item_btnWaterFill}>
        <Button
          icon="fillWater"
          iconSize="xs"
          active={isSwitchOn}
          onMouseUp={isSwitchOn ? () => stopFillingWaterTank() : undefined}
          onMouseDown={isSwitchOn ? () => startFillingWaterTank() : undefined}
        />
      </div>
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
    </>
  );
};

export default WaterModule;
