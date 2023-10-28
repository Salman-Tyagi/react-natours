import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

import { forgotPassword, getCurrentUser } from '../services/apiAuth';

import Button from '../ui/Button';
import SpinnerMini from '../ui/SpinnerMini';

import styles from './ForgotPassword.module.css';

function ForgotPassword() {
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState(false);
  const navigate = useNavigate();
  const user = getCurrentUser();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  async function onSubmit(data) {
    setIsLoading(true);
    const res = await forgotPassword(data);

    if (res.status === 'success') {
      setResponse(true);

      toast.success('Reset link has been sent! Please check your email', {
        id: 'success',
        duration: 3000,
      });

      reset();
    }

    if (res.status === 'fail') {
      toast.error(res.message, {
        id: 'error',
        duration: 3000,
      });
    }

    setIsLoading(false);
  }

  useEffect(() => {
    if (user) return navigate('/');
  }, []);

  return (
    <div className={styles.forgotPasswordContainer}>
      <h2>Forgot your password</h2>
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
        {!response ? (
          <div>
            <Button
              className={styles.btnReset}
              disabled={isLoading}
              type='primary'
            >
              {isLoading ? <SpinnerMini /> : 'Reset'}
            </Button>
          </div>
        ) : (
          <div className={styles.btnGoto}>
            <Button
              disabled={isLoading}
              type='primary'
              onClick={e => {
                e.preventDefault();
                navigate('/login');
              }}
            >
              Go to login page
            </Button>
          </div>
        )}
      </form>
    </div>
  );
}

export default ForgotPassword;
