// Thanks ChatGPT!
import React, { ReactElement } from "react";

const isFragment = (element: ReactElement<any>): boolean =>
  element.type === React.Fragment;

export const isReactNode = (value: any): value is React.ReactNode => {
  if (value === null) return true; // null is valid
  switch (typeof value) {
    case "string":
    case "number":
    case "boolean":
      return true;
    case "object":
      if (Array.isArray(value)) {
        return value.every(isReactNode);
      }
      if (React.isValidElement(value)) {
        // Checks for JSX elements
        return true;
      }
      if (isFragment(value)) {
        return true;
      }
      return false;
    default:
      return false;
  }
};

export default isReactNode;
