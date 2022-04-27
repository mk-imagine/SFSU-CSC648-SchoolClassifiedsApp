import { useState } from "react";

const useChangePasswordForm = (validate) => {
  const [values, setValues] = useState({
    newPassword: "",
    comfirmNewPassword: ""
  });

  const [errors, setErrors] = useState({
    newPassword: [],
    comfirmNewPassword: []
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value
    });
  };

  const handleRecover = (e) => {
    e.preventDefault();
    setErrors(validate(values));
  };

  return { handleChange, handleRecover, values, errors };
};

export default useChangePasswordForm;
