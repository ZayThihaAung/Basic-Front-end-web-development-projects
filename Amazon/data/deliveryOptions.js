// This is ESM or ECMAscript module code (is a a specification for using Modules in the Web)
// A module code from the internet
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
export const deliveryOptions = [
  {
    id: '1',
    deliveryDays: 7,
    priceCents: 0
  },  
  {
    id: '2',
    deliveryDays: 3,
    priceCents: 499
  },   
  {
    id: '3',
    deliveryDays: 2,
    priceCents: 999
  }
];
export function getDeliveryOptions(deliveryOptionId) {
  let deliveryOption;

  deliveryOptions.forEach(option => {
    if (deliveryOptionId === option.id) {
      deliveryOption = option;
    }
  })
  return deliveryOption || deliveryOptions[0];
}


function isWeekend(date) {
  const dayOfWeek = date.format('dddd');
  return dayOfWeek === 'Saturday' || dayOfWeek === 'Sunday';
}

export function calculateDeliveryDate(deliveryOption) {
  const today = dayjs();
  let deliveryDate = today.add(
    deliveryOption.deliveryDays,
    'days'
  );
  let remainingDays = deliveryOption.deliveryDays;
  while (remainingDays > 0) {
    deliveryDate = deliveryDate.add(1, 'day');

    if (!isWeekend(deliveryDate)) {
      remainingDays--;
    }
  }

  const dateString = deliveryDate.format(
    'dddd, MMMM D'
  );
  
  return dateString;
}