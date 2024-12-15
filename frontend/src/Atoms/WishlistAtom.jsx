import { atom } from 'recoil';

const savedWishList = JSON.parse(localStorage.getItem('wishList')) || [];

export const wishlistState = atom({
  key: 'wishlistState',
  default: savedWishList,
  effects_UNSTABLE: [
    ({ onSet }) => {
      onSet((newValue) => {
        localStorage.setItem('wishList', JSON.stringify(newValue));
      });
    },
  ],
});
