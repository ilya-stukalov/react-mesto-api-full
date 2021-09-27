import { useState } from 'react';
import { useCallback } from 'react';


export function useFormValidation() {

  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  function handleChange(e) {
    const target = e.target;
    const name = target.name;
    const value = target.value;
    setValues({
      ...values,
      [name]: value
    });

    setErrors({
      ...errors,
      [name]: target.validationMessage
    });
    setIsValid(target.closest('.form__container').checkValidity());
  }

  const resetForm = useCallback(
    (newValues = {},
      newErrors = {},
      newIsValid = false) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsValid(!newIsValid);
    },
    [setValues, setErrors, setIsValid]
  )

  return ({
    handleChange,
    values,
    errors,
    isValid,
    resetForm,
  });
}

export default useFormValidation;
