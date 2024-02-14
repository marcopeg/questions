import { CenteredLayout } from "./CenteredLayout";

export default {
  title: "Layouts/CenteredLayout",
  component: CenteredLayout,
  parameters: {
    layout: "fullscreen"
  },
  tags: ["autodocs"],
  // https://storybook.js.org/docs/react/api/arg-types#controltype
  argTypes: {
    // date: { control: "date", description: "Date to display - `new Date()`" }
  }
};

export const Default = {
  args: {
    bgcolor: "#ddd",
    children: "fooo"
  }
};
