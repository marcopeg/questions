import { Box } from "@mui/material";

import BasicPage from "../../../layouts/BasicPage/BasicPage";

export const Outside = () => {
  return <BasicPage title="Outside" footer={'hhoho'}>
    <ul>
        {Array.from({ length: 10 }, (_, i) => i + 1).map((i) => (
          <li key={i}>
            {i}
          </li>
        ))}
      </ul>
  </BasicPage>
}

// export const Outside = () => <ul>
// {Array.from({ length: 100 }, (_, i) => i + 1).map((i) => (
//   <li key={i}>
//     {i}
//   </li>
// ))}
// </ul>