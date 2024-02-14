import { DateDay } from "./DateDay";

export default {
  title: "Component/DateDay",
  component: DateDay,
  parameters: {
    layout: "centered"
  },
  tags: ["autodocs"],
  // https://storybook.js.org/docs/react/api/arg-types#controltype
  argTypes: {
    date: { control: "date", description: "Date to display - `new Date()`" }
  }
};

export const Dynamic = {
  args: {}
};

export const Static = {
  args: {
    date: new Date("1981-06-30 15:30:00")
  }
};
