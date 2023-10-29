import { useForm } from 'react-hook-form';

import Button from '../ui/Button';

import styles from './UpdateUserPassword.module.css';
import { updateUserPassword } from '../services/apiAuth';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import SpinnerMini from '../ui/SpinnerMini';

function UpdateUserPasswordForm() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    getValues,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  async function onSubmit(data) {
    setIsLoading(true);
    const res = await updateUserPassword(data);

    if (
      res?.status === 'fail' &&
      res?.message === 'Your current password is incorrect'
    ) {
      toast.error(res.message, { id: 'error', duration: 3000 });
      setIsLoading(false);
      return;
    }

    if (
      res?.status === 'fail' &&
      res?.message === 'User recently changed password! Please login again'
    ) {
      toast.error(
        'User changed password more than 1 time! to secure your account please login again',
        { id: 'fail', duration: 3000 }
      );
      navigate('/login');
      localStorage.clear();
      setIsLoading(false);
      return;
    }

    if (res?.status === 'fail') {
      toast.error('Failed to update password', {
        id: 'failedToUpdate',
        duration: 1000,
      });
      setIsLoading(false);
      return;
    }

    if (res?.status === 'success') {
      toast.success('Password updated successfully');
      reset();
    }

    setIsLoading(false);
  }

  return (
    <div className={styles.updateUserPassword}>
      <h2>Update your password</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label className={styles.label} htmlFor='password'>
            Current password
            {errors?.currentPassword?.message && (
              <p className={styles.error}>{errors?.currentPassword?.message}</p>
            )}
          </label>
          <input
            id='current-password'
            type='password'
            placeholder='••••••••'
            disabled={isLoading}
            {...register('currentPassword', {
              required: 'This field is required',
              maxLength: {
                value: 30,
                message: 'Max. length 30',
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
              maxLength: {
                value: 30,
                message: 'Max. length 30',
              },
              validate: value =>
                value === getValues().password || 'Password mismatch',
            })}
          />
          <Button
            className={styles.btnUpdate}
            type='primary'
            disabled={isLoading}
          >
            {isLoading ? <SpinnerMini /> : 'Update password'}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default UpdateUserPasswordForm;
