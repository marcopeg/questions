import Box from "@mui/material/Box";
import { yellow } from "@mui/material/colors";

export const HighlightedText = ({
  text,
  highlight = "",
  color = "info",
  size = "small",
  ...props
}) => {
  if (!highlight) return text;
  const parts = text.split(new RegExp(`(${highlight})`, "gi"));
  return (
    <>
      {parts.map((part, index) =>
        part.toLowerCase() === highlight.toLowerCase() ? (
          <Box
            key={index}
            children={part}
            component={"span"}
            sx={{
              borderRadius: "4px",
              padding: "0 3px",
              background: yellow[500],
              color: (theme) => theme.palette.getContrastText(yellow[500])
            }}
          />
        ) : (
          part
        )
      )}
    </>
  );
};
