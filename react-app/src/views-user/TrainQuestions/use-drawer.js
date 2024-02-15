import { useParams } from "react-router-dom";

import {
  useBasicPageDrawer
} from "../../layouts/BasicPage";

export const useDrawer = () => {
  const { id } = useParams();
  return useBasicPageDrawer(`/train/${id}`);
};
