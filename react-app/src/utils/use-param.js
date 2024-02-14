import { useSearchParams } from "react-router-dom";

const paramsToObject = (entries, skip = []) => {
  const result = {};
  for (const [key, value] of entries) {
    if (!skip.includes(key)) {
      result[key] = value;
    }
  }
  return result;
};

export const useParam = (paramName, expectedValue) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const value = searchParams.get(paramName);

  const remove = () => {
    setSearchParams({
      ...paramsToObject(searchParams, [paramName])
    });
  };

  const setValue = (newValue) => {
    setSearchParams({
      ...paramsToObject(searchParams),
      [paramName]: newValue
    });
  };

  return {
    isset:
      expectedValue !== undefined ? value === expectedValue : Boolean(value),
    value,
    remove,
    setValue
  };
};

export const useParams = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const params = paramsToObject(searchParams);

  const setParams = (map) => {
    setSearchParams({
      ...paramsToObject(searchParams),
      ...map
    });
  };

  const removeParams = (skip = []) => {
    setSearchParams({
      ...paramsToObject(searchParams, skip)
    });
  };

  const isParamSet = (name) => {
    return params[name] !== undefined || Boolean(params[name]);
  };

  return {
    params,
    isParamSet,
    setParams,
    removeParams
  };
};
