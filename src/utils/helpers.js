export function isValidEmail(email) {
  const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/g;
  return re.test(email);
}

export function isValidFullName(name) {
  if (name.split(' ')?.length > 1) {
    const firstName =
      name.split(' ')[0][0].toUpperCase() + name.split(' ')[0].slice(1);

    const lastName =
      name.split(' ')[1][0].toUpperCase() + name.split(' ')[1].slice(1);

    const isValid = /^[a-zA-Z]+ [a-zA-Z]+$/g;
    return isValid.test(`${firstName} ${lastName}`);
  }

  return false;
}

import isValidFullName from './isValidFullName';
import isValidEmail from './isValidEmail';

export function validateData(labelArr, data) {
  let errors = {};

  labelArr.map(item => {
    if (item === 'name' && !data[item].length) {
      errors[item] = 'Required!';
    } else if (item === 'name' && !isValidFullName(data[item])) {
      errors[item] = 'Please provide full name!';
    } else;

    if (item === 'email' && !data[item].length) {
      errors[item] = 'Required!';
    } else if (item === 'email' && !isValidEmail(data[item])) {
      errors[item] = 'Please provide valid email address!';
    } else;

    if (item === 'password' && !data[item].length) {
      errors[item] = 'Required!';
    } else if (item === 'password' && data[item].length < 8) {
      errors[item] = 'Password must be 8 characters long!';
    } else;

    if (item === 'passwordConfirm' && !data[item].length) {
      errors[item] = 'Required!';
    } else if (item === 'passwordConfirm' && data.password !== data[item]) {
      errors[item] = 'Password and confirm password must be same!';
    } else;
  });

  if (Object.keys(errors).length > 0) return errors;
}
