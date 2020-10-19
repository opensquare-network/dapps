import { atom } from 'recoil';

export const testState = atom({
  key: 'testState',
  default: 'test'
});

export default testState
