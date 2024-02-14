import { FullscreenLayout } from "./FullscreenLayout";

export default {
  title: "Layouts/FullscreenLayout",
  component: FullscreenLayout,
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
    children: "Fullscreen Layout"
  }
};
