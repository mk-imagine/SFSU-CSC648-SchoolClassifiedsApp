const ChangePasswordValidate = (values) => {
  let errors = {
    newPassword: [],
    comfirmNewPassword: []
  };
  // const passwordPattern = new RegExp();

  const atLeastoneLowercase = new RegExp("^(?=.*[a-z]).+$");
  const atLeastOneUppercase = new RegExp("^(?=.*?[A-Z]).+$");
  const atLeastOneDigit = new RegExp("^(?=.*?[0-9]).+$");
  // const atLeastOneSpecial = new RegExp("^(?=.*?[#?!@$%^&*-]).+$");
  const atLeastOneSpecial = new RegExp("^(?=.*?[/*-+!@#$^&]).+$");

  if (!values.newPassword) {
    errors.newPassword.push("New Password required");
  } else {
    if (values.newPassword.length < 8) {
      errors.newPassword.push("Must contain at least 8 characters ");
    }

    if (!atLeastoneLowercase.test(values.newPassword)) {
      errors.newPassword.push("Must contain at least one lowercase character ");
    }

    if (!atLeastOneUppercase.test(values.newPassword)) {
      errors.newPassword.push("Must contain at least at least one uppercase character ");
    }

    if (!atLeastOneDigit.test(values.newPassword)) {
      errors.newPassword.push("Must contain at least at least one digit ");
    }

    if (!atLeastOneSpecial.test(values.newPassword)) {
      errors.newPassword.push("Must contain at least at least one special character (/*-+!@#$^&) ");
    }
  }

  if (!values.comfirmNewPassword) {
    errors.comfirmNewPassword.push("Comfirm new password required");
  } else if (values.comfirmNewPassword !== values.newPassword) {
    errors.comfirmNewPassword.push("Passwords does not match");
  }
  return errors;
};

export default ChangePasswordValidate;
