import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

import { getCurrentUser, signup } from '../services/apiAuth';

import Button from '../ui/Button';
import SpinnerMini from '../ui/SpinnerMini';

import styles from './Login.module.css';

export default function Signup() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const user = getCurrentUser();

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    reset,
  } = useForm();

  async function onSubmit(data) {
    setIsLoading(true);
    const res = await signup(data);

    if (res.status === 'success') {
      toast.success(res.message, { id: 'success', duration: 1000 });
      setTimeout(() => navigate('/login'), 2000);
      reset();
    }

    if (res.status === 'fail')
      toast.error(`${res.message.split(':')[1]} already exists`, {
        duration: 3000,
        id: 'error',
      });

    setIsLoading(false);
  }

  useEffect(() => {
    if (user) return navigate('/');
  }, []);

  return (
    <div className={styles.loginFormContainer}>
      <h2>Create your account</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor='name' className={styles.label}>
            Name
            {errors?.name?.message && (
              <p className={styles.error}>{errors?.name?.message}</p>
            )}
          </label>
          <input
            id='name'
            type='text'
            disabled={isLoading}
            placeholder='John Doe'
            // defaultValue={'Salman'}
            {...register('name', {
              required: 'This field is required',
              maxLength: {
                value: 30,
                message:
                  'Max. length should not be exceed more than 30 characters',
              },
            })}
          />
        </div>

        <div>
          <label className={styles.label} htmlFor='email'>
            Email address
            {errors?.email?.message && (
              <p className={styles.error}>{errors?.email?.message}</p>
            )}
          </label>
          <input
            id='email'
            placeholder='abc@email.com'
            disabled={isLoading}
            // defaultValue={'salman@mailsac.com'}
            {...register('email', {
              required: 'This field is required',
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
            disabled={isLoading}
            // defaultValue={'gotohell.com'}
            {...register('password', {
              required: 'This field is required',
              minLength: {
                value: 8,
                message: 'Min. length 8 characters',
              },
              maxLength: {
                value: 30,
                message: 'Max. length 30',
              },
            })}
          />
        </div>

        <div>
          <label className={styles.label} htmlFor='passwordConfirm'>
            Password Confirm
            {errors?.passwordConfirm?.message && (
              <p className={styles.error}>{errors?.passwordConfirm?.message}</p>
            )}
          </label>
          <input
            id='passwordConfirm'
            type='password'
            placeholder='••••••••'
            disabled={isLoading}
            // defaultValue={'gotohell.com'}
            {...register('passwordConfirm', {
              required: 'This field is required',
              validate: value =>
                value === getValues().password || 'Password mismatch',
            })}
          />
        </div>

        <div>
          <Button
            className={styles.btnSignup}
            disabled={isLoading}
            type='primary'
          >
            {isLoading ? <SpinnerMini /> : 'Signup'}
          </Button>
        </div>
      </form>
    </div>
  );
}
