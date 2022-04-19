import React from "react";

const userNameFormValidate = (values) => {
  let errors = {
    newFirstname: [],
    newLastname: [],
  };

  if (!values.newFirstname.trim()) {
    errors.newFirstname.push("required");
  } 

  if (!values.newLastname.trim()) {
    errors.newLastname.push("required");
  } 

  return errors;
};

export default userNameFormValidate;
