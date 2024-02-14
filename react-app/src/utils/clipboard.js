const copyToClipboardFallback = (text) => {
  const textarea = document.createElement("textarea");
  textarea.value = text;
  document.body.appendChild(textarea);
  textarea.select();

  try {
    document.execCommand("copy");
    console.log("Text successfully copied to clipboard");
  } catch (err) {
    console.error("Unable to copy text to clipboard", err);
  }

  document.body.removeChild(textarea);
};

export const copyToClipboard = (text) =>
  new Promise((resolve, reject) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text).then(resolve, reject);
    } else {
      copyToClipboardFallback(text);
      resolve();
    }
  });

export default copyToClipboard;
