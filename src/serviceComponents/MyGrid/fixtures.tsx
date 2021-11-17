
export const data = {
  header: {
    title: 'Заголовок по центру',
  },
  menu: [
    'Home',
    'Products',
    'Restaurants',
    'Contacts'
  ],
  main: {
    text: 'Какой-то текст, который необходимо вывести'
  },
  bottom: {
    phone: '+7 455 444 44 44',
    email: 'detrimon@gmail.com'
  }
}

export type TGridData = typeof data;