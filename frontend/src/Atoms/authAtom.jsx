import { atom } from 'recoil';
import { ACCESS_TOKEN } from '../constants';

const localAuthData = localStorage.getItem(ACCESS_TOKEN);

export const $isAuthorized = atom({
    key: 'isAuthorized',
    default: localAuthData
        ? {
              isAuth: true,
              user: JSON.parse(localStorage.getItem('login')), 
          }
        : {
              isAuth: false,
              user: null,
          },
});
