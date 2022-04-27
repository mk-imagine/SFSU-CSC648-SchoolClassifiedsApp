const ChangePasswordValidate = (values) => {
  let errors = {
    newPassword: [],
    comfirmNewPassword: []
  };
  // const passwordPattern = new RegExp();

  const atLeastoneLowercase = new RegExp("^(?=.*[a-z]).+$");
  const atLeastOneUppercase = new RegExp("^(?=.*?[A-Z]).+$");
  const atLeastOneDigit = new RegExp("^(?=.*?[0-9]).+$");
  const atLeastOneSpecial = new RegExp("^(?=.*?[#?!@$%^&*-]).+$");

  if (!values.newPassword) {
    errors.newPassword.push("required");
  } else {
    if (values.newPassword.length < 8) {
      errors.newPassword.push("Min 8 characters ");
    }

    if (!atLeastoneLowercase.test(values.newPassword)) {
      errors.newPassword.push("Min 1 lowercase letter ");
    }

    if (!atLeastOneUppercase.test(values.newPassword)) {
      errors.newPassword.push("Min 1 uppercase letter ");
    }

    if (!atLeastOneDigit.test(values.newPassword)) {
      errors.newPassword.push("Min 1 digit ");
    }

    if (!atLeastOneSpecial.test(values.newPassword)) {
      errors.newPassword.push("Min 1 special character ");
    }
  }

  if (!values.comfirmNewPassword) {
    errors.comfirmNewPassword.push("required");
  } else if (values.comfirmNewPassword !== values.newPassword) {
    errors.comfirmNewPassword.push("password not matching");
  }
  return errors;
};

export default ChangePasswordValidate;
