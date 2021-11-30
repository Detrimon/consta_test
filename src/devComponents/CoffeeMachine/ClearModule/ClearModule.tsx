import { useMemo, useCallback, useContext } from 'react';
import { coffeeMachineContext } from '../context/context';
import {
  MAX_CUPS_BEFORE_CLEAN,
  CLEAN_THRESHOLDS_IN_PERCENT,
} from '../constants/constants';

import { timeLag, typeDisplayValue } from '../commonLib/commonLib';

import styles from './ClearModule.module.css';
import Button from '../Button';
import cn from 'classnames';

const aThresholds = Object.keys(CLEAN_THRESHOLDS_IN_PERCENT) as [
  keyof typeof CLEAN_THRESHOLDS_IN_PERCENT
];

const ClearModule = () => {
  const {
    isSwitchOn,
    numberOfCupsOfCoffeePrepared,
    isActionInProcess,
    setIsActionInProcess,
    setNumberOfCupsOfCoffeePrepared,
    setDisplayValue,
  } = useContext(coffeeMachineContext);

  const beforeCleaningInPercent = useMemo(
    () => (numberOfCupsOfCoffeePrepared * 100) / MAX_CUPS_BEFORE_CLEAN,
    [numberOfCupsOfCoffeePrepared]
  );

  const clearIndicatorColor = useMemo(() => {
    return aThresholds.reduce((result, item) => {
      if (beforeCleaningInPercent >= CLEAN_THRESHOLDS_IN_PERCENT[item].value) {
        return CLEAN_THRESHOLDS_IN_PERCENT[item].color;
      }
      return result;
    }, '');
  }, [beforeCleaningInPercent]);

  const cleanMachine = useCallback(() => {
    if (isActionInProcess) {
      return;
    }
    setIsActionInProcess(true);
    typeDisplayValue(
      'Очистка кофемашины запущена, подождите.',
      setDisplayValue,
      ''
    )
      .then(() => timeLag(10000))
      .then(() => Promise.resolve(setNumberOfCupsOfCoffeePrepared(0)))
      .then(() => {
        typeDisplayValue('Очистка завершена!', setDisplayValue);
        setIsActionInProcess(false);
      });
  }, [
    setDisplayValue,
    isActionInProcess,
    setIsActionInProcess,
    setNumberOfCupsOfCoffeePrepared,
  ]);

  return (
    <>
      <div className={styles.item_btnClearMachine}>
        <Button
          icon="clear"
          iconSize="xs"
          active={isSwitchOn}
          onClick={isSwitchOn ? () => cleanMachine() : undefined}
        />
      </div>
      <div className={styles.item_clearIndicator}>
        <div
          className={cn(styles.item_clearIndicator_container, {
            [styles.item_clearIndicator_container_active]: isSwitchOn,
          })}
        >
          <div
            className={cn(styles.item_clearIndicator_indicator, {
              [styles.item_clearIndicator_indicator_active]: isSwitchOn,
            })}
            style={{
              width: beforeCleaningInPercent + '%',
              backgroundColor: clearIndicatorColor,
            }}
          ></div>
        </div>
      </div>
    </>
  );
};

export default ClearModule;
