import { useState, useRef, useEffect } from "react";

export const formatJSON = (str) => JSON.stringify(JSON.parse(str), null, 2);

export const asJSON = (str) => {
  try {
    JSON.parse(str);
    return null;
  } catch {
    return "Invalid JSON";
  }
};

export const notEmpty = (str, { fieldName }) => {
  if (str) return null;
  return `Field "${fieldName}" can not be empty`;
};

export const unlike =
  (targetFieldName) =>
  (value, { fieldName, getValue }) => {
    if (value !== getValue(targetFieldName)) return null;
    return `"${fieldName}" can not have the same value of "${targetFieldName}"`;
  };

export const useForm = (
  fieldsConfig,
  { validate = (fields, errors) => errors, resetOnChange = [] } = {}
) => {
  const [, render] = useState(0);
  const bindingsRef = useRef({});
  const valuesRef = useRef({});

  const __validateChain = (chain, ...args) => {
    const errors = Array.isArray(chain)
      ? chain.map((fn) => fn(...args))
      : [chain(...args)];

    if (errors.every(($) => $ === null)) return null;
    return errors.filter(($) => $ !== null).shift();
  };

  const bind = (fieldName, bindConfig = {}) => {
    const {
      type = "text",
      defaultValue = "",
      validate = () => null,
      validateOn = "blur",
      validateOnSubmit = null,
      modifier = ($) => $,
      ...fieldOptions
    } = bindConfig;

    // Collect all the bindings
    if (!bindingsRef.current[fieldName]) {
      bindingsRef.current[fieldName] = {
        type,
        defaultValue,
        validate,
        validateOn,
        validateOnSubmit: validateOnSubmit || validate,
        modifier,
        ...fieldOptions
      };
    }

    const fieldDef = bindingsRef.current[fieldName];

    // Set default value for the field
    if (!valuesRef.current[fieldName]) {
      valuesRef.current[fieldName] = {
        value:
          fieldDef.type === "checkbox" ? Boolean(defaultValue) : defaultValue,
        error: null
      };
    }

    const fieldVal = valuesRef.current[fieldName];

    const createNewValueHandler = (evtName) => (evtData) => {
      const value =
        fieldDef.type === "checkbox"
          ? evtData.target.checked
          : evtData.target.value;

      const validateResult = __validateChain(validate, value, {
        ...bindConfig,
        fieldName,
        getValue
      });
      const isValid = validateResult === null;

      valuesRef.current = {
        ...valuesRef.current,
        [fieldName]: {
          value: isValid ? modifier(value) : value,
          error: validateOn === evtName ? validateResult : null
        }
      };

      render(evtData);
    };

    switch (fieldDef.type) {
      case "checkbox":
        return {
          ...fieldOptions,
          checked: fieldVal.value,
          onChange: createNewValueHandler("change")
        };
      case "select":
        return {
          ...fieldOptions,
          value: fieldVal.value,
          // error: Boolean(fieldVal.error),
          // helperText: fieldVal.error || "",
          onChange: createNewValueHandler("change")
          // onBlur: createNewValueHandler("blur")
        };
      case "radio":
        return {
          ...fieldOptions,
          value: fieldVal.value,
          onChange: createNewValueHandler("change")
        };
      default:
        return {
          ...fieldOptions,
          value: fieldVal.value,
          error: Boolean(fieldVal.error),
          helperText: fieldVal.error || "",
          onChange: createNewValueHandler("change"),
          onBlur: createNewValueHandler("blur")
        };
    }
  };

  const bindings = Object.keys(fieldsConfig).reduce(
    (acc, fieldName) => ({
      ...acc,
      [fieldName]: bind(fieldName, fieldsConfig[fieldName])
    }),
    {}
  );

  const getValues = (data = valuesRef.current) =>
    Object.keys(data).reduce(
      (acc, curr) => ({ ...acc, [curr]: data[curr].value }),
      {}
    );

  const getValue = (fieldName) => {
    const values = getValues();
    return values[fieldName];
  };

  const getErrors = (data = valuesRef.current) =>
    Object.keys(data).reduce(
      (acc, curr) => ({ ...acc, [curr]: data[curr].error }),
      {}
    );

  const getError = (fieldName) => {
    const errors = getErrors();
    return errors[fieldName];
  };

  const hasError = (fieldName) => {
    const errors = getErrors();
    return errors[fieldName] !== null;
  };

  const isValid = () => {
    // Build full data-set with defaultValues fallback
    const _fields = Object.keys(bindingsRef.current).reduce(
      (acc, curr) => ({
        ...acc,
        [curr]: {
          value: getValue(curr),
          error: __validateChain(
            bindingsRef.current[curr].validate,
            getValue(curr),
            {
              ...bindingsRef.current[curr],
              fieldName: curr,
              getValue
            }
          )
        }
      }),
      {}
    );

    // Apply before-submit validation
    Object.keys(_fields).forEach((key) => {
      if (_fields[key].error !== null) return;
      _fields[key].error = __validateChain(
        bindingsRef.current[key].validateOnSubmit,
        _fields[key].value,
        { ...bindingsRef.current[key], fieldName: key, getValue }
      );
    });

    // Apply general validation
    const _errors = validate(getValues(_fields), getErrors(_fields)) || {};
    Object.keys(_errors).forEach((key) => {
      _fields[key].error = _errors[key] || null;
    });

    const isValid = Object.values(_fields).every(($) => $.error === null);
    if (!isValid) {
      valuesRef.current = _fields;
      render(valuesRef.current);
    }

    return isValid;
  };

  const getBinding = (fieldName, propName = null) => {
    const fieldDef = bindings[fieldName];
    return propName ? fieldDef[propName] : fieldDef;
  };

  const reset = () => {
    Object.keys(bindingsRef.current).forEach((key) => {
      const fieldDef = bindingsRef.current[key];

      valuesRef.current[key] = {
        value:
          fieldDef.type === "checkbox"
            ? Boolean(fieldDef.defaultValue)
            : fieldDef.defaultValue,
        error: null
      };

      render();
    });
  };

  // Reset the form based on observables:
  useEffect(() => {
    if (resetOnChange.length) {
      reset();
    }
  }, resetOnChange);

  return {
    bindings,
    isValid,
    getValues,
    getValue,
    getErrors,
    getError,
    hasError,
    getBinding,
    reset
    // foo: valuesRef
  };
};
