import { atom } from 'recoil';

const savedCart = JSON.parse(localStorage.getItem('cart')) || [];

export const cartState = atom({
  key: 'cartState',
  default: savedCart,
  effects_UNSTABLE: [
    ({ onSet }) => {
      onSet((newValue) => {
        localStorage.setItem('cart', JSON.stringify(newValue));
      });
    },
  ],
});
