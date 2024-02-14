import { useState, useEffect, memo } from "react";
import { Outlet, useSearchParams } from "react-router-dom";

import BasicPage from "../../../layouts/BasicPage";

export const Outside = memo(() => {
  const [sel, setSel] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    setSel(searchParams.get("line"));
  }, [searchParams]);

  return (
    <BasicPage fullpage title={`Show: ${sel}`}>
      <ul>
        {Array.from({ length: 250 }, (_, i) => i + 1).map((i) => (
          <li key={i}>
            {i} <small>{sel}</small>
            <button onClick={() => setSel(i)}>setState</button>
            <button onClick={() => setSearchParams({ line: i })}>
              setSearchParams
            </button>
          </li>
        ))}
      </ul>
      <Outlet />
    </BasicPage>
  );
});
