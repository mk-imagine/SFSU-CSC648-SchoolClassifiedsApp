import { useState } from "react";

/**
 * Form usage handler
 * @param {*} validate 
 * @returns change handler, registration hadler, values, and errors
 */
const useForm = (validate) => {
  const [values, setValues] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    password2: ""
  });
  const [errors, setErrors] = useState({});
  // const [isSubmitting, setIsSubmitting] = useState(false);

  /**
   * Handles changes in form
   * @param {*} e 
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value
    });
  };

  /**
   * Handles errors on registration
   * @param {*} e 
   */
  const handleRegister = (e) => {
    e.preventDefault();

    setErrors(validate(values));
    // setIsSubmitting(true);
  };

  // useEffect(
  //   () => {
  //     if (Object.keys(errors).length === 0 && isSubmitting) {
  //       callback();
  //     }
  //   },
  //   [errors]
  // );

  return { handleChange, handleRegister, values, errors };
};

export default useForm;
