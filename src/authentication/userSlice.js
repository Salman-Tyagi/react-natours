import toast from 'react-hot-toast';
import { updateUserData } from '../services/apiAuth';

const initialState = {};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'updateUser':
      return { ...state, user: action.payload };

    case 'user/logout':
      return initialState;

    default:
      return initialState;
  }
};

export function updateUser(obj, setIsLoading) {
  // return { type: 'updateUser', payload: obj };
  return async function (dispatch, getState) {
    const res = await updateUserData(obj);
    if (res.status === 'fail')
      toast.error('Failed to update', { id: 'failed', duration: 1000 });

    if (res.status === 'success') {
      localStorage.setItem('user', JSON.stringify(res.data));
      dispatch({ type: 'updateUser', payload: res.data });

      toast.success('Data updated successfully', { id: 'success' });
    }

    setIsLoading(false);
  };
}

export function userLogout() {
  return { type: 'user/logout' };
}

export default userReducer;
