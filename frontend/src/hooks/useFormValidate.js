import React, { useCallback } from "react";

function useFormValidate() {
  const [values, setValues] = React.useState({});
  const [errors, setErrors] = React.useState({});
  const [isFormValid, setIsFormValid] = React.useState(false);

  function onChange(e) {
    const { name, value } = e.target;
    const error = e.target.validationMessage;
    setValues((values) => ({ ...values, [name]: value }));
    setErrors((errors) => ({ ...errors, [name]: error }));
    setIsFormValid(e.target.closest("form").checkValidity());
  }

  const resetValidation = useCallback(
    (values = {}, errors = {}, isFormValid = false) => {
      setValues(values);
      setErrors(errors);
      setIsFormValid(isFormValid);
    },
    []
  );

  return {
    values,
    errors,
    onChange,
    resetValidation,
    isFormValid,
  };
}

export default useFormValidate;
