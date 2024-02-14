import { BasicLayout } from "./BasicLayout";

export default {
  title: "Layouts/BasicLayout",
  component: BasicLayout,
  parameters: {
    layout: "centered"
  },
  tags: ["autodocs"],
  // https://storybook.js.org/docs/react/api/arg-types#controltype
  argTypes: {
    // date: { control: "date", description: "Date to display - `new Date()`" }
  }
};

export const Default = {
  args: {}
};
