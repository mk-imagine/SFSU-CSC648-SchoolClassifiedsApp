const recoverPasswordValidate = (values) => {
  let errors = {
    emailAddress: []
  };

  if (!values.emailAddress) {
    errors.emailAddress.push("required");
  } else if (!values.emailAddress.endsWith("mail.sfsu.edu")) {
    errors.emailAddress.push("Your Email address is not the SFSU email");
  }

  return errors;
};

export default recoverPasswordValidate;
