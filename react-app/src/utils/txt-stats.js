export const txtStats = (str) => {
  // Count words by splitting the string by spaces and filtering out empty elements
  const words = str.split(/\s+/).filter((element) => element).length;

  // Count characters normally
  let characters = str.length;

  // Count each newline (\n) as two characters
  const newlines = (str.match(/\n/g) || []).length;
  characters += newlines;

  return { words, chars: characters };
};
