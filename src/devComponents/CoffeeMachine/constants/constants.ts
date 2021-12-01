export const MAX_WATER_AMOUNT = 2000;
export const MIN_AMOUNT_OF_WATER_FOR_ONE_CUP = 200;
export const MAX_CUPS_BEFORE_CLEAN = 10;
export const MAX_CUPS_PER_TIME = 2;
export const AMOUNT_WATER_PER_TIME = 90;
export const PERCENT_100 = 100;
export const HEIGH_OF_COFFEE_BLOCK_IN_PIXEL = 118;
export const NUMBER_OF_COUNTS_DURING_MAKING_COFFEE = 50; // Количество перерисовок при приготовлении кофе
export const TIMEOUT_BETWEEN_MAKING_COFFEE_COUNTS_MS = 250;

export const CLEAN_THRESHOLDS_IN_PERCENT = {
  low: {
    value: 0,
    color: 'lightgreen',
  },
  normal: {
    value: 50,
    color: 'green',
  },
  high: {
    value: 85,
    color: 'orange',
  },
  stop: {
    value: 100,
    color: 'red',
  },
};
