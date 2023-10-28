import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useEffect, useState } from 'react';

import { getCurrentUser, login } from '../services/apiAuth';

import Button from '../ui/Button';
import styles from './Login.module.css';
import SpinnerMini from '../ui/SpinnerMini';

export default function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const user = getCurrentUser();

  const {
    register,
    handleSubmit,
    formState: { errors },
    // reset,
  } = useForm();

  async function onSubmit(data) {
    setIsLoading(true);
    const res = await login(data);

    if (res?.status === 'success') {
      toast.success('Login successfull', { id: 'success', duration: 1000 });
      setTimeout(() => navigate('/'), 1000);
    }

    if (res?.status === 'fail')
      toast.error(res.message, { id: 'error', duration: 3000 });

    setIsLoading(false);
  }

  useEffect(() => {
    if (user) return navigate('/');
  }, []);

  return (
    <div className={styles.loginFormContainer}>
      <h2>Log into your account</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.labelContainer}>
          <label className={styles.label} htmlFor='email'>
            Email address
            {errors?.email?.message && (
              <p className={styles.error}>{errors?.email?.message}</p>
            )}
          </label>
          <input
            id='email'
            // defaultValue={'salman@mailsac.com'}
            placeholder='abc@email.com'
            disabled={isLoading}
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$/,
                message: 'Email is not valid',
              },
            })}
          />
        </div>
        <div>
          <label className={styles.label} htmlFor='password'>
            Password
            {errors?.password?.message && (
              <p className={styles.error}>{errors?.password?.message}</p>
            )}
          </label>
          <input
            id='password'
            type='password'
            placeholder='••••••••'
            // defaultValue={'gotohell.com'}
            disabled={isLoading}
            {...register('password', {
              required: 'Password is required',
              minLength: {
                value: 8,
                message: 'Min. 8 characters',
              },
              maxLength: {
                value: 30,
                message: 'Max. 30 characters',
              },
            })}
          />
        </div>
        <div className={styles.btns}>
          <Button
            className={styles.btnLogin}
            disabled={isLoading}
            type='primary'
          >
            {isLoading ? <SpinnerMini /> : 'Login'}
          </Button>
          <Button
            disabled={isLoading}
            className={styles.btnForgot}
            type='primary'
            onClick={e => {
              e.preventDefault();
              navigate('/forgot-password');
            }}
          >
            Forgot password
          </Button>
        </div>
      </form>
    </div>
  );
}
