export default function validate(values) {
  let errors = {
    firstname: [],
    lastname: [],
    email: [],
    password: [],
    password2: []
  };

  const atLeastoneLowercase = new RegExp("^(?=.*[a-z]).+$");
  const atLeastOneUppercase = new RegExp("^(?=.*?[A-Z]).+$");
  const atLeastOneDigit = new RegExp("^(?=.*?[0-9]).+$");
  const atLeastOneSpecial = new RegExp("^(?=.*?[#?!@$%^&*-]).+$");
 
  // #1 verify firstname
  if (!values.firstname.trim()) {
    errors.firstname.push("Required");
  }

  // #2 verify lastname
  if (!values.lastname.trim()) {
    errors.lastname. push("Required");
  }

  // #3 verify sfsu email
  if (!values.email) {
    errors.email.push("SFSU email required");
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.email.push("Email address is invalid");
  } else if (!values.email.endsWith("mail.sfsu.edu")) {
    errors.email.push("Your Email address is not the SFSU email") ;
  }

  // #4 verify password
  if (!values.password) {
    errors.password.push("required");
  } else {

    if(values.password.length<8){
      errors.password.push("Min 8 characters ");
    }

    if (!atLeastoneLowercase.test(values.password)) {
      errors.password.push("Min 1 lowercase letter ");
    }

    if (!atLeastOneUppercase.test(values.password)) {
      errors.password.push("Min 1 uppercase letter ");
    }

    if (!atLeastOneDigit.test(values.password)) {
      errors.password.push("Min 1 digit ");
    }

    if (!atLeastOneSpecial.test(values.password)) {
      errors.password.push("Min 1 special character ");
    }
  }
  
  // #4 verify confirmed password
  if (values.password2 !== values.password) {
    errors.password2.push("Passwords does not match");
  } else if (!values.password2) {
    errors.password2.push("Password required");
  }

  return errors;
}
