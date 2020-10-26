import { login } from '@/services/user.service'
import { EStorageKey, local } from '@/common/utils/storage.util';
import { profile } from '../services/user.service';
// import { message } from 'antd';

export default {
  namespace: 'user',
  state: {
    pId: null,
    nickName: null,
    phone: null,
    level: null
  },
  reducers: {
    setUser(state, action) {
      const user = { ...action.user };
      user.pId = user.uuid;
      console.log({ ...state, ...user })
      return { ...state, ...user };
    }
  },
  effects: {
    *profile({ payload }, { put, call }) {
      if (!local.get(EStorageKey.Authorization)) return;
      const { data: user } = yield profile();
      yield put({ type: 'setUser', user });
      
    }
  }, 
  subscriptions: {},
}