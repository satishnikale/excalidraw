import { atom } from 'recoil';

export const isUserLoggedInState = atom<boolean>({
  key: 'isUserLoggedInState', // unique ID (must be unique across your app)
  default: false,             // default value
});