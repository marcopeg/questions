export const useTranslate = (globalOptions = {}) => {
  return {
    openTranslate: (text, localOptions = {}) => {
      const from = localOptions.from || globalOptions.from || null;
      const to = localOptions.to || globalOptions.to || null;

      const params = [`text=${encodeURIComponent(text)}`, "op=translate"];
      from && params.push(`sl=${from}`);
      to && params.push(`tl=${to}`);

      const url = `https://translate.google.com/?${params.join("&")}`;
      window.open(url, "_blank");
    }
  };
};
