import { useState } from "react";

const useChangeUsernameForm = (validate) => {
  const [values, setValues] = useState({
    newFirstname: "",
    newLastname: ""
  });

  const [errors, setErrors] = useState({
    newFirstname: [],
    newLastname: []
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value
    });
  };

  const handleReset = (e) => {
    e.preventDefault();
    setErrors(validate(values));
  };

  return { handleChange, handleReset, values, errors };
};

export default useChangeUsernameForm;
