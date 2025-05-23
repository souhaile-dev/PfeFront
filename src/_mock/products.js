import { sample } from 'lodash';
import { faker } from '@faker-js/faker';

// ----------------------------------------------------------------------

const PRODUCT_NAME = [
  'Camionnette Volvo 5T',
  'Camionnette Volvo 10T',
  'Milk Centrale ',
  ' couche Dalaa all size',
  'Biscuit Sandwich cookies Chocolat',
  'Cookies sandwish milk',
  // 'Nike Air Max Zephyr',
  // 'Jordan Delta',
  // 'Air Jordan XXXV PF',
  // 'Nike Waffle Racer Crater',
  // 'Kyrie 7 EP Sisterhood',
  // 'Nike Air Zoom BB NXT',
  // 'Nike Air Force 1 07 LX',
  // 'Nike Air Force 1 Shadow SE',
  // 'Nike Air Zoom Tempo NEXT%',
  // 'Nike DBreak-Type',
  // 'Nike Air Max Up',
  // 'Nike Air Max 270 React ENG',
  // 'NikeCourt Royale',
  // 'Nike Air Zoom Pegasus 37 Premium',
  // 'Nike Air Zoom SuperRep',
  // 'NikeCourt Royale',
  // 'Nike React Art3mis',
  // 'Nike React Infinity Run Flyknit A.I.R. Chaz Bear',
];
const PRODUCT_COLOR = [
  '#00AB55',
  '#000000',
  '#FFFFFF',
  '#FFC0CB',
  '#FF4842',
  '#1890FF',
  '#94D82D',
  '#FFC107',
];

// ----------------------------------------------------------------------

export const products = [...Array(3)].map((_, index) => {
  const setIndex = index + 1;

  return {
    id: faker.string.uuid(),
    cover: `/assets/images/products/product_${setIndex}.jpg`,
    name: PRODUCT_NAME[index],
    price: faker.number.int({ min: 219, max: 299, precision: 0.01 }),
    priceSale: setIndex % 3 ? null : faker.number.int({ min: 200, max: 299, precision: 0.01 }),
    colors:
      (setIndex === 1 && PRODUCT_COLOR.slice(0, 2)) ||
      (setIndex === 2 && PRODUCT_COLOR.slice(1, 3)) ||
      (setIndex === 3 && PRODUCT_COLOR.slice(2, 4)) ||
      (setIndex === 4 && PRODUCT_COLOR.slice(3, 6)) ||
      (setIndex === 23 && PRODUCT_COLOR.slice(4, 6)) ||
      (setIndex === 24 && PRODUCT_COLOR.slice(5, 6)) ||
      PRODUCT_COLOR,
    status: sample(['sale', 'new', 'en cours', '']),
  };
});
