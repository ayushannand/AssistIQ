export const isEmail = (text) => {
    const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b/;
    return emailRegex.test(text);
  };