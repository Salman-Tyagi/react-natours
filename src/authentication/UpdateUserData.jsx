import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getCurrentUser } from '../services/apiAuth';
import { updateUser } from './userSlice';

import Button from '../ui/Button';
import SpinnerMini from '../ui/SpinnerMini';

import styles from './UpdateUserData.module.css';
import BASE_API_URL from '../services/BASE_API_URL';

function UpdateUserDataForm() {
  const [isLoading, setIsLoading] = useState(false);

  let user = getCurrentUser();
  const [image, setImage] = useState(null);
  const { user: userState } = useSelector(state => state.user);
  const dispatch = useDispatch();

  if (userState) user = userState;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  async function onSubmit(data) {
    setIsLoading(true);
    const obj = data;
    if (image) {
      obj.photo = image;
    }

    dispatch(updateUser(obj, setIsLoading));
  }

  return (
    <div className={styles.updateUserDataForm}>
      <h2>Your account settings</h2>
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
            placeholder='John Doe'
            disabled={isLoading}
            defaultValue={user.name}
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
            placeholder='you@example.com'
            disabled={isLoading}
            defaultValue={user.email}
            {...register('email', {
              required: 'This field is required',
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$/,
                message: 'Email is not valid',
              },
            })}
          />
        </div>

        <div className={styles.fileInputContainer}>
          {user?.photo ? (
            <img
              className={styles.userPhoto}
              src={`${BASE_API_URL}/img/users/${user.photo}`}
              alt={`photo of ${user.name}`}
            />
          ) : (
            <span className={styles.nameInitial}>
              {user?.name?.at(0).toUpperCase()}
            </span>
          )}
          <label className={styles.photoLabel} htmlFor='photo'>
            Choose new photo
          </label>
          <input
            id='photo'
            type='file'
            disabled={isLoading}
            accept='image/*'
            {...register('photo')}
            onChange={e => {
              setImage(e.target.files[0]);
            }}
          />
          <Button
            disabled={isLoading}
            className={styles.btnUpdate}
            type='primary'
          >
            {isLoading ? <SpinnerMini /> : 'Update settings'}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default UpdateUserDataForm;
