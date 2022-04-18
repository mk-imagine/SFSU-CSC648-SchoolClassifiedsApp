export default function validate(values) {
  let errors = {};
  // const passwordPattern = new RegExp(
  //   "^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$"
  // );

    const specialChars = new RegExp(
      "^(?=.*[@$!%*?&])[@$!%*?&]$"
    );

  //   const atLeastOneUpperCase = new RegExp("^(?=.*[A-Z])[A-Z]$");
  //   const atLeastOneLowerCase = new RegExp("^(?=.*[a-z])[a-z]$");
    // const passwordLenth  = new RegExp("^{8,}$");

  if (!values.firstname.trim()) {
    errors.firstname = "Required";
  }

  if (!values.lastname.trim()) {
    errors.lastname = "Required";
  }

  if (!values.email) {
    errors.email = "SFSU email required";
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = "Email address is invalid";
  } else if (!values.email.endsWith("mail.sfsu.edu")) {
    errors.email = "Your Email address is not a SFSU email";
  }

  if (!values.password) {
    errors.password = "Password required";
  } else if (!specialChars.test(values.password)){
    errors.password =
    "need special character";
  }

  //   if (!atLeastOneUpperCase.test(values.password)) {
  //     errors.password = "At least one uppercase letter";
  //   } else if(!atLeastOneLowerCase.test(values.password)){
  //     errors.password = "At least one lowercase letter";
  //   } else if(!passwordLenth.test(values.password)){
  //     errors.password = "Minimum eight characters";
  //   }

  if (values.password2 !== values.password) {
    errors.password2 = "Passwords does not match";
  } else if (!values.password2) {
    errors.password2 = "Password required";
  }

  return errors;
}
