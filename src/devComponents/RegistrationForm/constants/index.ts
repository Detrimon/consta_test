export const TIMEOUT_600 = 600;
export const REG_FORM_BASE_PATH = '/components/RegistrationForm';
export const STEP_PATH = 'Step';
export const TXT_ERR_BIRTHDAY_NOT_CHOOSEN = 'Не указана дата рождения';
export const TXT_ERR_PASSPORT_SERIES = 'Введите серию паспорта';
export const TXT_ERR_PASSPORT_NUMBER = 'Введите номер паспорта';

export enum LABELS {
  ADDRESS = 'Адрес:',
  STREET = 'Улица:',
  HOUSENUMBER = 'Номер дома:',
  BUZZER = 'Домофон:',
  ADD_INFO = 'Доп. информация:',
  SURNAME = 'Фамилия:',
  NAME = 'Имя:',
  PATRONYMIC = 'Отчество:',
  BIRTHDAY = 'Дата рождения:',
  GENDER = 'Пол:',
  PASSPORT = 'Паспорт:',
  CREDIT_CARD = 'Кредитка',
  CREDIT_CARD_NUMBER = 'Номер:',
  CREDIT_CARD_PIN = 'Пин:',
  FORWARD = 'Вперед',
  BACK = 'Назад',
}

export enum PLACEHOLDERS {
  INPUT_DELIVERY_ADDRESS = 'Введите адрес доставки.',
}

export enum INFO_MESSAGES {
  REQUIRED_FIELD = 'Обязательное поле.',
}

export enum GENDER {
  MALE = 'мужской',
  FEMALE = 'женский',
}

export enum ERROR_MESSAGES {
  WHITESPACES_IN_TEXT = 'Значение не должно содержать пробелов между словами',
  NOT_ALL_FIELDS_FIELDS = 'Возможно, не все поля заполнены',
  PIN_HAS_3_DIGITS = 'пин-код состоит из 3х цифр',
}

export enum FORMATS {
  DATE = 'DD.MM.YYYY',
}
