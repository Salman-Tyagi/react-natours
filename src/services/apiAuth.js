import axiosInstance from './axiosInstance';
import axios from 'axios';

export async function signup(newUser) {
  try {
    const res = await axios.post(
      'https://api-react-natours.onrender.com/api/v1/users/signup',
      newUser
    );
    const data = res?.data;
    return data;
  } catch (err) {
    return err?.response?.data;
  }
}

export async function login({ email, password }) {
  try {
    const res = await axiosInstance.post('/api/v1/users/login', {
      email,
      password,
    });

    if (res?.data?.status === 'success') {
      localStorage.setItem('token', res?.data?.token);
      localStorage.setItem('user', JSON.stringify(res?.data?.data));
    }
    return res?.data;
  } catch (err) {
    return err?.response?.data;
  }
}

export function getCurrentUser() {
  const user = JSON.parse(localStorage.getItem('user'));
  return user;
}

export async function updateUserData(newData) {
  const formData = new FormData();

  for (const key in newData) formData.append(key, newData[key]);

  try {
    const res = await axiosInstance.patch('/api/v1/users/update-me', formData);
    const data = res?.data;
    return data;
  } catch (err) {
    // console.error(err?.response);
    return err?.response?.data;
  }
}

export async function updateUserPassword(newPassword) {
  try {
    const res = await axiosInstance.patch(
      '/api/v1/users/update-my-password',
      newPassword
    );

    return res?.data;
  } catch (err) {
    // console.error(err?.response);
    return err?.response?.data;
  }
}

export async function forgotPassword(email) {
  try {
    const res = await axios.post(
      'https://api-react-natours.onrender.com/api/v1/users/forgot-password',
      email
    );
    return res?.data;
  } catch (err) {
    // console.error(err);
    return err?.response?.data;
  }
}

export async function resetPassword(resetToken, newPassword) {
  try {
    const res = await axiosInstance.patch(
      `/api/v1/users/reset-password/${resetToken}`,
      newPassword
    );

    return res?.data;
  } catch (err) {
    // console.error(err?.response);
    return err?.response?.data;
  }
}
