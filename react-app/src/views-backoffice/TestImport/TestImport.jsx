import { Button, TextField, Stack } from "@mui/material";

import {
  BasicPageDrawer,
  BasicPageSection,
  useBasicPageDrawer
} from "../../layouts/BasicPage";

import { useTestImport } from "./use-test-import";

export const TestImport = () => {
  const drawerProps = useBasicPageDrawer("/tests");
  const { title, subtitle, form, apply } = useTestImport();

  const handleSubmit = (e) => {
    e.preventDefault();
    apply().then(drawerProps.handleClose);
  };

  return (
    <BasicPageDrawer {...drawerProps} title={title} subtitle={subtitle}>
      <BasicPageSection>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Test Data (json)"
            autoFocus
            fullWidth
            multiline
            rows={10}
            InputProps={{ sx: { fontFamily: "monospace", fontSize: 12 } }}
            {...form.getBinding("data")}
          />
          <Stack
            spacing={2}
            direction="row"
            justifyContent={"right"}
            sx={{ mt: 2 }}
          >
            <Button variant="link" onClick={drawerProps.handleClose}>
              Cancel
            </Button>
            <Button variant="contained" color="primary" type="submit">
              Import
            </Button>
          </Stack>
        </form>
      </BasicPageSection>
    </BasicPageDrawer>
  );
};
