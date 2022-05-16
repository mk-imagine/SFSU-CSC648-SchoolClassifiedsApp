import { useState } from "react";

const useRecoverPasswordForm = (validate) => {
  const [values, setValues] = useState({
    emailAddress: ""
  });

  const [errors, setErrors] = useState({
    emailAddress: []
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value
    });
  };

  const handleRequest = (e) => {
    e.preventDefault();
    setErrors(validate(values));
  };

  return { handleChange, handleRequest, values, errors };
};

export default useRecoverPasswordForm;
