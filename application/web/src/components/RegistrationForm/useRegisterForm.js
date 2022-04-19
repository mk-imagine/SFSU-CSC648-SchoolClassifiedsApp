import { useState, useEffect } from 'react';

const useForm = validate => {
  const [values, setValues] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    password2: ''
  });

  const [errors, setErrors] = useState({
    firstname: [],
    lastname: [],
    email: [],
    password: [],
    password2: []
  });

  
  const handleChange = e => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value
    });
  };

  const handleRegister = e => {
    e.preventDefault();
    setErrors(validate(values));
  };

  return { handleChange, handleRegister, values, errors };
};

export default useForm;

