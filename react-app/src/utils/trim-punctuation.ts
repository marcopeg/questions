export const trimPunctuation = (input: string): string => {
  return input.replace(/^[^\p{L}\p{N}]+|[^\p{L}\p{N}]+$/gu, "");
};
