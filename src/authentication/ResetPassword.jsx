import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';

import { resetPassword } from '../services/apiAuth';

import Button from '../ui/Button';
import SpinnerMini from '../ui/SpinnerMini';

import styles from './ResetPassword.module.css';

function ResetPassword() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { resetToken } = useParams();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    getValues,
  } = useForm();

  async function onSubmit(data) {
    setIsLoading(true);
    const res = await resetPassword(resetToken, data);

    if (res.status === 'fail') {
      toast.error(res.message, {
        id: 'error',
        duration: 3000,
      });
    }

    if (res.status === 'success') {
      toast.success('Password changed successfully', {
        id: 'passwordChange',
        duration: 1000,
      });

      localStorage.setItem('token', res.token);
      localStorage.setItem('user', JSON.stringify(res.data));

      setTimeout(() => navigate('/'), 2000);
    }

    reset();
    setIsLoading(false);
  }

  return (
    <div className={styles.resetPasswordContainer}>
      <h2>Change your password</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
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
            {...register('passwordConfirm', {
              required: 'This field is required',
              validate: value =>
                value === getValues().password || 'Password mismatch',
            })}
          />
        </div>

        <div>
          <Button
            className={styles.btnUpdatePassword}
            disabled={isLoading}
            type='primary'
          >
            {isLoading ? <SpinnerMini /> : 'Update Password'}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default ResetPassword;
